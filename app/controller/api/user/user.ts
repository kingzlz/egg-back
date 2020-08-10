import { Context } from 'egg';
import BaseController from '../base';
export default class User extends BaseController {
  constructor(app: Context) {
    super('user', app);
  }

  async index() {
    const { ctx } = this;
    const result = await ctx.service.user.list();
    ctx.body = result;
  }
}
