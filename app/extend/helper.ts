import { Context, IHelper } from 'egg';

export default {
  async isAjax(this: Context) {
    return this.get('X-Requested-With') === 'XMLHttpRequest';
  },
  async getInfo(this: IHelper) {
    const { ctx, app } = this;
    const { token } = ctx.header; // 获取jwt
    const user = await app.jwt.verify(token, app.config.jwt.secret); //  解密，获取payload
    const users = await ctx.service.admin.find({ userName: user.userName });
    return users.data[0];
  },
  async test() {
    // 调用awit cxt.helper.test()
    return 't3dt';
  },
};
