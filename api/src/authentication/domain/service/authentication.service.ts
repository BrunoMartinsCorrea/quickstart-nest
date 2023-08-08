import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { addHours, addMinutes, getUnixTime } from 'date-fns';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces';
import { UserService } from '../../../user/domain/service/user.service';
import { UserCredential } from '../../../user/domain/model/user-credential';
import { RefreshToken } from '../model/refresh-token';
import { Token } from '../model/token';
import { AuthorizationError } from '../../../common/error/authorization-error';
import { Jwt } from '../model/jwt';

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
    let { id: userId } = await this.userService.validateByUsername(userCredential.username, userCredential.password);

    return this.generateTokenToSubject(userId);
  }

  async refreshToken(refreshToken: RefreshToken) {
    try {
      this.jwt.verify(refreshToken.refresh, this.defaultJwtOptions);
      let jwtDecoded = this.jwt.decode(refreshToken.refresh, { json: true, complete: true });
      let jwt = { ...(jwtDecoded as object) } as Jwt;
      return this.generateTokenToSubject(jwt.payload.sub);
    } catch (e) {
      Logger.error(e);
      throw new AuthorizationError('Invalid token');
    }
  }

  private async generateTokenToSubject(subject: string) {
    let jti = uuidv4();
    let now = new Date();
    let iat = getUnixTime(now);
    let exp = getUnixTime(addMinutes(now, 5)) - iat;
    let expRefresh = getUnixTime(addHours(now, 1)) - iat;

    let access = this.jwt.sign(
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

    let refresh = this.jwt.sign(
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
