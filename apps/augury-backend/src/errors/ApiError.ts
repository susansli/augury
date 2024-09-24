import { ApplicationError } from './ApplicationError';
export enum Severity {
  LOW,
  MED,
  HIGH,
  SEVERE,
}
export default class ApiError extends ApplicationError {
  private readonly severity: Severity;

  constructor(message: string, statusCode: number, severity: Severity) {
    super(message, statusCode);
    this.severity = severity || Severity.LOW;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
