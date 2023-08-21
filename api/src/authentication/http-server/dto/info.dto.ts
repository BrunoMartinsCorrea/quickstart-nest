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

  constructor(header: JwtHeader, payload: JwtPayload, signature: string) {
    this.header = header;
    this.payload = payload;
    this.signature = signature;
  }
}
