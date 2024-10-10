import { Types } from 'mongoose';
import PortfolioDefaultSchema from '../../config/schemas/PortfolioDefaultSchema';
import ApiError from '../../errors/ApiError';
import StatusCode from '../../config/enums/StatusCode';
import Severity from '../../config/enums/Severity';
import PortfolioDefault from '../../config/interfaces/PortfolioDefault';

/**
 * Retrieves the portfolio defaults for the provided `userId`
 * @param userId Mongoose document id of the user
 * @returns a `PorfolioDefault` document
 * @throws `ApiError` if defaults could not be retrieved
 */
const getPortfolioDefaults = async (userId: string | Types.ObjectId) => {
  const defaults = await PortfolioDefaultSchema.findOne({ userId });

  if (!defaults) {
    throw new ApiError(
      'Unable to find defaults for user.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return defaults;
};

/**
 * Creates portfolio defaults for a user based on the passed data
 * @param data `PortfolioDefault` object containing a `userId` field
 * @returns new `PortfolioDefault` document
 * @throws `ApiError` if defaults could not be created
 */
const createPortfolioDefaults = async (data: PortfolioDefault) => {
  const defaults = await PortfolioDefaultSchema.create(data);

  if (!defaults) {
    throw new ApiError(
      'Portfolio defaults could not be created.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return defaults;
};

/**
 * Updates a users' portfolio defaults based on the passed data.
 * @param data Updated `PortfolioDefault` object containing a `userId` field
 * @returns updated `PortfolioDefault` document
 * @throws `ApiError` if defaults do not exist or could not be updated
 */
const updatePortfolioDefaults = async (data: Partial<PortfolioDefault>) => {
  const { userId, ...updateData }: Partial<PortfolioDefault> = data;
  const defaults = await PortfolioDefaultSchema.findOne({ userId });

  if (!defaults) {
    throw new ApiError(
      'Defaults do not exist for this user.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  // Spread/overwrite the default data with the updated data
  Object.assign(defaults, updateData);

  const updatedDefaults = await defaults.save();

  if (!updatedDefaults) {
    throw new ApiError(
      'Defaults could not be updated.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return updatedDefaults;
};

export default module.exports = {
  getPortfolioDefaults,
  createPortfolioDefaults,
  updatePortfolioDefaults,
};
