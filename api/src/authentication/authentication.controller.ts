import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { GenerateTokenDto } from './dto/generate-token.dto';
import { Token } from './entities/token.entity';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('token')
  @HttpCode(200)
  generateToken(@Body() generateTokenDto: GenerateTokenDto): Token {
    return this.authenticationService.generateToken(generateTokenDto);
  }

  @Post('refresh')
  @HttpCode(200)
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Token {
    return this.authenticationService.refreshToken(refreshTokenDto);
  }
}
