import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PaginatedQueryDto {
  @ApiProperty({ example: 0 })
  @IsNumber(null, { message: 'page is not a number' })
  page: number;

  @ApiProperty({ example: 10 })
  @IsNumber(null, { message: 'limit is not a number' })
  limit: number;
}
