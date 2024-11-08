import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsDefined } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsDefined({ message: '$property is not defined' })
  userId: string;

  @ApiProperty({ example: '2000-01-01T00:00:000.00' })
  @IsDefined({ message: '$property is not defined' })
  @IsDateString({ strict: true })
  begin: string;

  @ApiProperty({ example: '2000-01-01T00:00:000.00' })
  @IsDefined({ message: '$property is not defined' })
  @IsDateString({ strict: true })
  end: string;

  @ApiProperty({ example: false, type: IsBoolean })
  @IsDefined({ message: '$property is not defined' })
  @IsBoolean({ message: '$property is not a boolean' })
  isAllDay: boolean;

  @ApiProperty({ example: 'DAILY' })
  @IsDefined({ message: '$property is not valid' })
  recurrenceType: string;

  @ApiProperty({ example: '1' })
  @IsDefined({ message: '$property is not valid' })
  recurrenceAmount: string;
}
