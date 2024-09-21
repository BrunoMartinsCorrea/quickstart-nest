import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { UserDto } from '@/user/http-server/dto/user.dto';
import { UserGroupDto } from '@/authorization/http-server/dto/user-group.dto';

export class UserGroupUserViewDto {
  @ApiProperty({ example: {} as UserDto })
  @IsDefined({ message: 'user is not defined' })
  user: UserDto;

  @ApiProperty({ example: {} as UserGroupDto })
  @IsDefined({ message: 'userGroup is not defined' })
  userGroup: UserGroupDto;
}
