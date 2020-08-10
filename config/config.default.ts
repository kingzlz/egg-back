import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1596418832632_3951';

  // add your egg config in here
  config.middleware = ['auth'];

  config.jwt = {
    secret: 'graduation', // 自定义 token 的加密条件字符串
  };
  config.auth = {
    secret: 'graduation',
    ignore: ['/verify', '/login', '/register'], // 忽略注册和登陆的接口
  };
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/graduation',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: false,
      ignore: ['/api'],
    },
    domainWhiteList: ['*'], // 允许访问接口的白名单
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
