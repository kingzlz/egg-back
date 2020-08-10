import { Controller } from 'egg';
export default class VerifyController extends Controller {
  public async verify() {
    const { ctx } = this;
    const captcha = await ctx.service.verify.captcha(); // 服务里面的方法
    ctx.response.type = 'image/svg+xml'; // 知道你个返回的类型
    ctx.body = captcha.data; // 返回一张图片
    return captcha;
  }
}
