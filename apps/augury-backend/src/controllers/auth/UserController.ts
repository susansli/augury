import { Request, Response } from 'express';

import mongoose from 'mongoose';
import UserModel from '../../models/auth/UserModel';
import User from '../../config/interfaces/User';

const getUser = async (req: Request, res: Response): Promise<void> => {
  interface RequestParams {
    id: string;
  }
  const { id }: RequestParams = req.query;
  // TODO: Replace once merged in with error handling middleware
  if (!id) {
    throw new Error('Invalid ID Provided');
  } // ApiError('Invalid ID Provided');

  const response = await UserModel.getUser(new mongoose.Types.ObjectId(id));

  if (response) {
    // send the user back after model runs logic
    res.status(200).send({ user: response });
  } else {
    // we throw an API error since this means something errored out with our server end
    // throw new ApiError('Unable to retrieve records for this user');
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  interface RequestParams {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    balance: string;
  }
  const { email, password, firstName, lastName, balance }: RequestParams =
    req.query;
  // TODO: Replace once merged in with error handling middleware
  if (!email) {
    throw new Error('Invalid Email Provided');
  } // ApiError('Invalid Name Provided');
  if (!password) {
    throw new Error('Invalid Password Provided');
  } // ApiError('Invalid Password Provided');
  if (!firstName) {
    throw new Error('Invalid First Name Provided');
  } // ApiError('Invalid First Name Provided');
  if (!lastName) {
    throw new Error('Invalid Last Name Provided');
  } // ApiError('Invalid Last Name Provided');
  if (!balance || balance.trim() == '' || isNaN(Number(balance))) {
    throw new Error('Invalid Balance Provided');
  } // ApiError('Invalid Balance Provided');

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
    res.status(200).send({ user: response });
  } else {
    // we throw an API error since this means something errored out with our server end
    // throw new ApiError('Unable to create this user');
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  interface RequestParams {
    id: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    balance?: string;
  }
  const { id, email, password, firstName, lastName, balance }: RequestParams =
    req.query;
  // TODO: Replace once merged in with error handling middleware
  if (!id) {
    throw new Error('Invalid ID Provided');
  } // ApiError('Invalid ID Provided');

  const user: User = {
    email: email || undefined,
    password: password || undefined,
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    balance: balance ? Number(balance) : undefined,
  };

  const response = UserModel.updateUser(new mongoose.Types.ObjectId(id), user);

  if (response) {
    // send the user back after model runs logic
    res.status(200).send({ user: response });
  } else {
    // we throw an API error since this means something errored out with our server end
    // throw new ApiError('Unable to update this user');
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  interface RequestParams {
    id: string;
  }
  const { id }: RequestParams = req.query;
  // TODO: Replace once merged in with error handling middleware
  if (!id) {
    throw new Error('Invalid ID Provided');
  } // ApiError('Invalid ID Provided');

  const response = UserModel.deleteUser(new mongoose.Types.ObjectId(id));

  if (response) {
    // send the user back after model runs logic
    res.status(200).send({ user: response });
  } else {
    // we throw an API error since this means something errored out with our server end
    // throw new ApiError('Unable to delete this user');
  }
};

export default module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
