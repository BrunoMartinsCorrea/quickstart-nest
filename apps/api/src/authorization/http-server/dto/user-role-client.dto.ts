import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class UserRoleClientDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsDefined({ message: '$property is not defined' })
  userGroupId: string;

  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsDefined({ message: '$property is not defined' })
  roleGroupId: string;

  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsDefined({ message: '$property is not defined' })
  clientId: string;
}
