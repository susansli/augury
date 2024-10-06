import { ApplicationError } from './ApplicationError';
import Severity from '../config/enums/Severity';

export default class ApiError extends ApplicationError {
  private readonly severity: Severity;

  constructor(message: string, statusCode: number, severity: Severity) {
    super(message, statusCode);
    this.severity = severity || Severity.LOW;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
