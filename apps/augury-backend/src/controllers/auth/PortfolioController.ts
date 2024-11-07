import { Request, Response } from 'express';
import {
  assertEnum,
  assertExists,
  assertValidRiskComposition,
} from '../../config/utils/validation';
import PortfolioModel from '../../models/auth/PortfolioModel';
import StatusCode from '../../config/enums/StatusCode';
import Severity from '../../config/enums/Severity';
import Portfolio, {
  PortfolioResponse,
} from '../../config/interfaces/Portfolio';
import ApiError from '../../errors/ApiError';
import Sectors from '../../config/enums/Sectors';
import Identifiable from '../../config/interfaces/Identifiable';

/**
 * Creates a new Portfolio based on the passed request body
 * @param req Request with `Portfolio` fields inside the body
 * @param res Response with new Portfolio
 * @throws `ClientError` if request is invalid
 * @throws `ApiError` if unable to create portfolio
 */
const createPortfolio = async (
  req: Request<unknown, unknown, Portfolio>,
  res: Response<PortfolioResponse>
) => {
  const { name, riskPercentage1, riskPercentage2, sectorTags }: Portfolio =
    req.body;
  // Assert the request format was valid
  assertExists(name, 'Invalid Name provided');
  assertValidRiskComposition(riskPercentage1, riskPercentage2);
  if (sectorTags && Array.isArray(sectorTags)) {
    for (const tag of sectorTags) {
      assertEnum(Sectors, tag, 'Invalid sector tag provided');
    }
  }
  // Create a user in the DB using the request parameters/data
  const newPortfolio: Portfolio = {
    name,
    riskPercentage1,
    riskPercentage2,
    sectorTags,
  };
  const response = await PortfolioModel.createPortfolio(newPortfolio);

  if (!response) {
    // we throw an API error since this means something errored out with our server end
    throw new ApiError(
      'Unable to create this portfolio',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }
  // send the portfolio back after model runs logic
  res.status(StatusCode.OK).send({ portfolio: response });
};

/**
 * Retrieves a Portfolio from the database by ID
 * @param req Request with id URL parameter
 * @param res Response with a `Portfolio`
 * @throws `ClientError` if request is invalid
 * @throws `ApiError` if unable to retrieve the portfolio
 */
const getPortfolio = async (
  req: Request<Identifiable>,
  res: Response<PortfolioResponse>
) => {
  const { id: portfolioId } = req.params;
  // Assert the request format was valid
  assertExists(portfolioId, 'Invalid ID provided');
  // Retrieve data from the DB using request parameters/data
  const response = await PortfolioModel.getPortfolio(portfolioId);

  if (!response) {
    // we throw an API error since this means something errored out with our server end
    throw new ApiError(
      'Unable to retrieve this portfolio',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }
  // Send the portfolio back after model runs logic
  res.status(StatusCode.OK).send({ portfolio: response });
};

/**
 * Updates a portfolio based on the passed request body
 * @param req Request with `Portfolio` fields in body and `id` URL parameter
 * @param res Response with updated Portfolio
 * @throws `ClientError` if request is invalid (missing/invalid `userId`)
 * @throws `ApiError` if unable to create defaults
 */
const updatePortfolio = async (
  req: Request<Identifiable, unknown, Portfolio>,
  res: Response<PortfolioResponse>
) => {
  const { id: portfolioId } = req.params;
  const { name, riskPercentage1, riskPercentage2, sectorTags }: Portfolio =
    req.body;
  // Assert the request format was valid
  assertExists(portfolioId, 'Invalid ID provided');
  assertValidRiskComposition(riskPercentage1, riskPercentage2, false);
  if (sectorTags && Array.isArray(sectorTags)) {
    for (const tag of sectorTags) {
      assertEnum(Sectors, tag, 'Invalid sector tag provided');
    }
  }
  // Update the Portfolio in the DB using the request parameters/data
  const updatedPortfolio: Portfolio = {
    id: portfolioId,
    name,
    riskPercentage1,
    riskPercentage2,
    sectorTags,
  };

  const response = await PortfolioModel.updatePortfolio(updatedPortfolio);

  if (!response) {
    // we throw an API error since this means something errored out with our server end
    throw new ApiError(
      'Unable to update this portfolio',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }
  // send the portfolio back after model runs logic
  res.status(StatusCode.OK).send({ portfolio: response });
};

/**
 * Deletes portfolio from the database.
 * @param req Request with an `id` field
 * @param res Deleted portfolio information
 */
const deletePortfolio = async (
  req: Request<Identifiable>,
  res: Response<PortfolioResponse>
) => {
  const { id: portfolioId } = req.params;
  // Assert the request format was valid
  assertExists(portfolioId, 'Invalid ID provided');
  // Delete the portfolio from the DB
  const response = await PortfolioModel.deletePortfolio(portfolioId);

  if (!response) {
    // we throw an API error since this means something errored out with our server end
    throw new ApiError(
      'Unable to delete this portfolio',
      StatusCode.INTERNAL_ERROR,
      Severity.LOW
    );
  }
  // send the portfolio back after model runs logic
  res.status(StatusCode.OK).send({ portfolio: response });
};

export default module.exports = {
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
};
