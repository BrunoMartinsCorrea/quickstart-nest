import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { UserGroupDto } from '@/authorization/http-server/dto/user-group.dto';
import { RoleGroupDto } from './role-group.dto';
import { ClientDto } from '@/authorization/http-server/dto/client.dto';

export class UserRoleClientViewDto {
  @ApiProperty({ example: {} as UserGroupDto })
  @IsDefined({ message: '$property is not defined' })
  userGroup: UserGroupDto;

  @ApiProperty({ example: {} as RoleGroupDto })
  @IsDefined({ message: '$property is not defined' })
  roleGroup: RoleGroupDto;

  @ApiProperty({ example: {} as ClientDto })
  @IsDefined({ message: '$property is not defined' })
  client: ClientDto;
}
