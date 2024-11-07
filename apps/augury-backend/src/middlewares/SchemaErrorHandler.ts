import { Error } from 'mongoose';
import ApiError from '../errors/ApiError';
import StatusCode from '../config/enums/StatusCode';
import Severity from '../config/enums/Severity';

interface DuplicateKeyError {
  code: number;
  errmsg: string;
}

// Helper function to validate error was in fact a duplicate key error.
function isDuplicatekeyError(obj: any): obj is DuplicateKeyError {
  return (
    obj &&
    typeof obj.code === 'number' &&
    obj.code === 11000 &&
    typeof obj.errmsg === 'string'
  );
}

/**
 * Error handler wrapper function to handle Mongoose Schema errors gracefully.
 * @param promise to await for database results
 * @returns result from Promise
 * @throws Custom `ApiError` if an error has occurred
 */
export default async function schemaErrorHandler<T>(promise: Promise<T>) {
  try {
    return await promise;
  } catch (error: unknown) {
    if (error instanceof Error.ValidationError) {
      for (const field in error.errors) {
        console.log(error.errors[field].message);
      }
      throw new ApiError(
        'Validation error occurred',
        StatusCode.INTERNAL_ERROR,
        Severity.LOW
      );
    } else if (error instanceof Error.CastError) {
      throw new ApiError(
        'Invalid ID value passed from model: ' + error.value,
        StatusCode.INTERNAL_ERROR,
        Severity.LOW
      );
    } else if (isDuplicatekeyError(error)) {
      throw new ApiError(
        'Could not insert; duplicate key',
        StatusCode.INTERNAL_ERROR,
        Severity.LOW
      );
    } else {
      throw new ApiError(
        'An unknown error has occurred reading/writing from DB! ' + error,
        StatusCode.INTERNAL_ERROR,
        Severity.HIGH
      );
    }
  }
}
