import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class RoleDto {
  @ApiProperty({ example: 'OWNER' })
  @IsDefined({ message: '$property is not defined' })
  name: string;

  @ApiProperty({ example: 'System owner' })
  @IsDefined({ message: '$property is not defined' })
  description: string;
}
