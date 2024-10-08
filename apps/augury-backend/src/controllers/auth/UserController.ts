import { Request, Response } from 'express';

import { HydratedDocument } from 'mongoose';
import UserModel from '../../models/auth/UserModel';
import User from '../../config/interfaces/User';
import StatusCode from '../../config/enums/StatusCode';
import ApiError from '../../errors/ApiError';
import { assertExists, assertNumber } from '../../config/utils/validation';
import Severity from '../../config/enums/Severity';

const getUser = async (req: Request, res: Response): Promise<void> => {
  const { _id: userId } = req.user as HydratedDocument<User>;
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

const createUser = async (req: Request, res: Response): Promise<void> => {
  const { email, googleId, firstName, lastName, balance }: Required<User> =
    req.query;
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

const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { _id: userId } = req.user as HydratedDocument<User>;
  const { email, googleId, firstName, lastName }: Partial<User> = req.query;
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

const updateUserBalance = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { _id: userId } = req.user as HydratedDocument<User>;
  const { balance }: Partial<User> = req.query;
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

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { _id: userId } = req.user as HydratedDocument<User>;
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

export default module.exports = {
  getUser,
  createUser,
  updateUser,
  updateUserBalance,
  deleteUser,
};
