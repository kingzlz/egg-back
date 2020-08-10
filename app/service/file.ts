import { Context } from 'egg';
import BaseService from './base';

export default class FileService extends BaseService {
  constructor(app: Context) {
    super('File', app);
  }
}
