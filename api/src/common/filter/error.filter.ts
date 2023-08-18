import { ArgumentsHost, Catch, ExceptionFilter, ForbiddenException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { AuthorizationError } from '../error/authorization-error';
import { InvalidCredentialsError } from '@/user/domain/error/invalid-credentials-error';
import { EntityNotFoundError } from '../error/entity-not-found-error';
import { EntityConflictError } from '../error/entity-conflict-error';
import { BusinessError } from '../error/business-error';
import { ErrorResponseDto } from '../dto/error-response.dto';

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const responseBody = this.getResponseBody(exception);

    response.status(responseBody.statusCode).json(responseBody);
  }

  private getResponseBody(exception: Error) {
    let errorCode: string;
    let statusCode: number;
    switch (exception.constructor) {
      case AuthorizationError:
      case InvalidCredentialsError:
        statusCode = HttpStatus.UNAUTHORIZED;
        errorCode = HttpStatus[statusCode];
        break;
      case ForbiddenException:
        statusCode = HttpStatus.FORBIDDEN;
        errorCode = HttpStatus[statusCode];
        break;
      case EntityNotFoundError:
        statusCode = HttpStatus.NOT_FOUND;
        errorCode = HttpStatus[statusCode];
        break;
      case EntityConflictError:
        statusCode = HttpStatus.CONFLICT;
        errorCode = HttpStatus[statusCode];
        break;
      case BusinessError:
        statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
        errorCode = (exception as BusinessError).errorCode;
        break;
      default:
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        errorCode = HttpStatus[statusCode];
        Logger.error(exception.stack);
    }

    return {
      statusCode,
      timestamp: new Date().toISOString(),
      errorCode,
      message: exception.message.trim() ? exception.message : 'Something went wrong',
    } as ErrorResponseDto;
  }
}
