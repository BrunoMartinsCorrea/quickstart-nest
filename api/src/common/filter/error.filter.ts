import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';
import { BaseError } from '../error/base-error';

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = 500;

    Logger.error(exception.stack);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      errorCode: (exception as BaseError)?.errorCode ?? 'UNKNOWN',
      message: exception.message.trim().length > 0 ? exception.message : 'Something went wrong',
    });
  }
}
