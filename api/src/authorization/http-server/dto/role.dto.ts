import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class RoleDto {
  @ApiProperty({ example: 'OWNER' })
  @IsDefined({ message: 'name is not defined' })
  name: string;

  @ApiProperty({ example: 'System owner' })
  @IsDefined({ message: 'description is not defined' })
  description: string;
}
