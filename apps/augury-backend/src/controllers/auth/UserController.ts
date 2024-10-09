import { Request, Response } from 'express';

import { assertExists, assertNumber } from '../../config/utils/validation';
import PortfolioDefaultsController from './PortfolioDefaultsController';
import UserModel from '../../models/auth/UserModel';
import User from '../../config/interfaces/User';
import StatusCode from '../../config/enums/StatusCode';
import ApiError from '../../errors/ApiError';
import Severity from '../../config/enums/Severity';
import PortfolioDefault from '../../config/interfaces/PortfolioDefault';

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
  assertExists(userId, 'Invalid ID Provided');

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
  assertExists(accessToken, 'Invalid session token provided!');
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
  assertExists(email, 'Invalid Email Provided');
  assertExists(googleId, 'Invalid Google ID Provided');
  assertExists(firstName, 'Invalid First Name Provided');
  assertExists(lastName, 'Invalid Last Name Provided');
  assertNumber(balance, 'Invalid Balance Provided');

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
  assertNumber(balance, 'Invalid Balance Provided');

  // Update the User in the DB using request parameters/data
  const user: Partial<User> = {
    balance: balance ? Number(balance) : undefined,
  };
  const response = await UserModel.updateUser(userId, user);

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

/**
 * Simple onboarding route handler that handles creating Portfolio Defaults and updating the user's account balance.
 * @param req Request object
 * @param res Response object
 */
const onboardNewUser = async (
  req: Request<unknown, unknown, User & PortfolioDefault>,
  res: Response
): Promise<void> => {
  await PortfolioDefaultsController.createPortfolioDefaults(req, res);
  await updateUserBalance(req, res);
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
