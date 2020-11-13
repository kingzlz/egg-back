import { Context, Application, EggAppConfig } from 'egg';
export default function errorHandleMiddleWare(
  options: EggAppConfig,
  app: Application,
): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const { token } = ctx.header; // 获取jwt
    if (!token) {
      ctx.throw(401, new Error('没有权限,请登录'));
    }
    // 2根据token，换取用户信息
    let user: any = {};
    try {
      user = await app.jwt.verify(token, options.secret); //  解密，获取payload
    } catch (error) {
      const fail =
        error.name === 'TokenExpiredError'
          ? 'token 已过期! 请重新获取令牌'
          : 'Token 令牌不合法!';
      ctx.throw(401, new Error(fail));
    }

    // 3判断当前用户是否登陆
    // const t = await ctx.service.cache.get('user_' + user.id);
    // if (!t || t !== token) {
    //   ctx.throw(400, 'token不合法');
    // }
    // 4,判断用户的状态
    const findUser = await ctx.service.admin.findOne(user._id);
    if (!findUser) {
      ctx.throw(401, new Error('用户不存在或已经被禁用,请重新登录'));
    }
    // 5，把user信息挂载到全局ctx
    ctx.authUser = findUser;
    await next();
  };
}
