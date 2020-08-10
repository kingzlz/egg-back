import { Context, Application, EggAppConfig } from 'egg';
// 仅供参考
export default function errorHandleMiddleWare(
  options: EggAppConfig,
  app: Application,
): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      await next();
    } catch (err) {
      console.log('err', err, 'options', options);
      // 所有的异常都在 app 上触发一个 error 事件，egg会记录一条错误日志
      app.emit('error', err, ctx);
      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error =
        status === 500 && app.config.env === 'prod'
          ? 'Internal Server Error'
          : err.message;
      if (status === 401) {
        // 自定义jwt错误处理
        ctx.body = {
          code: 401,
          msg: 'token过期或错误',
        };
      } else if (status === 422) {
        // 422:请求格式正确，但是由于含有语义错误
        ctx.body.detail = err.errors;
      } else {
        // 从 error 对象上读出各个属性，设置到响应中
        ctx.body = { error };
        ctx.status = status;
      }
    }

    // // name 就是 config.default.js 中 uuid 下的属性
    // console.info('options=', options);

    // const token = ctx.header.authorization; // 获取jwt
    // let payload: any;
    // if (token) {
    //   payload = await app.jwt.verify(token.split(' ')[1], options.secret); //  解密，获取payload
    //   ctx.body = {
    //     payload,
    //   };
    // } else {
    //   ctx.body = {
    //     message: 'token 错误',
    //     code: -1,
    //   };
    // }
    // await next();
  };
}
