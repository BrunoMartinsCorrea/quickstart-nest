import { JwtHeader } from '@/authentication/domain/model/jwt-header';
import { JwtPayload } from '@/authentication/domain/model/jwt-payload';

export class Jwt {
  constructor(
    readonly header: JwtHeader,
    readonly payload: JwtPayload,
    readonly signature: string,
  ) {}
}
