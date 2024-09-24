import { Request, Response } from 'express';

import PortfolioGroupModel from '../../models/auth/PortfolioGroupModel';
import { Color } from '../../config/interfaces/PortfolioGroup';

const getPortfolioGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  interface RequestParams {
    id: string;
  }
  const { id }: RequestParams = req.query;
  // TODO: Replace once merged in with error handling middleware
  if (!id) throw new Error('Invalid ID Provided'); // ApiError('Invalid ID Provided');

  const response = await PortfolioGroupModel.getPortfolioGroup(id);

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
    color: Color;
    userId: string;
  }
  const { name, color, userId }: RequestParams = req.query;
  // TODO: Replace once merged in with error handling middleware
  if (!name) throw new Error('Invalid Name Provided'); // ApiError('Invalid ID Provided');
  if (!color) throw new Error('Invalid Color Provided'); // ApiError('Invalid ID Provided');
  if (!userId) throw new Error('Invalid User ID Provided'); // ApiError('Invalid ID Provided');

  const response = PortfolioGroupModel.createPortfolioGroup(
    name,
    color,
    userId
  );

  if (response) {
    // send the user back after model runs logic
    res.status(200).send({ user: response });
  } else {
    // we throw an API error since this means something errored out with our server end
    // throw new ApiError('Unable to retrieve records for this user');
  }
};

const updatePortfolioGroup = async (
  _req: Request,
  res: Response
): Promise<void> => {
  // Handle validation of request body

  const response = PortfolioGroupModel.getPortfolioGroup();

  if (response) {
    // send the user back after model runs logic
    res.status(200).send({ user: response });
  } else {
    // we throw an API error since this means something errored out with our server end
    // throw new ApiError('Unable to retrieve records for this user');
  }
};

const deletePorfolioGroup = async (
  _req: Request,
  res: Response
): Promise<void> => {
  // Handle validation of request body

  const response = PortfolioGroupModel.getPortfolioGroup();

  if (response) {
    // send the user back after model runs logic
    res.status(200).send({ user: response });
  } else {
    // we throw an API error since this means something errored out with our server end
    // throw new ApiError('Unable to retrieve records for this user');
  }
};

export default module.exports = {
  getPortfolioGroup,
  createPortfolioGroup,
  updatePortfolioGroup,
  deletePorfolioGroup,
};
