export class JwtHeader {
  constructor(
    readonly alg: string,
    readonly typ: string,
  ) {}
}
