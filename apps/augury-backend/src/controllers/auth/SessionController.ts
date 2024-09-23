import { Request, Response } from 'express';

import SessionModel from '../../models/auth/SessionModel';

const getSession = async (_req: Request, res: Response): Promise<void> => {
  // Handle validation of request body

  const response = SessionModel.getSession();

  if (response) {
    // send the user back after model runs logic
    res.status(200).send({ user: response });
  } else {
    // we throw an API error since this means something errored out with our server end
    // throw new ApiError('Unable to retrieve records for this user');
  }
};

export default module.exports = {
  getSession,
};
