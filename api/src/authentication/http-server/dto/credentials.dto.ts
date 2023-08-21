import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
