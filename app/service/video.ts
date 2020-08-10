import { Context } from 'egg';
import BaseService from './base';

export default class VideoService extends BaseService {
  constructor(app: Context) {
    super('Video', app); // Video 是文件的名
  }
}
