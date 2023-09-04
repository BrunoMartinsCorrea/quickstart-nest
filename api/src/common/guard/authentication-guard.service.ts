import { AuthenticationService } from '@/authentication/domain/service/authentication.service';
import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());

    if (!isPublic) {
      const request = context.switchToHttp().getRequest<Request>();
      const jwt = await this.authenticationService.verifyToken(request.headers.authorization);
      Logger.debug(`Request authenticated for user ${jwt.payload.sub}`);
    }

    return true;
  }
}
