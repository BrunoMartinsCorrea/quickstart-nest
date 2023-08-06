import { ApiProperty } from '@nestjs/swagger';
import { Token } from '../../entities/token.entity';

export class TokenResponseDto {
  @ApiProperty()
  access: string;

  @ApiProperty()
  refresh: string;

  constructor(access: string, refresh: string) {
    this.access = access;
    this.refresh = refresh;
  }

  static toDto(token: Token): TokenResponseDto {
    return token as TokenResponseDto;
  }
}
