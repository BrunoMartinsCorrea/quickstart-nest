import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '@/user/http-server/dto/create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  @ApiProperty()
  newPassword?: string;
}
