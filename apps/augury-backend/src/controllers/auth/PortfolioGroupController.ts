import { Request, Response } from 'express';
import { assertEnum, assertExists } from '../../config/utils/validation';
import ApiError from '../../errors/ApiError';
import StatusCode from '../../config/enums/StatusCode';
import Severity from '../../config/enums/Severity';
import PortfolioGroupModel from '../../models/auth/PortfolioGroupModel';
import PortfolioColor from '../../config/enums/PortfolioColor';
import PortfolioGroup from '../../config/interfaces/PortfolioGroup';
import Identifiable from '../../config/interfaces/Identifiable';
import DocumentId from '../../config/interfaces/DocumentId';

type PortfolioGroupRequestBody = PortfolioGroup & {
  portfolios?: DocumentId[];
};

/**
 * Creates a new portfolio group based on the passed request body
 * @param req Request with `PortfolioGroup` fields
 * @param res Response with new portfolio group
 * @throws `ClientError` if request is invalid
 * @throws `ApiError` if unable to create group
 */
const createPortfolioGroup = async (
  req: Request<unknown, unknown, PortfolioGroupRequestBody>,
  res: Response
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
  const groupResponse = await PortfolioGroupModel.createPortfolioGroup(
    newGroup
  );
  // Throw error if somehow we errored on the server-side
  if (!groupResponse) {
    throw new ApiError(
      'Unable to create portfolio group',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }
  // Create relations for each portfolio
  const groupId = groupResponse.id;
  const addPortfoliosResponse = await PortfolioGroupModel.addPortfoliosToGroup(
    groupId,
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
  // Return response data
  res.status(StatusCode.OK).send({ group: groupResponse });
};

/**
 * Deletes a portfolio group and it's relations from the database.
 * @param req Request with an `id` field
 * @param res Deleted portfolio group's information
 */
const deletePortfolioGroup = async (
  req: Request<unknown, unknown, Identifiable>,
  res: Response
): Promise<void> => {
  const { id: userId } = req.body;
  // Assert the request format was valid
  assertExists(userId, 'Invalid ID provided');
  // Delete the group + relations from the DB
  const response = await PortfolioGroupModel.deletePortfolioGroup(userId);
  // Throw error if somehow we errored on the server-side
  if (!response) {
    throw new ApiError(
      'Unable to delete portfolio group',
      StatusCode.INTERNAL_ERROR,
      Severity.LOW
    );
  }
  // Return response data
  res.status(StatusCode.OK).send({ group: response });
};

/**
 * Retrieves a Portfolio group by id. Uses URLParams.
 * @param req Request with id URL parameter
 * @param res Response with group data
 * @throws `ApiError` if unable to retrieve group
 */
const getPortfolioGroup = async (
  req: Request<Identifiable>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  // Assert the request format was valid
  assertExists(id, 'Invalid ID provided');
  // Retrieve data
  const response = await PortfolioGroupModel.getPortfolioGroup(id);
  // Throw error if somehow we errored on the server-side
  if (!response) {
    throw new ApiError(
      'Unable to retrieve portfolio group',
      StatusCode.INTERNAL_ERROR,
      Severity.LOW
    );
  }
  // Return response data
  res.status(StatusCode.OK).send({ group: response });
};

const addPortfoliosToGroup = async (
  req: Request<Identifiable, unknown, PortfolioGroupRequestBody>,
  res: Response
) => {
  const { id } = req.params;
  const { portfolios } = req.body;
  // Assert the request format was valid
  assertExists(id, 'Invalid Id provided');
  assertExists(portfolios, 'Invalid Portfolios array provided'); // Basic validation
  // Add portfolios
  const response = await PortfolioGroupModel.addPortfoliosToGroup(
    id,
    portfolios
  );
  // Throw error if somehow we errored on the server-side
  if (!response) {
    throw new ApiError(
      'Unable to add portfolios to group',
      StatusCode.INTERNAL_ERROR,
      Severity.LOW
    );
  }
  // Return response data
  res.status(StatusCode.OK).send({ group: response });
};

const removePortfoliosFromGroup = async (
  req: Request<Identifiable, unknown, PortfolioGroupRequestBody>,
  res: Response
) => {
  const { id } = req.params;
  const { portfolios } = req.body;
  // Assert the request format was valid
  assertExists(id, 'Invalid Id provided');
  assertExists(portfolios, 'Invalid Portfolios array provided'); // Basic validation
  // Remove portfolios from group
  const response = await PortfolioGroupModel.removePortfoliosFromGroup(
    id,
    portfolios
  );
  // Throw error if somehow we errored on the server-side
  if (!response) {
    throw new ApiError(
      'Unable to remove portfolios from group',
      StatusCode.INTERNAL_ERROR,
      Severity.LOW
    );
  }
  // Return response data
  res.status(StatusCode.OK).send({ removed: response });
};

export default module.exports = {
  createPortfolioGroup,
  deletePortfolioGroup,
  getPortfolioGroup,
  addPortfoliosToGroup,
  removePortfoliosFromGroup,
};
