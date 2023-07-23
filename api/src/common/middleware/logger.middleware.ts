import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction): Promise<any> {
    Logger.log(`Request ${req.method} => ${req.path}`);
    next();
  }
}
