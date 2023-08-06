import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { addHours, addMinutes, getUnixTime } from 'date-fns';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces';
import { UserService } from '../../../user/domain/service/user.service';
import { Token } from '../../entities/token.entity';
import { RefreshTokenDto } from '../../http-server/dto/refresh-token.dto';
import { UserCredential } from '../../../user/domain/model/user-credential';

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
        subject: userId,
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
        subject: userId,
      },
    );

    return new Token(access, refresh);
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    return new Token(refreshTokenDto.refresh, `zxy.654.poi`);
  }
}
