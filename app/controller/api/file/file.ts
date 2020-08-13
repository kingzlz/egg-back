import { Context } from 'egg';
import BaseController from '../base';

import fs = require('fs');
import path = require('path');
// 故名思意 异步二进制 写入流
import awaitWriteStream = require('await-stream-ready');
// 管道读入一个虫洞。
import sendToWormhole = require('stream-wormhole');
import dayjs = require('dayjs');

export default class File extends BaseController {
  // 基础的目录
  uploadBasePath = 'app/public/uploads';
  // 生成文件夹
  dirname = dayjs(Date.now()).format('YYYY/MM/DD');
  constructor(app: Context) {
    super('file', app);
  }

  async index() {
    const { ctx } = this;
    const uid = ctx.authUser._id;
    const result = await ctx.service.file.list({ uid });
    result.data = this.url2Base64(result.data);
    ctx.body = result;
  }

  /**
   * 删除  todo: 将文件删除
   *  /:id
   * delete
   */
  async destroy() {
    const { ctx } = this;
    const result = await ctx.service.file.deleteOne(ctx.params.id);
    // 将文件删除
    fs.unlinkSync(result.fileUrl);
    ctx.body = {
      code: 1,
      msg: '删除成功',
      data: result,
    };
  }

  /**
   * 新增，用于文件新增时
   * post
   */
  async create() {
    const { ctx } = this;
    const uid = ctx.authUser._id;
    const result = await ctx.service.file.save(
      Object.assign(ctx.request.body, { uid }),
    );
    ctx.body = {
      code: 1,
      msg: '新增成功',
      data: result,
    };
  }

  // 将拍照的base64转成图片存起来
  async base64ToImage() {
    const { ctx } = this;

    const { image64, fileName } = ctx.request.body;
    const base64Data = image64.replace(/^data:image\/\w+;base64,/, '');
    const dataBuffer = Buffer.from(base64Data, 'base64');

    // 生成文件名
    const filename = fileName;

    this.mkdirSync(path.join(this.uploadBasePath, this.dirname));

    // 生成写入路径
    const target = path.join(this.uploadBasePath, this.dirname, filename);
    try {
      fs.writeFile(target, dataBuffer, (err: any) => {
        if (err) {
          console.log('保存图片error', err);
          return;
        }
      });
    } catch (err) {
      return {
        err,
      };
    }
    ctx.body = {
      fileUrl: target,
      fileName,
    };
  }

  public async uploadFile() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    // 生成文件名
    // const filename = `${Date.now()}${Number.parseInt(
    //   String(Math.random() * 1000),
    // )}${path.extname(stream.filename).toLocaleLowerCase()}`;
    const filename = stream.filename;

    this.mkdirSync(path.join(this.uploadBasePath, this.dirname));
    // 生成写入路径
    const target = path.join(this.uploadBasePath, this.dirname, filename);
    // 写入流
    const writeStream = fs.createWriteStream(target);
    try {
      // 异步把文件流 写入
      await awaitWriteStream.write(stream.pipe(writeStream));
    } catch (err) {
      // 如果出现错误，关闭管道
      await sendToWormhole(stream);
      return {
        error: '错误',
      };
    }
    ctx.body = {
      url: target,
      fields: stream.fields,
      filename,
    };
  }

  mkdirSync(dirname) {
    if (fs.existsSync(dirname)) {
      return true;
    }
    if (this.mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }

  url2Base64(data: any[]): any[] {
    data.forEach((item: any) => {
      item.fileUrl =
        'data:image/png;base64,' +
        fs.readFileSync(`${item.fileUrl}`).toString('base64');
    });
    return data;
  }
}
