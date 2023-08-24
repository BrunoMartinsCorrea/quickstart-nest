import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsJWT } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ example: 'JWT' })
  @IsDefined({ message: 'refresh is not defined' })
  @IsJWT({ message: 'refresh is not a JWT' })
  refresh: string;
}
