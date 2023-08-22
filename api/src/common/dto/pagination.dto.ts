import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
