import { ApiProperty } from '@nestjs/swagger';

export class TokenRequestDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
