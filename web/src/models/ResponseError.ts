export class ResponseError extends Error {
  statusCode: number;
  timestamp: string;
  errorCode: string;
  message: string;

  constructor({
    statusCode,
    timestamp,
    errorCode,
    message,
  }: {
    statusCode: number;
    timestamp: string;
    errorCode: string;
    message: string;
  }) {
    super(message);
    this.statusCode = statusCode;
    this.timestamp = timestamp;
    this.errorCode = errorCode;
    this.message = message;
  }
}
