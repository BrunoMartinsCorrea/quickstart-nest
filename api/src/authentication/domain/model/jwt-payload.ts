export class JwtPayload {
  constructor(
    readonly iat: number,
    readonly nbf: number,
    readonly exp: number,
    readonly aud: string,
    readonly iss: string,
    readonly sub: string,
    readonly jti: string,
  ) {}
}
