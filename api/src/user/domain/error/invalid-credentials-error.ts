import { AuthorizationError } from '../../../common/error/authorization-error';

export class InvalidCredentialsError extends AuthorizationError {
  constructor(message: string) {
    super(message);
  }
}
