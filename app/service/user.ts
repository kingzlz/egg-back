import { Context } from 'egg';
import BaseService from './base';

export default class UserService extends BaseService {
  constructor(app: Context) {
    super('User', app); // User 是model文件里对应的文件名
  }
}
