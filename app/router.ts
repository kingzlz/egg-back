import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/verify', controller.api.verify.verify); // 验证码
  router.post('/login', controller.api.admin.admin.login); // 登录
  router.post('/logout', controller.api.admin.admin.logout); // 退出
  router.post('/register', controller.api.admin.admin.register); // 注册
  router.get('/init', controller.api.admin.admin.inInitUser); // 得到用户信息
  router.resources('video', '/video/list', controller.api.video.video);
  router.resources('user', '/user/list', controller.api.user.user);
  router.resources('menu', '/menu/list', controller.api.menu.menu);
  router.resources('file', '/file/list', controller.api.file.file);
  router.post('/file/upload', controller.api.file.file.uploadFile); // 上传文件
  router.post('/file/upload/base64', controller.api.file.file.base64ToImage); // 上传文件base64 to image
};
