import { Context } from 'egg';
import BaseController from '../base';

export default class User extends BaseController {
  constructor(app: Context) {
    super('user', app);
  }

  async index() {
    const { ctx } = this;
    // result.data = ctx.helper.url2Base64(result.data, 'avatar');
    ctx.body = await ctx.service.user.list();
  }
}
