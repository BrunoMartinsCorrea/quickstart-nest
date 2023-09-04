import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class ClientDto {
  @ApiProperty({ example: 'BACKOFFICE' })
  @IsDefined({ message: 'name is not defined' })
  name: string;

  @ApiProperty({ example: 'Backoffice app client' })
  @IsDefined({ message: 'description is not defined' })
  description: string;
}
