import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';

export class CredentialsDto {
  @ApiProperty({ example: 'admin@admin.com', minLength: 1, maxLength: 255 })
  @IsDefined({ message: 'username is not defined' })
  @IsString({ message: 'username is not a string' })
  @MinLength(1, { message: 'username length has less than 1 character' })
  @MaxLength(255, { message: 'username length has exceeded 255 characteres' })
  username: string;

  @ApiProperty({ example: 'Admin123!', minLength: 8, maxLength: 255 })
  @IsDefined({ message: 'password is not defined' })
  @IsString({ message: 'password is not a string' })
  password: string;
}
