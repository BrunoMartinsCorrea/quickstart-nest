import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsUUID } from 'class-validator';
import { RoleDto } from '@/authorization/http-server/dto/role.dto';

export class RoleGroupDto {
  @ApiProperty({ example: 'User administrator' })
  @IsDefined({ message: 'name is not defined' })
  name: string;

  @ApiProperty({ example: 'System user administrator' })
  @IsDefined({ message: 'description is not defined' })
  description: string;

  @ApiProperty({ example: [''] })
  @IsDefined({ message: '$property is not defined' })
  @IsUUID(undefined, { each: true })
  @IsOptional()
  roles: RoleDto[];
}
