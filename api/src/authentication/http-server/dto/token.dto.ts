import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty()
  access: string;

  @ApiProperty()
  refresh: string;

  constructor(access: string, refresh: string) {
    this.access = access;
    this.refresh = refresh;
  }
}
