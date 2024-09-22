export type ErrorContent = {
    message: string,
    context?: { [key: string]: any }
  };
  
export abstract class ApplicationError extends Error {
abstract readonly statusCode: number;

constructor(message) {
    super(message);

    Object.setPrototypeOf(this, ApplicationError.prototype);
}
}

module.exports = ApplicationError;