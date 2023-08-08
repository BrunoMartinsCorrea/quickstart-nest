import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from '../../../common/dto/error-response.dto';
import { AuthenticationService } from '../../domain/service/authentication.service';
import { CredentialsDto } from '../dto/credentials.dto';
import { TokenDto } from '../dto/token.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('token')
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async generateToken(@Body() generateTokenDto: CredentialsDto) {
    let token = await this.authenticationService.generateToken({ ...generateTokenDto });
    return { ...token } as TokenDto;
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    let token = await this.authenticationService.refreshToken(refreshTokenDto);
    return { ...token } as TokenDto;
  }
}
