import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class UserGroupUserDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsDefined({ message: 'userId is not defined' })
  userId: string;

  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsDefined({ message: 'userGroupId is not defined' })
  userGroupId: string;
}
