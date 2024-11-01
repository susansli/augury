import { Request, Response } from 'express';
import {
  assertEnum,
  assertExists,
  assertPortfolioDefaultsFormat,
} from '../../config/utils/validation';
import PortfolioDefaultsModel from '../../models/auth/PortfolioDefaultModel';
import StatusCode from '../../config/enums/StatusCode';
import Severity from '../../config/enums/Severity';
import User from '../../config/interfaces/User';
import PortfolioDefault from '../../config/interfaces/PortfolioDefault';
import ApiError from '../../errors/ApiError';
import Sectors from '../../config/enums/Sectors';
// import PortfolioRisk from '../../config/enums/PortfolioRisk';
import Identifiable from '../../config/interfaces/Identifiable';

type PortfolioDefaultResponse = {
  defaults: PortfolioDefault;
};

/**
 * Retrieves a User's portfolio defaults from the database by user ID
 * @param req Request with URL parameter containing an `id`
 * @param res Response with portfolio defaults
 * @throws `ClientError` if request is invalid
 * @throws `ApiError` if unable to retrieve defaults
 */
const getPortfolioDefaults = async (
  req: Request<Identifiable>,
  res: Response<PortfolioDefaultResponse>
) => {
  const { id: userId } = req.params;
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
  res: Response<PortfolioDefaultResponse>
) => {
  // Assert the request format was valid
  assertPortfolioDefaultsFormat(req.body);
  // Create a user in the DB using the request parameters/data
  const {
    userId,
    name,
    // risk,
    // useCustomRisk,
    riskPercentage1,
    riskPercentage2,
    sectorTags,
  }: PortfolioDefault = req.body;

  const newDefaults: PortfolioDefault = {
    userId,
    name,
    // risk: useCustomRisk ? undefined : risk,
    // useCustomRisk,
    riskPercentage1,
    riskPercentage2,
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
  res: Response<PortfolioDefaultResponse>
) => {
  const {
    userId,
    name,
    // risk,
    // useCustomRisk,
    riskPercentage1,
    riskPercentage2,
    sectorTags,
  }: PortfolioDefault = req.body;
  // Assert the request format was valid
  assertExists(userId, 'Invalid ID provided');
  // if (risk != null) {
  //   assertEnum(PortfolioRisk, risk, 'Invalid risk provided');
  // }
  if (Array.isArray(sectorTags)) {
    for (const tag of sectorTags) {
      assertEnum(Sectors, tag, 'Invalid sector tag provided');
    }
  }
  // Create a user in the DB using the request parameters/data
  const newDefaults: PortfolioDefault = {
    userId,
    name,
    // risk,
    // useCustomRisk,
    riskPercentage1,
    riskPercentage2,
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

/**
 * Deletes portfolio defaults from the database.
 * @param req Request with an `id` field
 * @param res Deleted user's information
 */
const deletePortfolioDefaults = async (
  req: Request<unknown, unknown, User>,
  res: Response<PortfolioDefaultResponse>
): Promise<void> => {
  const { id: userId } = req.body;
  // Assert the request format was valid
  assertExists(userId, 'Invalid ID provided');
  // Delete the User from the DB
  const response = await PortfolioDefaultsModel.deletePortfolioDefaults(userId);

  if (response) {
    // send the user back after model runs logic
    res.status(StatusCode.OK).send({ defaults: response });
  } else {
    // we throw an API error since this means something errored out with our server end
    throw new ApiError(
      'Unable to delete portfolio defaults for this user',
      StatusCode.INTERNAL_ERROR,
      Severity.LOW
    );
  }
};

export default module.exports = {
  getPortfolioDefaults,
  createPortfolioDefaults,
  updatePortfolioDefaults,
  deletePortfolioDefaults,
};
