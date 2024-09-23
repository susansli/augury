import { ApplicationError } from "./ApplicationError";
export default class ClientError extends ApplicationError {
    private readonly _code: number;

    constructor( message, statusCode ) {

      super(message || "Bad request");
      this._code = statusCode | 500;

      Object.setPrototypeOf(this, ClientError.prototype);
    }

    get errors() {
      return [{ message: this.message}];
    }

    get statusCode() {
      return this._code;
    }
}
