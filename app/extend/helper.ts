import { Context, IHelper } from 'egg';
import fs = require('fs');

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
  url2Base64(data: any[], field: string): any[] {
    const reg = /\d{4}\/\d{2}\/\d{2}/;
    data.forEach((item: any) => {
      try {
        if (reg.test(item[field])) {
          item[field] =
            'data:image/png;base64,' +
            fs.readFileSync(`${item[field]}`).toString('base64');
        }
      } catch (error) {
        console.error(`转化路径报错:${error}`);
        item[field] = '';
      }
    });
    return data;
  },

  singleUrl2Base64(pathUrl: string): string {
    const reg = /\d{4}\/\d{2}\/\d{2}/;
    try {
      if (reg.test(pathUrl)) {
        pathUrl =
          'data:image/png;base64,' +
          fs.readFileSync(`${pathUrl}`).toString('base64');
      }
    } catch (error) {
      console.error(`转化路径报错:${error}`);
      pathUrl = '';
    }

    return pathUrl;
  },
};
