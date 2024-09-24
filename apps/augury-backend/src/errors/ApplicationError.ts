export abstract class ApplicationError extends Error {
  private readonly _code: number;

  constructor(message: string, statusCode: number) {
    super(message || 'Bad request');
    this._code = statusCode || 500;

    Object.setPrototypeOf(this, ApplicationError.prototype);
  }

  get errors() {
    return [{ message: this.message }];
  }

  get statusCode() {
    return this._code;
  }
}
