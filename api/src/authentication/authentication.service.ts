import { Injectable } from '@nestjs/common';
import { GenerateTokenDto } from './dto/generate-token.dto';
import { Token } from './entities/token.entity';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthenticationService {
  generateToken(generateTokenDto: GenerateTokenDto): Token {
    return new Token(`abc.123.${generateTokenDto.username}`, `zxy.987.${generateTokenDto.username}`);
  }

  refreshToken(refreshTokenDto: RefreshTokenDto): Token {
    return new Token(refreshTokenDto.refresh, `zxy.654.poi`);
  }
}
