import { ApplicationError } from './ApplicationError';
export enum SEVERITY {
  LOW,
  MED,
  HIGH,
  SEVERE,
}
export default class ApiError extends ApplicationError {
  private readonly _code: number;
  private readonly severity: SEVERITY;

  constructor(message, statusCode, severity) {
    super(message || 'Bad request');
    this._code = statusCode || 500;
    this.severity = severity || SEVERITY.LOW;

    Object.setPrototypeOf(this, ApiError.prototype);
  }

  get errors() {
    return [{ message: this.message }];
  }

  get statusCode() {
    return this._code;
  }
}
