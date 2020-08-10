import { Context } from 'egg';
import BaseController from '../base';
export default class Menu extends BaseController {
  constructor(app: Context) {
    super('menu', app);
  }

  async index() {
    const { ctx } = this;
    const result = await ctx.service.menu.list();
    ctx.body = result;
  }
}
