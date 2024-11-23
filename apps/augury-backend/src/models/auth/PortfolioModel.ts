import PortfolioSchema from '../../config/schemas/PortfolioSchema';
import ApiError from '../../errors/ApiError';
import StatusCode from '../../config/enums/StatusCode';
import Severity from '../../config/enums/Severity';
import Portfolio from '../../config/interfaces/Portfolio';
import DocumentId from '../../config/interfaces/DocumentId';
import SchemaErrorHandler from '../../middlewares/SchemaErrorHandler';

/**
 * Retrieves a portfolio by id
 * @param portfolioId Mongoose document id of the portfolio
 * @returns a `Porfolio` document
 * @throws `ApiError` if the portfolio could not be retrieved
 */
const getPortfolio = async (portfolioId: DocumentId) => {
  const portfolio = await SchemaErrorHandler(
    PortfolioSchema.findById(portfolioId)
  );

  if (!portfolio) {
    throw new ApiError(
      'Unable to find portfolio',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return portfolio;
};

/**
 * Creates a portfolio based on the passed data
 * @param data `Portfolio` object
 * @returns new `Portfolio` document
 * @throws `ApiError` if the portfolio could not be created
 */
const createPortfolio = async (data: Portfolio) => {
  const portfolio = await SchemaErrorHandler(PortfolioSchema.create(data));
  if (!portfolio) {
    throw new ApiError(
      'Portfolio could not be created.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return portfolio;
};

/**
 * Updates a portfolio based on the passed data.
 * @param data Updated `Portfolio` object
 * @returns updated `Portfolio` document
 * @throws `ApiError` if the portfolio does not exist or could not be updated
 */
const updatePortfolio = async (data: Partial<Portfolio>) => {
  const { id, ...updateData }: Partial<Portfolio> = data;

  const updatedPortfolio = await SchemaErrorHandler(
    PortfolioSchema.findByIdAndUpdate(id, updateData, { new: true })
  );

  if (!updatedPortfolio) {
    throw new ApiError(
      'Portfolio could not be updated.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return updatedPortfolio;
};

/**
 * Deletes a portfolio from the database
 * @param portfolioId Mongoose document id of the portfolio
 * @returns Removed portfolio data
 * @throws `ApiError` if portfolio could not be deleted
 */
const deletePortfolio = async (portfolioId: DocumentId) => {
  const portfolio = await SchemaErrorHandler(
    PortfolioSchema.findByIdAndDelete(portfolioId)
  );

  if (!portfolio) {
    throw new ApiError(
      'Unable to delete portfolio.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return portfolio;
};

export default module.exports = {
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
};
