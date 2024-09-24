import { Request, Response } from 'express';

import mongoose from 'mongoose';
import PortfolioGroupModel from '../../models/auth/PortfolioGroupModel';
import PortfolioGroup from '../../config/interfaces/PortfolioGroup';
import { Color } from '../../config/interfaces/PortfolioGroup';

const getPortfolioGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  interface RequestParams {
    id: string;
  }
  const { id }: RequestParams = req.query as unknown as RequestParams;
  // TODO: Replace once merged in with error handling middleware
  if (!id) throw new Error('Invalid ID Provided'); // ApiError('Invalid ID Provided');

  const response = await PortfolioGroupModel.getPortfolioGroup(
    new mongoose.Types.ObjectId(id)
  );

  if (response) {
    // send the user back after model runs logic
    res.status(200).send({ user: response });
  } else {
    // we throw an API error since this means something errored out with our server end
    // throw new ApiError('Unable to retrieve records for this user');
  }
};

// TODO: Work on these ones after this point
const createPortfolioGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  interface RequestParams {
    name: string;
    color: string;
    userId: string;
  }
  const { name, color, userId }: RequestParams =
    req.query as unknown as RequestParams;
  // TODO: Replace once merged in with error handling middleware
  if (!name) throw new Error('Invalid Name Provided'); // ApiError('Invalid Name Provided');
  if (!color) throw new Error('Invalid Color Provided'); // ApiError('Invalid Color Provided');
  if (!userId) throw new Error('Invalid User ID Provided'); // ApiError('Invalid ID Provided');

  const portfolioGroup: Partial<PortfolioGroup> = {
    name: name,
    color: Color[color.toUpperCase() as keyof typeof Color],
    userId: new mongoose.Types.ObjectId(userId),
  };

  const response = PortfolioGroupModel.createPortfolioGroup(portfolioGroup);

  if (response) {
    // send the user back after model runs logic
    res.status(200).send({ user: response });
  } else {
    // we throw an API error since this means something errored out with our server end
    // throw new ApiError('Unable to create this user');
  }
};

const updatePortfolioGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  interface RequestParams {
    id: string;
    name?: string;
    color?: string;
    userId?: string;
  }
  const { id, name, color, userId }: RequestParams =
    req.query as unknown as RequestParams;
  // TODO: Replace once merged in with error handling middleware
  if (!id) throw new Error('Invalid ID Provided'); // ApiError('Invalid ID Provided');

  const portfolioGroup: Partial<PortfolioGroup> = {
    name: name,
    color: Color[color.toUpperCase() as keyof typeof Color],
    userId: new mongoose.Types.ObjectId(userId),
  };

  const response = PortfolioGroupModel.updatePortfolioGroup(
    new mongoose.Types.ObjectId(id),
    portfolioGroup
  );

  if (response) {
    // send the user back after model runs logic
    res.status(200).send({ user: response });
  } else {
    // we throw an API error since this means something errored out with our server end
    // throw new ApiError('Unable to update this user');
  }
};

const deletePorfolioGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  interface RequestParams {
    id: string;
  }
  const { id }: RequestParams = req.query as unknown as RequestParams;
  // TODO: Replace once merged in with error handling middleware
  if (!id) throw new Error('Invalid ID Provided'); // ApiError('Invalid ID Provided');

  const response = PortfolioGroupModel.deletePorfolioGroup(
    new mongoose.Types.ObjectId(id)
  );

  if (response) {
    // send the user back after model runs logic
    res.status(200).send({ user: response });
  } else {
    // we throw an API error since this means something errored out with our server end
    // throw new ApiError('Unable to delete this user');
  }
};

export default module.exports = {
  getPortfolioGroup,
  createPortfolioGroup,
  updatePortfolioGroup,
  deletePorfolioGroup,
};
