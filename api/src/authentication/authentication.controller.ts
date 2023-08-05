import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { GenerateTokenDto } from './dto/generate-token.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('token')
  @HttpCode(200)
  generateToken(@Body() generateTokenDto: GenerateTokenDto) {
    return this.authenticationService.generateToken(generateTokenDto.username, generateTokenDto.password);
  }

  @Post('refresh')
  @HttpCode(200)
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authenticationService.refreshToken(refreshTokenDto);
  }
}
