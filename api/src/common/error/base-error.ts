export class BaseError extends Error {
  readonly errorCode: string;

  constructor(message: string, errorCode: string) {
    super(message);
    this.errorCode = errorCode;
  }
}
