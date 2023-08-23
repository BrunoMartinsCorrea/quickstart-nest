import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
