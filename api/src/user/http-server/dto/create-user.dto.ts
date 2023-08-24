import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsDefined({ message: 'username is not defined' })
  @IsString({ message: 'username is not a string' })
  username: string;

  @ApiProperty({ example: 'Test123!', minLength: 8, maxLength: 255 })
  @IsDefined({ message: 'password is not defined' })
  @IsString({ message: 'password is not a string' })
  @MinLength(8, { message: 'password length has less than 8 characteres' })
  @MaxLength(255, { message: 'password length has exceeded 255 characteres' })
  @IsStrongPassword(
    { minLength: 8, minNumbers: 1, minSymbols: 1, minLowercase: 1, minUppercase: 1 },
    { message: 'password is not strong enough' }
  )
  password: string;

  @ApiProperty({ example: 'John Doe', minLength: 1, maxLength: 255 })
  @IsDefined({ message: 'fullName is not defined' })
  @IsString({ message: 'fullName is not a string' })
  @MinLength(1, { message: 'fullName length has less than 1 character' })
  @MaxLength(255, { message: 'fullName length has exceeded 255 characteres' })
  fullName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail(null, { message: 'email is not valid' })
  email: string;
}
