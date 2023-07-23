import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import e from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: e.Request, res: e.Response, next: (error?: any) => void) {
    Logger.log(`Request ${req.method} => ${req.path}`);
    next();
  }
}
