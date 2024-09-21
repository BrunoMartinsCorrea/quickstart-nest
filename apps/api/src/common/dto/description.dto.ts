import { ApiProperty } from '@nestjs/swagger';

export class DescriptionDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
