import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class UserGroupDto {
  @ApiProperty({ example: 'Administrators' })
  @IsDefined({ message: 'name is not defined' })
  name: string;

  @ApiProperty({ example: 'System administrators' })
  @IsDefined({ message: 'description is not defined' })
  description: string;
}
