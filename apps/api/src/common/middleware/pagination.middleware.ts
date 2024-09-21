import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const DEFAULT_PAGE = '1';
    const DEFAULT_LIMIT = '10';

    req.query.page = req.query?.page || DEFAULT_PAGE;
    req.query.limit = req.query?.limit || DEFAULT_LIMIT;

    next();
  }
}
