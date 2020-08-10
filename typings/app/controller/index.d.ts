// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportApiBase from '../../../app/controller/api/base';
import ExportApiVerify from '../../../app/controller/api/verify';
import ExportApiAdminAdmin from '../../../app/controller/api/admin/admin';
import ExportApiFileFile from '../../../app/controller/api/file/file';
import ExportApiMenuMenu from '../../../app/controller/api/menu/menu';
import ExportApiUserUser from '../../../app/controller/api/user/user';
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
      file: {
        file: ExportApiFileFile;
      }
      menu: {
        menu: ExportApiMenuMenu;
      }
      user: {
        user: ExportApiUserUser;
      }
      video: {
        video: ExportApiVideoVideo;
      }
    }
  }
}
