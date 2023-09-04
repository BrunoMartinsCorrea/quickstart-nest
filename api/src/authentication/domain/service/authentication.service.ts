import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { addMinutes, getUnixTime } from 'date-fns';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces';
import { UserService } from '@/user/domain/service/user.service';
import { UserCredential } from '@/user/domain/model/user-credential';
import { RefreshToken } from '../model/refresh-token';
import { Jwt } from '../model/jwt';
import { AuthorizationError } from '@/common/error/authorization-error';
import { Token } from '@/authentication/domain/model/token';

@Injectable()
export class AuthenticationService {
  private readonly defaultJwtOptions = {
    issuer: 'api',
    audience: 'web',
    header: {
      typ: 'JWT',
    },
  } as JwtSignOptions;

  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  async generateToken(userCredential: UserCredential) {
    const { id: userId } = await this.userService.validateByUsername(userCredential.username, userCredential.password);

    return this.generateTokenToSubject(userId);
  }

  async refreshToken(refreshToken: RefreshToken) {
    const jwt = await this.verifyToken(refreshToken.refresh);

    return this.generateTokenToSubject(jwt.payload.sub);
  }

  async verifyToken(token: string) {
    try {
      const normalizedToken = token?.replace('Bearer ', '');
      this.jwt.verify(normalizedToken, this.defaultJwtOptions);
      const jwtDecoded = this.jwt.decode(normalizedToken, { json: true, complete: true });

      return { ...(jwtDecoded as object) } as Jwt;
    } catch (e) {
      Logger.warn(e);
      throw new AuthorizationError('Invalid token');
    }
  }

  private async generateTokenToSubject(subject: string) {
    const ACCESS_TOKEN_DURATION_IN_MINUTES = 5;
    const REFRESH_TOKEN_DURATION_IN_MINUTES = 60;

    const jti = uuidv4();
    const now = new Date();
    const iat = getUnixTime(now);
    const exp = getUnixTime(addMinutes(now, ACCESS_TOKEN_DURATION_IN_MINUTES)) - iat;
    const expRefresh = getUnixTime(addMinutes(now, REFRESH_TOKEN_DURATION_IN_MINUTES)) - iat;

    const access = this.jwt.sign(
      {
        iat,
      },
      {
        ...this.defaultJwtOptions,
        expiresIn: exp,
        jwtid: jti,
        subject,
      },
    );

    const refresh = this.jwt.sign(
      {
        iat,
      },
      {
        ...this.defaultJwtOptions,
        notBefore: exp,
        expiresIn: expRefresh,
        jwtid: jti,
        subject: subject,
      },
    );

    return new Token(access, refresh);
  }
}
