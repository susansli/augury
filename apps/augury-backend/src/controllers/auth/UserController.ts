import { Request, Response } from 'express';

import {
  assertEnum,
  assertExists,
  assertNumber,
} from '../../config/utils/validation';
import UserModel from '../../models/auth/UserModel';
import User from '../../config/interfaces/User';
import StatusCode from '../../config/enums/StatusCode';
import ApiError from '../../errors/ApiError';
import Severity from '../../config/enums/Severity';
import Portfolio from '../../config/interfaces/Portfolio';
import PortfolioRisk from '../../config/enums/PortfolioRisk';
import Sectors from '../../config/enums/Sectors';
import PortfolioDefault from '../../config/interfaces/PortfolioDefault';
import PortfolioDefaultModel from '../../models/auth/PortfolioDefaultModel';

type UserReponse = {
  user: User;
};

/**
 * Retrieves a User from the database based on their ID
 * @param req Request with body containing a string `id` field
 * @param res Response with user data
 * @throws ClientError if request is invalid
 * @throws ApiError if unable to retrieve user
 */
const getUser = async (
  req: Request<unknown, unknown, User>,
  res: Response<UserReponse>
): Promise<void> => {
  const { id: userId } = req.body;
  // Assert the request format was valid
  assertExists(userId, 'Invalid ID provided');

  // Retrieve data from the DB using request parameters/data
  const response = await UserModel.getUser(userId);

  if (response) {
    // send the user back after model runs logic
    res.status(StatusCode.OK).send({ user: response });
  } else {
    // we throw an API error since this means something errored out with our server end
    throw new ApiError(
      'Unable to retrieve records for this user',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }
};

/**
 * Retrieves the currently logged in User from the database based on their session's `accessToken`
 * @param req Request with `accessToken` cookie
 * @param res Response with user data
 * @throws ClientError if request is invalid
 * @throws ApiError if unable to retrieve user
 */
const getLoggedInUserData = async (
  req: Request,
  res: Response<UserReponse>
): Promise<void> => {
  const accessToken = req.cookies?.accessToken;
  // Assert the request format was valid
  assertExists(accessToken, 'Invalid session token provided');
  // Retrieve data from the DB using request parameters/data
  const response = await UserModel.getUserBySessionToken(accessToken);

  if (response) {
    // send the user back after model runs logic
    res.status(StatusCode.OK).send({ user: response });
  } else {
    // we throw an API error since this means something errored out with our server end
    throw new ApiError(
      'Unable to retrieve records for the logged in user!',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }
};

/**
 * Creates a new user in the datbase based on the passed request body data
 * @param req Request with body containing a `User`'s fields
 * @param res Response with new user data
 * @throws ClientError if request is invalid
 * @throws ApiError if unable to create user
 */
const createUser = async (
  req: Request<unknown, unknown, User>,
  res: Response<UserReponse>
): Promise<void> => {
  const { email, googleId, firstName, lastName, balance }: User = req.body;
  // Assert the request format was valid
  assertExists(email, 'Invalid email provided');
  assertExists(googleId, 'Invalid Google ID provided');
  assertExists(firstName, 'Invalid first name provided');
  assertExists(lastName, 'Invalid last name provided');
  assertNumber(balance, 'Invalid balance provided');

  // Create a User in the DB using request parameters/data
  const user: User = {
    email: email,
    googleId: googleId,
    firstName: firstName,
    lastName: lastName,
    balance: Number(balance),
  };

  const response = await UserModel.createUser(user);

  if (response) {
    // send the user back after model runs logic
    res.status(StatusCode.OK).send({ user: response });
  } else {
    // we throw an API error since this means something errored out with our server end
    throw new ApiError(
      'Unable to create user!',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }
};

/**
 * Updates a user entry in the datbase based on the passed request body data and id
 * @param req Request with body containing an `id` and the `User`'s fields to update
 * @param res Response with updated user data
 * @throws ClientError if request is invalid
 * @throws ApiError if unable to update user
 */
const updateUser = async (
  req: Request<unknown, unknown, User>,
  res: Response<UserReponse>
): Promise<void> => {
  const { id: userId, email, googleId, firstName, lastName } = req.body;
  // Assert the request format was valid
  assertExists(userId, 'Invalid ID provided!');

  // Update the User in the DB using request parameters/data
  const user: Partial<User> = {
    email: email || undefined,
    googleId: googleId || undefined,
    firstName: firstName || undefined,
    lastName: lastName || undefined,
  };
  const response = await UserModel.updateUser(userId, user);

  if (response) {
    // send the user back after model runs logic
    res.status(StatusCode.OK).send({ user: response });
  } else {
    // we throw an API error since this means something errored out with our server end
    throw new ApiError(
      'Unable to update this user',
      StatusCode.INTERNAL_ERROR,
      Severity.LOW
    );
  }
};

/**
 * Updates a user's balance in the datbase based on the passed balance and id
 * @param req Request with body containing an `id` and the new `balance`
 * @param res Response with updated user data
 * @throws ClientError if request is invalid
 * @throws ApiError if unable to update user
 */
const updateUserBalance = async (
  req: Request<unknown, unknown, User>,
  res: Response<UserReponse>
): Promise<void> => {
  const { id: userId, balance } = req.body;
  // Assert the request format was valid
  assertExists(userId, 'Invalid ID provided!');
  assertNumber(balance, 'Invalid balance provided');

  // Update the User in the DB using request parameters/data
  const updatedUserFields: Partial<User> = {
    balance,
  };
  const response = await UserModel.updateUser(userId, updatedUserFields);

  if (response) {
    // send the user back after model runs logic
    res.status(StatusCode.OK).send({ user: response });
  } else {
    // we throw an API error since this means something errored out with our server end
    throw new ApiError(
      'Unable to update user balance',
      StatusCode.INTERNAL_ERROR,
      Severity.LOW
    );
  }
};

/**
 * Deletes a user from the database.
 * ! NOTE: This function should be used sparingly and needs impl to handle additional logic if used _at all_!
 * @param req Request with an `id` field
 * @param res Deleted user's information
 */
const deleteUser = async (
  req: Request<unknown, unknown, User>,
  res: Response<UserReponse>
): Promise<void> => {
  const { id: userId } = req.body;
  // Assert the request format was valid
  assertExists(userId, 'Invalid ID provided');
  // Delete the User from the DB
  const response = await UserModel.deleteUser(userId);

  if (response) {
    // send the user back after model runs logic
    res.status(StatusCode.OK).send({ user: response });
  } else {
    // we throw an API error since this means something errored out with our server end
    throw new ApiError(
      'Unable to delete this user',
      StatusCode.INTERNAL_ERROR,
      Severity.LOW
    );
  }
};

// Interfaces for client onboarding request & response
interface OnboardingRequestBody {
  id: string;
  balance: number;
  defaults: Portfolio;
}

interface OnboardingResponse {
  user: User;
  defaults: PortfolioDefault;
}

/**
 * Onboarding route handler that handles creating Portfolio Defaults and updating the user's account balance.
 * @param req Request object
 * @param res Response object
 */
const onboardNewUser = async (
  req: Request<unknown, unknown, OnboardingRequestBody>,
  res: Response<OnboardingResponse>
): Promise<void> => {
  const { id: userId, balance, defaults } = req.body;
  assertExists(defaults, 'Invalid defaults provided');
  const {
    name,
    risk,
    useCustomRisk,
    customRiskPercentage1,
    customRiskPercentage2,
    sectorTags,
  }: Portfolio = defaults;
  // Assert the request format was valid starting with user ID and new balance
  assertExists(userId, 'Invalid ID provided');
  assertNumber(balance, 'Invalid balance provided');
  // Assert the defaults formatting was valid
  assertExists(name, 'Invalid portfolio name provided');
  if (useCustomRisk) {
    assertExists(
      customRiskPercentage1,
      'Invalid customRiskPercentage1 provided'
    );
    assertExists(
      customRiskPercentage2,
      'Invalid customRiskPercentage2 provided'
    );
  } else {
    assertEnum(PortfolioRisk, risk, 'Invalid risk provided');
  }
  if (Array.isArray(sectorTags)) {
    for (const tag of sectorTags) {
      assertEnum(Sectors, tag, 'Invalid sector tag provided');
    }
  }
  // Create new defaults
  const newDefaults: PortfolioDefault = {
    userId,
    name,
    risk: useCustomRisk ? undefined : risk,
    useCustomRisk,
    customRiskPercentage1,
    customRiskPercentage2,
    sectorTags,
  };
  const defaultsResponse = await PortfolioDefaultModel.createPortfolioDefaults(
    newDefaults
  );
  if (!defaultsResponse) {
    // we throw an API error since this means something errored out with our server end
    throw new ApiError(
      'Unable to create defaults for this user',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }
  // Finally update balance.
  const updatedUserFields: Partial<User> = {
    balance,
  };
  const updateUserResponse = await UserModel.updateUser(
    userId,
    updatedUserFields
  );
  if (!updateUserResponse) {
    throw new ApiError(
      'Unable to update user balance',
      StatusCode.INTERNAL_ERROR,
      Severity.LOW
    );
  }

  res
    .status(StatusCode.OK)
    .send({ user: updateUserResponse, defaults: defaultsResponse });
};

export default module.exports = {
  getUser,
  getLoggedInUserData,
  createUser,
  updateUser,
  updateUserBalance,
  deleteUser,
  onboardNewUser,
};
