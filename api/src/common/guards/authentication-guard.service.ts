import { AuthenticationService } from '@/authentication/domain/service/authentication.service';
import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private readonly allowList: string[] = ['/api/authentication/token', '/api/authentication/refresh'];

  constructor(private readonly authenticationService: AuthenticationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const url = request.url;
    const isAllowed = this.allowList.includes(url);

    if (!isAllowed) {
      const authorizationHeader = request.headers.authorization?.replace('Bearer ', '');
      const jwt = await this.authenticationService.verifyToken(authorizationHeader);
      Logger.debug(`Request authenticated for user ${jwt.payload.sub}`);
    }

    return true;
  }
}
