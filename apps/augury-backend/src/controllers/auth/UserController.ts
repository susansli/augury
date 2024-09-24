import { Request, Response } from 'express';

import mongoose from 'mongoose';
import UserModel from '../../models/auth/UserModel';

const getUser = async (req: Request, res: Response): Promise<void> => {
  interface RequestParams {
    id: string;
  }
  const { id }: RequestParams = req.query as unknown as RequestParams;
  // TODO: Replace once merged in with error handling middleware
  if (!id) throw new Error('Invalid ID Provided'); // ApiError('Invalid ID Provided');

  const response = await UserModel.getUser(new mongoose.Types.ObjectId(id));

  if (response) {
    // send the user back after model runs logic
    res.status(200).send({ user: response });
  } else {
    // we throw an API error since this means something errored out with our server end
    // throw new ApiError('Unable to retrieve records for this user');
  }
};

export default module.exports = {
  getUser,
};
