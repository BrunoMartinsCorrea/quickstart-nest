import { AuthenticationService } from '@/authentication/domain/service/authentication.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CredentialsDto } from '../dto/credentials.dto';
import { TokenDto } from '@/authentication/http-server/dto/token.dto';
import { RefreshTokenDto } from '@/authentication/http-server/dto/refresh-token.dto';
import { ErrorResponseDto } from '@/common/dto/error-response.dto';
import { Public } from '@/common/decorator/public.decorator';
import { InfoDto } from '@/authentication/http-server/dto/info.dto';
import { Request } from 'express';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('token')
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async generateToken(@Body() generateTokenDto: CredentialsDto) {
    const token = await this.authenticationService.generateToken({ ...generateTokenDto });
    return token as TokenDto;
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    const token = await this.authenticationService.refreshToken(refreshTokenDto);
    return token as TokenDto;
  }

  @Get('info')
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async info(@Req() request: Request) {
    const jwt = await this.authenticationService.verifyToken(request.headers.authorization);
    return jwt as InfoDto;
  }
}
