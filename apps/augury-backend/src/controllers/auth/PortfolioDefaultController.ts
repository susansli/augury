import { Request, Response } from 'express';
import { assertEnum, assertExists } from '../../config/utils/validation';
import PortfolioDefaultsModel from '../../models/auth/PortfolioDefaultModel';
import StatusCode from '../../config/enums/StatusCode';
import Severity from '../../config/enums/Severity';
import User from '../../config/interfaces/User';
import PortfolioDefault from '../../config/interfaces/PortfolioDefault';
import ApiError from '../../errors/ApiError';
import PortfolioRisk from '../../config/enums/PortfolioRisk';
import Sectors from '../../config/enums/Sectors';

/**
 * Retrieves a User's portfolio defaults from the database by user ID
 * @param req Request with body containing a string `id` field
 * @param res Response with portfolio defaults
 * @throws `ClientError` if request is invalid
 * @throws `ApiError` if unable to retrieve defaults
 */
const getPortfolioDefaults = async (
  req: Request<unknown, unknown, User>,
  res: Response
) => {
  const { id: userId } = req.body;
  // Assert the request format was valid
  assertExists(userId, 'Invalid ID provided');
  // Retrieve data from the DB using request parameters/data
  const response = await PortfolioDefaultsModel.getPortfolioDefaults(userId);

  if (response) {
    // send the user back after model runs logic
    res.status(StatusCode.OK).send({ defaults: response });
  } else {
    // we throw an API error since this means something errored out with our server end
    throw new ApiError(
      'Unable to retrieve defaults for this user',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }
};

/**
 * Creates new portfolio defaults for a user based on the passed request body
 * @param req Request with `PortfolioDefault` options (e.g. userId, risk)
 * @param res Response with new portfolio defaults
 * @throws `ClientError` if request is invalid
 * @throws `ApiError` if unable to create defaults
 */
const createPortfolioDefaults = async (
  req: Request<unknown, unknown, PortfolioDefault>,
  res: Response
) => {
  const {
    userId,
    name,
    risk,
    useCustomRisk,
    customRiskPercentage1,
    customRiskPercentage2,
    sectorTags,
  }: PortfolioDefault = req.body;

  // Assert the request format was valid
  assertExists(userId, 'Invalid ID provided');
  assertExists(name, 'Invalid portfolio name provided');
  if (useCustomRisk) {
    assertExists(
      customRiskPercentage1,
      'Invalid customRiskPercentage1 Provided'
    );
    assertExists(
      customRiskPercentage2,
      'Invalid customRiskPercentage2 Provided'
    );
  } else {
    assertEnum(PortfolioRisk, risk, 'Invalid risk Provided');
  }
  if (Array.isArray(sectorTags)) {
    for (const tag of sectorTags) {
      assertEnum(Sectors, tag, 'Invalid sector tag provided');
    }
  }

  // Create a user in the DB using the request parameters/data
  const newDefaults: PortfolioDefault = {
    userId,
    name,
    risk: useCustomRisk ? undefined : risk,
    useCustomRisk,
    customRiskPercentage1,
    customRiskPercentage2,
    sectorTags,
  };

  const response = await PortfolioDefaultsModel.createPortfolioDefaults(
    newDefaults
  );

  if (response) {
    // send the defaults back after model runs logic
    res.status(StatusCode.OK).send({ defaults: response });
  } else {
    // we throw an API error since this means something errored out with our server end
    throw new ApiError(
      'Unable to create defaults for this user',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }
};

/**
 * Updates portfolio defaults for a user based on the passed request body
 * @param req Request with `PortfolioDefault` options (e.g. userId, risk)
 * @param res Response with updated portfolio defaults
 * @throws `ClientError` if request is invalid (missing `userId`)
 * @throws `ApiError` if unable to create defaults
 */
const updatePortfolioDefaults = async (
  req: Request<unknown, unknown, PortfolioDefault>,
  res: Response
) => {
  const {
    userId,
    name,
    risk,
    useCustomRisk,
    customRiskPercentage1,
    customRiskPercentage2,
    sectorTags,
  }: PortfolioDefault = req.body;

  // Assert the request format was valid
  assertExists(userId, 'Invalid ID provided');

  // Create a user in the DB using the request parameters/data
  const newDefaults: PortfolioDefault = {
    userId,
    name,
    risk,
    useCustomRisk,
    customRiskPercentage1,
    customRiskPercentage2,
    sectorTags,
  };

  const response = await PortfolioDefaultsModel.updatePortfolioDefaults(
    newDefaults
  );

  if (response) {
    // send the defaults back after model runs logic
    res.status(StatusCode.OK).send({ defaults: response });
  } else {
    // we throw an API error since this means something errored out with our server end
    throw new ApiError(
      'Unable to create defaults for this user',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }
};

export default module.exports = {
  getPortfolioDefaults,
  createPortfolioDefaults,
  updatePortfolioDefaults,
};
