import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginatedQueryDto {
  @ApiProperty({ example: 0, default: 0 })
  @Type(() => Number)
  @IsOptional()
  page: number = 0;

  @ApiProperty({ example: 10, default: 10 })
  @Type(() => Number)
  @IsOptional()
  limit: number = 10;
}
