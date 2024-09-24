import { ApplicationError } from './ApplicationError';
export enum Severity {
  LOW,
  MED,
  HIGH,
  SEVERE,
}
export default class ApiError extends ApplicationError {
  private readonly _code: number;
  private readonly severity: Severity;

  constructor(message: string, statusCode: number, severity: Severity) {
    super(message || 'Bad request');
    this._code = statusCode || 500;
    this.severity = severity || Severity.LOW;

    Object.setPrototypeOf(this, ApiError.prototype);
  }

  get errors() {
    return [{ message: this.message }];
  }

  get statusCode() {
    return this._code;
  }
}
