import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class RoleGroupRoleDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsDefined({ message: 'roleId is not defined' })
  roleId: string;

  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsDefined({ message: 'roleGroupId is not defined' })
  roleGroupId: string;
}
