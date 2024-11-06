import PortfolioDefaultSchema from '../../config/schemas/PortfolioDefaultSchema';
import ApiError from '../../errors/ApiError';
import StatusCode from '../../config/enums/StatusCode';
import Severity from '../../config/enums/Severity';
import PortfolioDefault from '../../config/interfaces/PortfolioDefault';
import DocumentId from '../../config/interfaces/DocumentId';

/**
 * Retrieves the portfolio defaults for the provided `userId`
 * @param userId Mongoose document id of the user
 * @returns a `PorfolioDefault` document
 * @throws `ApiError` if defaults could not be retrieved
 */
const getPortfolioDefaults = async (userId: DocumentId) => {
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
  const updatedDefaults = await PortfolioDefaultSchema.findOneAndUpdate(
    { userId },
    updateData,
    { new: true }
  );

  if (!updatedDefaults) {
    throw new ApiError(
      'Defaults could not be updated.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return updatedDefaults;
};

/**
 * Deletes portfolio defaults from the database
 * @param userId Mongoose document id of the user
 * @returns Removed user defaults data
 * @throws `ApiError` if defaults could not be deleted
 */
const deletePortfolioDefaults = async (userId: DocumentId) => {
  const defaults = await PortfolioDefaultSchema.findOneAndDelete({
    userId,
  });

  if (!defaults) {
    throw new ApiError(
      'Unable to delete defaults for user.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return defaults;
};

/**
 * Returns if a user has portfolio defaults in the database
 * @param userId Mongoose document id of the user
 * @returns True if defaults exist, false otherwise.
 */
const userHasDefaults = async (userId: DocumentId) => {
  const defaults = await PortfolioDefaultSchema.findOne({ userId });
  return defaults != null;
};

/**
 * Simple helper function to create or update if a user does not already have
 * portfolio defaults set.
 * @param userId Mongoose document id of the user
 * @param defaults New defaults to set
 * @returns
 */
const handlePortfolioDefaults = async (defaults: PortfolioDefault) => {
  if (await userHasDefaults(defaults?.userId)) {
    return updatePortfolioDefaults(defaults);
  } else {
    return createPortfolioDefaults(defaults);
  }
};

export default module.exports = {
  getPortfolioDefaults,
  createPortfolioDefaults,
  updatePortfolioDefaults,
  deletePortfolioDefaults,
  handlePortfolioDefaults,
  userHasDefaults,
};
