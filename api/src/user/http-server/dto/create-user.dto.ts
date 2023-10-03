import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsDefined({ message: '$property is not defined' })
  @IsString({ message: '$property is not a string' })
  username: string;

  @ApiProperty({ example: 'Test123!', minLength: 8, maxLength: 255 })
  @IsDefined({ message: '$property is not defined' })
  @IsString({ message: '$property is not a string' })
  @MinLength(8, { message: '$property length has less than $constraint1 characteres' })
  @MaxLength(255, { message: '$property length has exceeded $constraint1 characteres' })
  @IsStrongPassword(
    { minLength: 8, minNumbers: 1, minSymbols: 1, minLowercase: 1, minUppercase: 1 },
    { message: '$property is not strong enough' }
  )
  password: string;

  @ApiProperty({ example: 'John Doe', minLength: 1, maxLength: 255 })
  @IsDefined({ message: '$property is not defined' })
  @IsString({ message: '$property is not a string' })
  @MinLength(1, { message: '$property length has less than $constraint1 character' })
  @MaxLength(255, { message: '$property length has exceeded $constraint1 characteres' })
  fullName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail({}, { message: '$property is not valid' })
  email: string;
}
