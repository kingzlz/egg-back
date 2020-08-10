import { Context } from 'egg';
import BaseService from './base';

export default class MenuService extends BaseService {
  constructor(app: Context) {
    super('Menu', app); // Menu 是文件的名
  }

  async list(query = {}, page = 1, per = 10) {
    let data = await this.app.model.Menu.find(query)
      .limit(per)
      .skip((page - 1) * per)
      .sort({
        _id: -1,
      });
    data = this.arrayToTree(data) || [];
    const totalCount = await this.app.model.Menu.countDocuments(query);
    return {
      totalCount,
      pages: Math.ceil(totalCount / per),
      data,
    };
  }

  private arrayToTree(arr: any[], key = '_id', parentKey = 'pid'): any[] {
    let i: number;
    let l: number;
    if (!arr.length) {
      return [];
    }
    if (arr instanceof Array) {
      const res: any[] = [];
      const tmpMap = {};
      for (i = 0, l = arr.length; i < l; i++) {
        tmpMap[arr[i][key]] = arr[i];
      }
      for (i = 0, l = arr.length; i < l; i++) {
        const parent = tmpMap[arr[i][parentKey]]; // 当前节点的父节点(对象)
        if (parent && arr[i][key] !== arr[i][parentKey]) {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(arr[i]);
        } else {
          res.push(arr[i]); // 当前节点没有父节点
        }
      }
      return res;
    }
    return [arr];
  }
}
