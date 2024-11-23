import Severity from '../../config/enums/Severity';
import StatusCode from '../../config/enums/StatusCode';
import Session from '../../config/interfaces/Session';
import SessionSchema from '../../config/schemas/SessionSchema';
import ApiError from '../../errors/ApiError';
import DocumentId from '../../config/interfaces/DocumentId';
import SchemaErrorHandler from '../../middlewares/SchemaErrorHandler';

/**
 * Retrieves a `Session` based on the passed `userId`
 * @param userId Mongoose document id
 * @returns `Session` document
 * @throws ApiError if the session does not exist
 */
const getSessionByUserId = async (userId: DocumentId) => {
  const session = await SchemaErrorHandler(SessionSchema.findOne({ userId }));

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
  const session = await SchemaErrorHandler(
    SessionSchema.findOne({ token: token })
  );

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
  const session = await SchemaErrorHandler(SessionSchema.create(data));

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
  const session = await SchemaErrorHandler(SessionSchema.findOne({ userId }));

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

/**
 * Deletes a Session from the database by token
 * @param token Decoded access token
 * @returns Deleted session data
 * @throws `ApiError` if unable to delete the session
 */
const deleteSessionByToken = async (token: string) => {
  const session = await SchemaErrorHandler(
    SessionSchema.findOneAndDelete({ token })
  );
  if (!session) {
    throw new ApiError(
      'Could not delete session!',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }
  return session;
};

export default module.exports = {
  getSessionByUserId,
  getSessionByToken,
  createSession,
  updateSession,
  deleteSessionByToken,
};
