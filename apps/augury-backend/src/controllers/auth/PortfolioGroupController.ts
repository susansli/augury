import { Request, Response } from 'express';
import { assertEnum, assertExists } from '../../config/utils/validation';
import ApiError from '../../errors/ApiError';
import StatusCode from '../../config/enums/StatusCode';
import Severity from '../../config/enums/Severity';
import PortfolioGroupModel from '../../models/auth/PortfolioGroupModel';
import PortfolioColor from '../../config/enums/PortfolioColor';
import PortfolioGroup, {
  PortfolioGroupRequestBody,
  PortfolioGroupResponse,
  PortfolioGroupsResponse,
} from '../../config/interfaces/PortfolioGroup';
import Identifiable from '../../config/interfaces/Identifiable';

/**
 * Creates a new portfolio group based on the passed request body
 * @param req Request with `PortfolioGroup` fields
 * @param res Response with new portfolio group & portfolio ids
 * @throws `ClientError` if request is invalid
 * @throws `ApiError` if unable to create group
 */
const createPortfolioGroup = async (
  req: Request<unknown, unknown, PortfolioGroupRequestBody>,
  res: Response<PortfolioGroupResponse>
) => {
  const { userId, name, color, portfolios }: PortfolioGroupRequestBody =
    req.body;
  // Assert the request format was valid
  assertExists(userId, 'Invalid userId provided');
  assertExists(name, 'Invalid name provided');
  assertEnum(PortfolioColor, color, 'Invalid color provided');
  // Create a porfolio group in the DB using the request parameters/data
  const newGroup: PortfolioGroup = {
    userId,
    name,
    color,
  };
  const { group, portfolios: addedPortfolios } =
    await PortfolioGroupModel.createPortfolioGroup(newGroup, portfolios);
  // Throw error if somehow we errored on the server-side
  if (!group) {
    throw new ApiError(
      'Unable to create portfolio group',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  res.status(StatusCode.OK).send({ group, portfolios: addedPortfolios });
};

/**
 * Updates a portfolio group's details.
 * @param req Request with PortfolioGroup fields
 * @param res Updated portfolio group's information & portfolio ids
 * @throws `ClientError` if request is invalid
 * @throws `ApiError` if unable to update group
 */
const updatePortfolioGroup = async (
  req: Request<unknown, unknown, PortfolioGroup>,
  res: Response<PortfolioGroupResponse>
): Promise<void> => {
  const { id, ...updatedData } = req.body;
  if (updatedData.userId) {
    delete updatedData.userId; // Do NOT update user ID
  }
  // Assert the request format was valid
  assertExists(id, 'Invalid ID provided');
  if (updatedData.color) {
    assertEnum(PortfolioColor, updatedData.color, 'Invalid color provided');
  }
  // Update the group in the DB
  const { group, portfolios } = await PortfolioGroupModel.updatePortfolioGroup(
    id,
    updatedData
  );
  // Throw error if somehow we errored on the server-side
  if (!group) {
    throw new ApiError(
      'Unable to update portfolio group',
      StatusCode.INTERNAL_ERROR,
      Severity.LOW
    );
  }
  // Return response data
  res.status(StatusCode.OK).send({ group, portfolios });
};

/**
 * Deletes a portfolio group and it's relations from the database.
 * @param req Request with an `id` field
 * @param res OK Status Code if successful
 * @throws `ClientError` if request is invalid
 * @throws `ApiError` if unable to delete group
 */
const deletePortfolioGroup = async (
  req: Request<unknown, unknown, Identifiable>,
  res: Response
): Promise<void> => {
  const { id: userId } = req.body;
  // Assert the request format was valid
  assertExists(userId, 'Invalid ID provided');
  // Delete the group + relations from the DB
  try {
    await PortfolioGroupModel.deletePortfolioGroup(userId);
  } catch (err: unknown) {
    // Throw error if somehow we errored on the server-side
    throw new ApiError(
      'Unable to delete portfolio group',
      StatusCode.INTERNAL_ERROR,
      Severity.LOW
    );
  }
  // Return response
  res.sendStatus(StatusCode.OK);
};

/**
 * Retrieves a Portfolio group by id. Uses URLParams.
 * @param req Request with id URL parameter
 * @param res Response with group data
 * @throws `ClientError` if request is invalid
 * @throws `ApiError` if unable to retrieve group
 */
const getPortfolioGroup = async (
  req: Request<Identifiable>,
  res: Response<PortfolioGroupResponse>
): Promise<void> => {
  const { id } = req.params;
  // Assert the request format was valid
  assertExists(id, 'Invalid ID provided');
  // Retrieve data
  const { group, portfolios } = await PortfolioGroupModel.getPortfolioGroup(id);
  // Throw error if somehow we errored on the server-side
  if (!group) {
    throw new ApiError(
      'Unable to retrieve portfolio group',
      StatusCode.INTERNAL_ERROR,
      Severity.LOW
    );
  }
  // Return response data
  res.status(StatusCode.OK).send({ group, portfolios });
};

/**
 * Adds portfolios (and their relations) to a group
 * @param req with Portfolio ID's in request body
 * @param res with Group
 * @throws `ClientError` if request is invalid
 * @throws `ApiError` if unable to add to group
 */
const addPortfoliosToGroup = async (
  req: Request<Identifiable, unknown, PortfolioGroupRequestBody>,
  res: Response<PortfolioGroupResponse>
) => {
  const { id } = req.params;
  const { portfolios } = req.body;
  // Assert the request format was valid
  assertExists(id, 'Invalid Id provided');
  assertExists(portfolios, 'Invalid Portfolios array provided'); // Basic validation
  // Add portfolios
  const { group, portfolios: addedPortfolios } =
    await PortfolioGroupModel.addPortfoliosToGroup(id, portfolios);
  // Throw error if somehow we errored on the server-side
  if (!group || !addedPortfolios) {
    throw new ApiError(
      'Unable to add portfolios to group',
      StatusCode.INTERNAL_ERROR,
      Severity.LOW
    );
  }
  // Return response data
  res.status(StatusCode.OK).send({ group, portfolios: addedPortfolios });
};

/**
 * Removes portfolios (and their relations) from a group
 * @param req with Portfolio ID's in request body
 * @param res with Group
 * @throws `ClientError` if request is invalid
 * @throws `ApiError` if unable to remove group
 */
const removePortfoliosFromGroup = async (
  req: Request<Identifiable, unknown, PortfolioGroupRequestBody>,
  res: Response<PortfolioGroupResponse>
) => {
  const { id } = req.params;
  const { portfolios } = req.body;
  // Assert the request format was valid
  assertExists(id, 'Invalid Id provided');
  assertExists(portfolios, 'Invalid Portfolios array provided'); // Basic validation
  // Remove portfolios from group
  const { group, portfolios: _portfolios } =
    await PortfolioGroupModel.removePortfoliosFromGroup(id, portfolios);
  // Throw error if somehow we errored on the server-side
  if (!group) {
    throw new ApiError(
      'Unable to remove portfolios from group',
      StatusCode.INTERNAL_ERROR,
      Severity.LOW
    );
  }
  // Return response data
  res.status(StatusCode.OK).send({ group, portfolios: _portfolios });
};

/**
 * Retrieves all PortfolioGroups for a specific user.
 * @param req with User `id` URL Parameter
 * @param res with `PortfolioGroup` data
 * @throws `ClientError` if request is invalid
 * @throws `ApiError` if unable to retrieve group
 */
const getPortfolioGroupsByUserId = async (
  req: Request<Identifiable>,
  res: Response<PortfolioGroupsResponse>
) => {
  const { id: userId } = req.params;
  // Assert the request format was valid
  assertExists(userId, 'Invalid Id provided');
  // Remove portfolios from group
  const response = await PortfolioGroupModel.getPortfolioGroupsByUserId(userId);
  // Throw error if somehow we errored on the server-side
  if (!response) {
    throw new ApiError(
      'Unable to remove portfolios from group',
      StatusCode.INTERNAL_ERROR,
      Severity.LOW
    );
  }
  // Return response data
  res.status(StatusCode.OK).send({ groups: response });
};

export default module.exports = {
  createPortfolioGroup,
  updatePortfolioGroup,
  deletePortfolioGroup,
  getPortfolioGroup,
  addPortfoliosToGroup,
  removePortfoliosFromGroup,
  getPortfolioGroupsByUserId,
};
