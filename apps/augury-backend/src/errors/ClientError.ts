import { ApplicationError } from './ApplicationError';
export default class ClientError extends ApplicationError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);

    Object.setPrototypeOf(this, ClientError.prototype);
  }
}
