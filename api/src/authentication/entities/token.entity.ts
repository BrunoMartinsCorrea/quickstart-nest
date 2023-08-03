export class Token {
  readonly access: string;
  readonly refresh: string;

  constructor(access: string, refresh: string) {
    this.access = access;
    this.refresh = refresh;
  }
}
