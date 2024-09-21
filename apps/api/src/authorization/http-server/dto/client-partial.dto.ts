import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ClientPartialDto {
  @ApiProperty({ example: 'BACKOFFICE' })
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'Backoffice app client' })
  @IsOptional()
  description: string;

  @ApiProperty({ example: true})
  @IsOptional()
  active: boolean;
}
