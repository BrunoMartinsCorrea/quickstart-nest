import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from '../../../common/dto/error-response.dto';
import { AuthenticationService } from '../../domain/service/authentication.service';
import { TokenRequestDto } from '../dto/token-request.dto';
import { TokenResponseDto } from '../dto/token-response.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('token')
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async generateToken(@Body() generateTokenDto: TokenRequestDto) {
    return TokenResponseDto.toDto(await this.authenticationService.generateToken({ ...generateTokenDto }));
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authenticationService.refreshToken(refreshTokenDto);
  }
}
