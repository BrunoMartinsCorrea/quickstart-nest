import { ApiProperty } from '@nestjs/swagger';
import { JwtHeader } from '@/authentication/domain/model/jwt-header';
import { JwtPayload } from '@/authentication/domain/model/jwt-payload';

export class InfoDto {
  @ApiProperty()
  header: JwtHeader;

  @ApiProperty()
  payload: JwtPayload;

  @ApiProperty()
  signature: string;
}
