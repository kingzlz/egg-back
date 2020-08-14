# egg-back
egg.js

# hackernews-async-ts

[Hacker News](https://news.ycombinator.com/) showcase using typescript && egg

## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+


### 注意事项
- http状态码为 `401`,token失效,需要重新跳转到登录页面

### 开发过程中遇到一些坑
 - 前端请求验证码,后台正常返回,但前端JS报错,原因是:后台返回的字符串,前端`http.get`请求`responseType`默认为json格式, 需要配置为`{ responseType: 'text' }`
 - 前端调用摄像头拍照时将base64格式用`node.js`的`fs.writeFile(filename: string, data: any, callback?: (err: NodeJS.ErrnoException) => void): void;`转为图片保存到本地时,报错, 
开始是frilename为 path.join(存储路径), 最后`const target = path.join(this.uploadBasePath, this.dirname, filename);` 将target传给`filename`
- 根据`token`获得用户信息,不更新的问题, 问题描述:上传的文件都关联到当前用户`_id`,结果多个用户上传的内容,后台取关联用户`_id`一样. 原因是再生成`token`时,用`username`与加密字符串组合生成的token. 最后用当前用户的`_id`唯一值与加密字符串生成`token`
- 没有文件服务器,将上传或保存的图片放到本地,取数据的时候,通过node.js将相关文件转成base64格式传给前端展示