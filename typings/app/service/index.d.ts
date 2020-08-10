// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAdmin from '../../../app/service/Admin';
import ExportTest from '../../../app/service/Test';
import ExportVerify from '../../../app/service/Verify';
import ExportBase from '../../../app/service/base';
import ExportMenu from '../../../app/service/menu';
import ExportVideo from '../../../app/service/video';

declare module 'egg' {
  interface IService {
    admin: AutoInstanceType<typeof ExportAdmin>;
    test: AutoInstanceType<typeof ExportTest>;
    verify: AutoInstanceType<typeof ExportVerify>;
    base: AutoInstanceType<typeof ExportBase>;
    menu: AutoInstanceType<typeof ExportMenu>;
    video: AutoInstanceType<typeof ExportVideo>;
  }
}
