import { Request, Response } from 'express';

import mongoose from 'mongoose';
import UserModel from '../../models/auth/UserModel';
import User from '../../config/interfaces/User';
import StatusCode from '../../config/enums/StatusCode';
import ApiError from '../../errors/ApiError';
import { assertExists, assertNumber } from '../../config/utils/validation';
import { Severity } from '../../config/enums/Severity';

const getUser = async (req: Request, res: Response): Promise<void> => {
  interface RequestParams {
    id: string;
  }
  const { id }: RequestParams = req.query;
  // Assert the request format was valid
  assertExists(id, 'Invalid ID Provided');
  // Retrieve data from the DB using request parameters/data
  const userId = new mongoose.Types.ObjectId(id);
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
  const { email, password, firstName, lastName, balance }: Required<User> =
    req.query;
  // Assert the request format was valid
  assertExists(email, 'Invalid Email Provided');
  assertExists(password, 'Invalid Password Provided');
  assertExists(firstName, 'Invalid First Name Provided');
  assertExists(lastName, 'Invalid Last Name Provided');
  assertNumber(balance, 'Invalid Balance Provided');
  // Create a User in the DB using request parameters/data
  const user: User = {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    balance: Number(balance),
  };

  const response = UserModel.createUser(user);

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
  interface RequestParams extends Partial<User> {
    id: string;
  }
  const { id, email, password, firstName, lastName, balance }: RequestParams =
    req.query;
  // Assert the request format was valid
  assertExists(id, 'Invalid ID provided!');
  // Update the User in the DB using request parameters/data
  const user: User = {
    email: email || undefined,
    password: password || undefined,
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    balance: balance ? Number(balance) : undefined,
  };
  const userId = new mongoose.Types.ObjectId(id);
  const response = UserModel.updateUser(userId, user);

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

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  interface RequestParams {
    id: string;
  }
  const { id }: RequestParams = req.query;
  // Assert the request format was valid
  assertExists(id, 'Invalid ID provided');
  // Delete the User from the DB
  const userId = new mongoose.Types.ObjectId(id);
  const response = UserModel.deleteUser(userId);

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
  deleteUser,
};
