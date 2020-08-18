import { Controller } from 'egg';
export default class AdminController extends Controller {
  public async login() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    const { name, password, verify } = data;

    if (name && password) {
      const result = await ctx.service.admin.find({ name, password });
      if (result.data.length) {
        const checkVerify = await ctx.service.verify.checkVerify();
        if (checkVerify === verify && verify.toLocaleLowerCase()) {
          const token = app.jwt.sign(
            {
              _id: result.data[0]._id, // 需要存储的 token 数据
            },
            app.config.jwt.secret,
            { expiresIn: '1h' }, // token签名 有效期为1小时
          );

          // 返回 token 到前端
          return (ctx.body = {
            code: 200,
            token,
            message: '登录成功',
          });
        }
        ctx.throw(402, new Error('验证码不正确'));
      }
      ctx.throw(402, new Error('用户名密码不正确'));
    }
    ctx.throw(402, new Error('用户名密码不能为空'));
  }

  public async register() {
    const { ctx } = this;
    const data = ctx.request.body;
    const { name, password, verify } = data;

    if (name && password && verify) {
      const checkVerify = await ctx.service.verify.checkVerify();
      if (checkVerify === verify && verify.toLocaleLowerCase()) {
        // 是否存在同一ID
        const isHas = await ctx.service.admin.find({ name });
        if (isHas.data.length) {
          ctx.throw(402, new Error('已有同名,请重新注册'));
        }
        const result = await ctx.service.admin.register(data);
        return (ctx.body = {
          code: 200,
          data: result,
          mesage: '注册成功,请登录',
        });
      }

      ctx.throw(402, new Error('验证码不正确'));
    }
    ctx.throw(402, new Error('请输入必填项'));
  }

  public async inInitUser() {
    const { ctx, app } = this;
    const { token } = ctx.header; // 获取jwt
    try {
      const userId = await app.jwt.verify(token, app.config.jwt.secret); //  解密，获取payload
      const users = await ctx.service.admin.findOne(userId);
      const menu = await ctx.service.menu.list();
      if (users) {
        // users.avatar = ctx.helper.singleUrl2Base64(users.avatar);
        ctx.body = {
          user: users,
          menu: menu.data.sort((a, b) => a.sort - b.sort),
        };
      }
    } catch (error) {
      ctx.throw('401', new Error(error));
    }
  }

  public async logout() {
    const { ctx } = this;
    ctx.authUser = null;
    ctx.body = {
      message: '退出成功',
    };
  }
}
