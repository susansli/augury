import ClientError from '../../errors/ClientError';
import StatusCode from '../enums/StatusCode';

/**
 * Throws an error if the passed parameter from a client request doesn't exist
 * @param param from client request (typically a string)
 * @param errorMsg message to throw as a `ClientError`
 * @throws `ClientError` if parameter is "falsy"
 */
export function assertExists<T>(param: T, errorMsg: string) {
  if (!param) {
    throw new ClientError(errorMsg, StatusCode.BAD_REQUEST);
  }
}

/**
 * Throws an error if the passed paramter from a client request is not a "number"
 * (e.g. Check that it's actually a number literal or a valid number string)
 * @param param from client request (typically a string)
 * @param errorMsg message to throw as a `ClientError`
 * @throws `ClientError` if parameter is not a number literal or valid string
 */
export function assertNumber<T>(param: T, errorMsg: string) {
  // Check if parameter wasn't a number or a non-empty string
  const hasValue =
    typeof param === 'number' ||
    (typeof param === 'string' && param.trim() !== '');
  // Check isNaN as well to check string number validity
  if (!hasValue || isNaN(param as number)) {
    throw new ClientError(errorMsg, StatusCode.BAD_REQUEST);
  }
}
