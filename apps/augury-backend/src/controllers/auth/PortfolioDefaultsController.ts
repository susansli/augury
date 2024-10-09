import { Request, Response } from 'express';
import { assertExists } from '../../config/utils/validation';
import PortfolioDefaultsModel from '../../models/auth/PortfolioDefaultsModel';
import StatusCode from '../../config/enums/StatusCode';
import Severity from '../../config/enums/Severity';
import User from '../../config/interfaces/User';
import PortfolioDefault from '../../config/interfaces/PortfolioDefault';
import Identifiable from '../../config/interfaces/Identifiable';
import ApiError from '../../errors/ApiError';

const getPortfolioDefaults = async (
  req: Request<unknown, unknown, User>,
  res: Response
) => {
  const { id: userId } = req.body;
  // Assert the request format was valid
  assertExists(userId, 'Invalid ID Provided');
  // Retrieve data from the DB using request parameters/data
  const response = await PortfolioDefaultsModel.getDefaults(userId);

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

const createPortfolioDefaults = async (
  req: Request<unknown, unknown, Identifiable & PortfolioDefault>,
  res: Response
) => {
  // TODO: Add more fields that are from PortfolioDefaults
  const { id: userId } = req.body;
  // Assert the request format was valid
  assertExists(userId, 'Invalid ID Provided');
  // Retrieve data from the DB using request parameters/data
  // const response = await PortfolioDefaultsModel.getDefaults(userId);

  // if (response) {
  //   // send the user back after model runs logic
  //   res.status(StatusCode.OK).send({ user: response });
  // } else {
  //   // we throw an API error since this means something errored out with our server end
  //   throw new ApiError(
  //     'Unable to retrieve records for this user',
  //     StatusCode.INTERNAL_ERROR,
  //     Severity.MED
  //   );
  }
};

const updatePortfolioDefaults = async (
  req: Request<unknown, unknown, Identifiable & PortfolioDefault>,
  res: Response
) => {
  // TODO: Add more fields that are from PortfolioDefaults
  const { id: userId } = req.body;
  // Assert the request format was valid
  assertExists(userId, 'Invalid ID Provided');
  // Retrieve data from the DB using request parameters/data
  // const response = await PortfolioDefaultsModel.getDefaults(userId);

  // if (response) {
  //   // send the user back after model runs logic
  //   res.status(StatusCode.OK).send({ user: response });
  // } else {
  //   // we throw an API error since this means something errored out with our server end
  //   throw new ApiError(
  //     'Unable to retrieve records for this user',
  //     StatusCode.INTERNAL_ERROR,
  //     Severity.MED
  //   );
  // }
};

export default module.exports = {
  getPortfolioDefaults,
  createPortfolioDefaults,
  updatePortfolioDefaults,
};
