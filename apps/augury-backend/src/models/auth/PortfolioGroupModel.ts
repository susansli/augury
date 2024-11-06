import ApiError from '../../errors/ApiError';
import StatusCode from '../../config/enums/StatusCode';
import Severity from '../../config/enums/Severity';
import PortfolioGroupSchema from '../../config/schemas/PortfolioGroupSchema';
import PortfolioGroup from '../../config/interfaces/PortfolioGroup';
import PortfolioGroupRelationSchema from '../../config/schemas/PortfolioGroupRelationSchema';
import PortfolioGroupRelation from '../../config/interfaces/PortfolioGroupRelation';
import DocumentId from '../../config/interfaces/DocumentId';

/**
 * Retrieves a portfolio group by id
 * @param id Portfolio Group ID
 * @returns `PorfolioGroup` document
 * @throws `ApiError` if group could not be retrieved
 */
const getPortfolioGroup = async (id: DocumentId) => {
  const group = await PortfolioGroupSchema.findById(id);

  if (!group) {
    throw new ApiError(
      'Unable to find group.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return group;
};

/**
 * Creates a portfolio group based on the passed data
 * @param groupData `PortfolioGroup` object
 * @returns new `PortfolioGroup` document
 * @throws `ApiError` if group could not be created
 */
const createPortfolioGroup = async (groupData: PortfolioGroup) => {
  const group = await PortfolioGroupSchema.create(groupData);

  if (!group) {
    throw new ApiError(
      'Portfolio group could not be created.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return group;
};

/**
 * Deletes a portfolio group from the database and it's relations
 * @param id Portfolio Group ID
 * @returns Removed group data
 * @throws `ApiError` if group could not be deleted
 */
const deletePortfolioGroup = async (id: DocumentId) => {
  const group = await PortfolioGroupSchema.findByIdAndDelete(id);

  // Also remove associated relations
  await PortfolioGroupRelationSchema.deleteMany({
    portfolioGroupId: id,
  });

  if (!group) {
    throw new ApiError(
      'Unable to delete group.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return group;
};

/**
 * Updates a Portfolio group based on the passed data.
 * @param id Portfolio Group ID
 * @param data Updated `PortfolioGroup` details
 * @returns updated `PortfolioGroup` document
 * @throws `ApiError` if groups do not exist or could not be updated
 */
const updatePortfolioGroup = async (
  id: DocumentId,
  data: Partial<PortfolioGroup>
) => {
  const updatedGroup = await PortfolioGroupSchema.findOneAndUpdate(
    { id },
    data,
    { new: true }
  );

  if (!updatedGroup) {
    throw new ApiError(
      'Group could not be updated.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return updatedGroup;
};

/**
 * Adds group relations for the provided portfolios
 * @param groupId Portfolio Group ID
 * @param portfolioIds IDs of the portfolios to add to the group
 * @returns Updated PortfolioGroup
 */
const addPortfoliosToGroup = async (
  groupId: DocumentId,
  portfolioIds: DocumentId[]
) => {
  const portfolioIdToGroupRelation = (
    id: DocumentId
  ): PortfolioGroupRelation => ({
    portfolioId: id,
    portfolioGroupId: groupId,
  });
  const relations = portfolioIds.map(portfolioIdToGroupRelation);
  const relationDocs = await PortfolioGroupRelationSchema.create(relations);

  if (!relationDocs) {
    throw new ApiError(
      'Portfolios could not be added to group.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return await getPortfolioGroup(groupId);
};

/**
 * Removes group relations for the provided portfolios
 * @param groupId Portfolio Group ID
 * @param portfolioIds IDs of the portfolios to remove from the group
 * @returns Updated PortfolioGroup
 */
const removePortfoliosFromGroup = async (
  groupId: DocumentId,
  portfolioIds: DocumentId[]
) => {
  const relationDocs = await PortfolioGroupRelationSchema.deleteMany({
    portfolioGroupId: groupId,
    portfolioId: { $in: portfolioIds },
  });

  if (!relationDocs) {
    throw new ApiError(
      'Portfolios could not be removed from group.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return await getPortfolioGroup(groupId);
};

/**
 * Retrieves all `PortfolioGroup`s for a specific user.
 * @param userId User's document ID
 * @returns Array of `PortfolioGroup`s
 */
const getPortfolioGroupsByUserId = async (userId: DocumentId) => {
  const groups = await PortfolioGroupSchema.find({ userId });

  if (!groups) {
    throw new ApiError(
      'Unable to find Portfolio groups for this user',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return groups;
};

export default module.exports = {
  createPortfolioGroup,
  deletePortfolioGroup,
  updatePortfolioGroup,
  getPortfolioGroup,
  addPortfoliosToGroup,
  removePortfoliosFromGroup,
  getPortfolioGroupsByUserId,
};
