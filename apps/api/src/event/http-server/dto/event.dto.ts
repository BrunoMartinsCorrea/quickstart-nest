import { ApiProperty } from '@nestjs/swagger';

export class EventDto {
  @ApiProperty()
  begin: string;

  @ApiProperty()
  end: string;

  @ApiProperty()
  isAllDay: boolean;

  @ApiProperty()
  recurrenceType: string;

  @ApiProperty()
  recurrenceAmount: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  deletedAt: string;
}
