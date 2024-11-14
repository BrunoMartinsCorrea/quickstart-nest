import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined } from 'class-validator';

export class CreatePersonDto {
  @ApiProperty({ example: '00000000000' })
  @IsDefined({ message: '$property is not defined' })
  nationalRegistration: string;

  @ApiProperty({ example: 'John' })
  @IsDefined({ message: '$property is not defined' })
  @IsDateString({ strict: true })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsDefined({ message: '$property is not defined' })
  @IsDateString({ strict: true })
  lastName: string;

  @ApiProperty({ example: '2000-01-01T00:00:000.00' })
  @IsDefined({ message: '$property is not defined' })
  @IsDateString({ strict: true })
  birthdate: string;
}
