import ApiError from '../../errors/ApiError';
import StatusCode from '../../config/enums/StatusCode';
import Severity from '../../config/enums/Severity';
import PortfolioGroupSchema from '../../config/schemas/PortfolioGroupSchema';
import PortfolioGroup from '../../config/interfaces/PortfolioGroup';
import PortfolioGroupRelationSchema from '../../config/schemas/PortfolioGroupRelationSchema';
import PortfolioGroupRelation from '../../config/interfaces/PortfolioGroupRelation';
import DocumentId from '../../config/interfaces/DocumentId';
import SchemaErrorHandler from '../../middlewares/SchemaErrorHandler';

/**
 * Retrieves a portfolio group by id
 * @param id Portfolio Group ID
 * @returns `PorfolioGroup` document & portfolio ids
 * @throws `ApiError` if group could not be retrieved
 */
const getPortfolioGroup = async (id: DocumentId) => {
  const group = await SchemaErrorHandler(PortfolioGroupSchema.findById(id));
  if (!group) {
    throw new ApiError(
      'Unable to find group.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }
  const relations = await SchemaErrorHandler(
    PortfolioGroupRelationSchema.find({ portfolioGroupId: group.id })
  );
  if (relations == undefined || relations == null) {
    throw new ApiError(
      'Unable to retrieve group relations',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }
  const portfolios = relations.map((relation: PortfolioGroupRelation) => {
    return relation.portfolioId;
  });
  return { group, portfolios };
};

/**
 * Creates a portfolio group based on the passed data
 * @param groupData `PortfolioGroup` object
 * @returns new `PortfolioGroup` document & portfolio ids
 * @throws `ApiError` if group could not be created
 */
const createPortfolioGroup = async (
  groupData: PortfolioGroup,
  portfolios: DocumentId[]
) => {
  const group = await SchemaErrorHandler(
    PortfolioGroupSchema.create(groupData)
  );

  if (!group) {
    throw new ApiError(
      'Portfolio group could not be created.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  if (Array.isArray(portfolios) && portfolios.length > 0) {
    const addPortfoliosResponse = await addPortfoliosToGroup(
      group.id,
      portfolios
    );

    // Throw error if somehow we errored on the server-side
    if (!addPortfoliosResponse) {
      throw new ApiError(
        'Unable to add portfolios to group',
        StatusCode.INTERNAL_ERROR,
        Severity.MED
      );
    }

    return addPortfoliosResponse;
  }

  return { group, portfolios: [] };
};

/**
 * Deletes a portfolio group from the database and it's relations
 * @param id Portfolio Group ID
 * @throws `ApiError` if group could not be deleted
 */
const deletePortfolioGroup = async (id: DocumentId) => {
  const group = await SchemaErrorHandler(
    PortfolioGroupSchema.findByIdAndDelete(id)
  );

  // Also remove associated relations
  await SchemaErrorHandler(
    PortfolioGroupRelationSchema.deleteMany({
      portfolioGroupId: id,
    })
  );

  if (!group) {
    throw new ApiError(
      'Unable to delete group.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }
};

/**
 * Updates a Portfolio group based on the passed data.
 * @param id Portfolio Group ID
 * @param data Updated `PortfolioGroup` details
 * @returns updated `PortfolioGroup` document & portfolio ids
 * @throws `ApiError` if groups do not exist or could not be updated
 */
const updatePortfolioGroup = async (
  id: DocumentId,
  data: Partial<PortfolioGroup>
) => {
  const updatedGroup = await SchemaErrorHandler(
    PortfolioGroupSchema.findByIdAndUpdate(id, data, {
      new: true,
    })
  );

  if (!updatedGroup) {
    throw new ApiError(
      'Group could not be updated.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return await getPortfolioGroup(updatedGroup.id);
};

/**
 * Adds group relations for the provided portfolios
 * @param groupId Portfolio Group ID
 * @param portfolioIds IDs of the portfolios to add to the group
 * @returns Updated PortfolioGroup & portfolio ids
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
  const relationDocs = await SchemaErrorHandler(
    PortfolioGroupRelationSchema.create(relations)
  );

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
 * @returns Updated PortfolioGroup & portfolio ids
 */
const removePortfoliosFromGroup = async (
  groupId: DocumentId,
  portfolioIds: DocumentId[]
) => {
  const relationDocs = await SchemaErrorHandler(
    PortfolioGroupRelationSchema.deleteMany({
      portfolioGroupId: groupId,
      portfolioId: { $in: portfolioIds },
    })
  );

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
  const groups = await SchemaErrorHandler(
    PortfolioGroupSchema.find({ userId })
  );

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
