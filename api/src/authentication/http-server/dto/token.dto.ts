import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsJWT } from 'class-validator';

export class TokenDto {
  @ApiProperty({ example: 'JWT' })
  @IsDefined({ message: 'access is not defined' })
  @IsJWT({ message: 'access is not a JWT' })
  access: string;

  @ApiProperty({ example: 'JWT' })
  @IsDefined({ message: 'refresh is not defined' })
  @IsJWT({ message: 'refresh is not a JWT' })
  refresh: string;
}
