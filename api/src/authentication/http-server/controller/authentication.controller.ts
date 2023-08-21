import { AuthenticationService } from '@/authentication/domain/service/authentication.service';
import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CredentialsDto } from '../dto/credentials.dto';
import { TokenDto } from '@/authentication/http-server/dto/token.dto';
import { RefreshTokenDto } from '@/authentication/http-server/dto/refresh-token.dto';
import { ErrorResponseDto } from '@/common/dto/error-response.dto';
import { Public } from '@/common/decorator/public.decorator';
import { InfoDto } from '@/authentication/http-server/dto/info.dto';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('token')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async generateToken(@Body() generateTokenDto: CredentialsDto) {
    const token = await this.authenticationService.generateToken({ ...generateTokenDto });
    return { ...token } as TokenDto;
  }

  @Post('refresh')
  @Public()
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    const token = await this.authenticationService.refreshToken(refreshTokenDto);
    return { ...token } as TokenDto;
  }

  @Get('info')
  @HttpCode(HttpStatus.OK)
  async info(@Headers('Authorization') authorization: string) {
    const jwt = await this.authenticationService.verifyToken(authorization);
    return { ...jwt } as InfoDto;
  }
}
