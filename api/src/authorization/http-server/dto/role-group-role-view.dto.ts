import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { RoleGroupDto } from '@/authorization/http-server/dto/role-group.dto';
import { RoleDto } from '@/authorization/http-server/dto/role.dto';

export class RoleGroupRoleViewDto {
  @ApiProperty({ example: {} as RoleDto })
  @IsDefined({ message: 'role is not defined' })
  role: RoleDto;

  @ApiProperty({ example: {} as RoleGroupDto })
  @IsDefined({ message: 'roleGroup is not defined' })
  roleGroup: RoleGroupDto;
}
