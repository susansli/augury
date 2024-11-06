import mongoose from 'mongoose';
import Severity from '../../config/enums/Severity';
import StatusCode from '../../config/enums/StatusCode';
import Session from '../../config/interfaces/Session';
import SessionSchema from '../../config/schemas/SessionSchema';
import ApiError from '../../errors/ApiError';
import DocumentId from '../../config/interfaces/DocumentId';

/**
 * Retrieves a `Session` based on the passed `userId`
 * @param userId Mongoose document id
 * @returns `Session` document
 * @throws ApiError if the session does not exist
 */
const getSessionByUserId = async (userId: DocumentId) => {
  const id = new mongoose.Types.ObjectId(userId);
  const session = await SessionSchema.findOne({ userId: id });

  if (!session) {
    throw new ApiError(
      'This session does not exist.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return session;
};

/**
 * Retrieves a `Session` based on the passed decrypted `token`
 * @param token Decrypted JWT token string
 * @returns `Session` document
 * @throws ApiError if the session does not exist
 */
const getSessionByToken = async (token: string) => {
  const session = await SessionSchema.findOne({ token: token });

  if (!session) {
    throw new ApiError(
      'This session does not exist.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return session;
};

/**
 * Creates a new `Session` based on the passed data
 * @param data `Session` object
 * @returns new `Session` document
 * @throws ApiError if session could not be created
 */
const createSession = async (data: Session) => {
  const session = await SessionSchema.create(data);

  if (!session) {
    throw new ApiError(
      'This session could not be created.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return session;
};

/**
 * Updates a `Session` based on the passed data
 * @param data Updated `Session` object with `UserId`
 * @returns updated `Session` document
 * @throws ApiError if session does not exist or could not be updated
 */
const updateSession = async (data: Session) => {
  const { userId, token }: Session = data;
  const session = await SessionSchema.findOne({ userId: userId });

  if (!session) {
    throw new ApiError(
      'This session does not exist.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  session.token = token || session.token;

  const updatedSession = await session.save();

  if (!updatedSession) {
    throw new ApiError(
      'This session could not be updated.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return updatedSession;
};

export default module.exports = {
  getSessionByUserId,
  getSessionByToken,
  createSession,
  updateSession,
};
