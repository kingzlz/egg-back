import { Context, IHelper } from 'egg';
import fs = require('fs');
import path = require('path');
import rd = require('rd');

export default {
  async isAjax(this: Context) {
    return this.get('X-Requested-With') === 'XMLHttpRequest';
  },
  async getInfo(this: IHelper) {
    const { ctx, app } = this;
    const { token } = ctx.header; // 获取jwt
    const user = await app.jwt.verify(token, app.config.jwt.secret); //  解密，获取payload
    const users = await ctx.service.admin.find({ userName: user.userName });
    return users.data[0];
  },
  async test() {
    // 调用awit cxt.helper.test()
    return 't3dt';
  },
  url2Base64(data: any[], field: string): any[] {
    const reg = /\d{4}\/\d{2}\/\d{2}/;
    data.forEach((item: any) => {
      try {
        if (reg.test(item[field])) {
          item[field] =
            'data:image/png;base64,' +
            fs.readFileSync(`${item[field]}`).toString('base64');
        }
      } catch (error) {
        console.error(`转化路径报错:${error}`);
        item[field] = '';
      }
    });
    return data;
  },

  singleUrl2Base64(pathUrl: string): string {
    const reg = /\d{4}\/\d{2}\/\d{2}/;
    try {
      if (reg.test(pathUrl)) {
        pathUrl =
          'data:image/png;base64,' +
          fs.readFileSync(`${pathUrl}`).toString('base64');
      }
    } catch (error) {
      console.error(`转化路径报错:${error}`);
      pathUrl = '';
    }

    return pathUrl;
  },
  mapDir(dir: string, callback: Function, finish: Function) {
    fs.readdir(dir, (err, files) => {
      if (err) {
        console.error(err);
        return;
      }
      files.forEach((filename, index) => {
        const pathname = path.join(dir, filename);
        fs.stat(pathname, (err, stats) => {
          // 读取文件信息
          if (err) {
            console.log('获取文件stats失败', err);
            return;
          }
          if (stats.isDirectory()) {
            this.mapDir(pathname, callback, finish);
          } else if (stats.isFile()) {
            fs.readFile(pathname, (err, data) => {
              if (err) {
                console.error(err);
                return;
              }
              callback && callback(data);
            });
          }
        });
        if (index === files.length - 1) {
          finish && finish();
        }
      });
    });
  },

  async findDirFiles(path: string) {
    return this.getFilesName(rd.readFileSync(path));
  },

  getFilesName(files: string[]): string[] {
    const reg = /\d{4}\/\d{2}\/\d{2}\/(.*)/;
    const filesArr: string[] = [];
    if (files.length) {
      files.forEach((item: string) => {
        const fileNameArr = item.match(reg);
        if (fileNameArr) {
          filesArr.push(fileNameArr[1]);
        }
      });
    }
    return filesArr;
  },

  // 匹配文件名中的数字:time(2).png中的(2),替换为time(3).png
  matching(str: string): number | string {
    let resultStr: number | string;
    const reg = /\((\d+?)\)$/g;
    const getNum = /([\(|\)])/g;
    const result = str.match(reg);
    if (result && result.length) {
      console.log(
        'result=',
        result,
        'result[0].replacegetNum = ',
        result[0].replace(getNum, ''),
      );
      resultStr = Number(result[0].replace(getNum, '')) + 1 + '.';
    } else {
      resultStr = str + '(1).';
    }
    return resultStr;
  },

  uuid(range: number): string {
    let str = '';
    const arr = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];

    for (let i = 0; i < range; i++) {
      const pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    return str;
  },
};
