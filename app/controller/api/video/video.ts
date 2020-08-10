import { Context } from 'egg';
import BaseController from '../base';
export default class Video extends BaseController {
  constructor(app: Context) {
    super('video', app);
  }
}
