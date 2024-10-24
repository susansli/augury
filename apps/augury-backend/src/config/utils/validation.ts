import ClientError from '../../errors/ClientError';
import PortfolioRisk from '../enums/PortfolioRisk';
import Sectors from '../enums/Sectors';
import StatusCode from '../enums/StatusCode';
import Portfolio from '../interfaces/Portfolio';

/**
 * Throws an error if the passed parameter from a client request doesn't exist
 * @param param from client request (typically a string)
 * @param errorMsg message to throw as a `ClientError`
 * @throws `ClientError` if parameter is `null` or `undefined`
 */
export function assertExists<T>(param: T, errorMsg: string) {
  if (!(param != null)) {
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

/**
 * Throws an error if the passed value exists within the source enumerator
 * @param enumObj Enumerator
 * @param value to check
 * @param errorMsg Message thrown when not valid enum
 * @throws `ClientError` if value doesn't exist within the enum
 */
export function assertEnum<T, G>(enumObj: T, value: G, errorMsg: string) {
  // Check if enum contains correct value
  const isValid = Object.values(enumObj).includes(value);
  if (!isValid) {
    throw new ClientError(errorMsg, StatusCode.BAD_REQUEST);
  }
}

/**
 * Validates and asserts that the passed defaults object is in the correct form
 * @param defaults object
 * @throws `ClientError` with message if invalid format
 */
export function assertPortfolioDefaultsFormat(defaults: Portfolio) {
  assertExists(defaults, 'Invalid defaults provided');
  assertExists(defaults.name, 'Invalid portfolio name provided');
  if (defaults.useCustomRisk) {
    assertExists(
      defaults.customRiskPercentage1,
      'Invalid customRiskPercentage1 provided'
    );
    assertExists(
      defaults.customRiskPercentage2,
      'Invalid customRiskPercentage2 provided'
    );
  } else {
    assertEnum(PortfolioRisk, defaults.risk, 'Invalid risk provided');
  }
  if (Array.isArray(defaults.sectorTags)) {
    for (const tag of defaults.sectorTags) {
      assertEnum(Sectors, tag, 'Invalid sector tag provided');
    }
  }
}
