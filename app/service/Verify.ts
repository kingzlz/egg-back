import { Service } from 'egg';
import svgCaptcha = require('svg-captcha');
export default class VerifyService extends Service {
  // 产生验证码
  public async captcha() {
    const { ctx } = this;
    const captcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1i',
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#cc9966',
    });
    ctx.session.code = captcha.text.toLocaleLowerCase();
    ctx.status = 200;
    ctx.body = captcha.data;
    return captcha;
  }

  public async checkVerify() {
    const { ctx } = this;
    const headersCC = ctx.session.code; // 获得session中的验证码
    return headersCC;
  }
}
