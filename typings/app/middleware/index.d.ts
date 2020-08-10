// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/middleware/auth';
import ExportErrorHandleReference from '../../../app/middleware/error_handle-reference';

declare module 'egg' {
  interface IMiddleware {
    auth: typeof ExportAuth;
    errorHandleReference: typeof ExportErrorHandleReference;
  }
}
