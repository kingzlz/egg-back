import { Context } from 'egg';
import BaseController from '../base';
export default class User extends BaseController {
  constructor(app: Context) {
    super('user', app);
  }

  async index() {
    const { ctx } = this;
    const result = await ctx.service.user.list();
    // result.data = ctx.helper.url2Base64(result.data, 'avatar');
    ctx.body = result;
  }
}
