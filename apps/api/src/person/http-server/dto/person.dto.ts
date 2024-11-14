import { ApiProperty } from '@nestjs/swagger';

export class PersonDto {
  @ApiProperty()
  nationalRegistration: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  birthdate: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  deletedAt: string;
}
