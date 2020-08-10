// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportApiBase from '../../../app/controller/api/base';
import ExportApiVerify from '../../../app/controller/api/verify';
import ExportApiAdminAdmin from '../../../app/controller/api/admin/admin';
import ExportApiMenuMenu from '../../../app/controller/api/menu/menu';
import ExportApiVideoVideo from '../../../app/controller/api/video/video';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    api: {
      base: ExportApiBase;
      verify: ExportApiVerify;
      admin: {
        admin: ExportApiAdminAdmin;
      }
      menu: {
        menu: ExportApiMenuMenu;
      }
      video: {
        video: ExportApiVideoVideo;
      }
    }
  }
}
