import { Context } from 'egg';
import BaseService from './base';

export default class UserService extends BaseService {
  constructor(app: Context) {
    super('User', app); // Video 是文件的名
  }
}
