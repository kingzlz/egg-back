// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportMenu from '../../../app/model/menu';
import ExportUser from '../../../app/model/user';
import ExportVideo from '../../../app/model/video';

declare module 'egg' {
  interface IModel {
    Menu: ReturnType<typeof ExportMenu>;
    User: ReturnType<typeof ExportUser>;
    Video: ReturnType<typeof ExportVideo>;
  }
}
