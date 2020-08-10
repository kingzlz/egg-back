import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/verify', controller.api.verify.verify); // 验证码
  router.post('/login', controller.api.admin.admin.login); // 登录
  router.post('/register', controller.api.admin.admin.register); // 注册
  router.get('/init', controller.api.admin.admin.inInitUser); // 得到用户信息
  router.resources('video', '/video/list', controller.api.video.video);
  router.resources('menu', '/menu/list', controller.api.menu.menu);
};
