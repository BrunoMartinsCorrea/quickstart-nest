import { JwtHeader } from './jwt-header';
import { JwtPayload } from './jwt-payload';

export class Jwt {
  constructor(
    readonly header: JwtHeader,
    readonly payload: JwtPayload,
    readonly signature: string,
  ) {}
}
