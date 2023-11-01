import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class RoleGroupDto {
  @ApiProperty({ example: 'User administrator' })
  @IsDefined({ message: 'name is not defined' })
  name: string;

  @ApiProperty({ example: 'System user administrator' })
  @IsDefined({ message: 'description is not defined' })
  description: string;

  @ApiProperty({ example: true })
  @IsDefined({ message: '$property is not defined' })
  active: boolean;
}
