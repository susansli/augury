import mongoose, { Types } from 'mongoose';
import { AxiosError } from 'axios';
import jwt from '../../config/utils/jwt';
import SessionModel from '../../models/auth/SessionModel';
import Session from '../../config/interfaces/Session';
import StatusCode from '../../config/enums/StatusCode';
import Severity from '../../config/enums/Severity';
import ApiError from '../../errors/ApiError';

/**
 * Creates or updates the User's current session based on the passed `userId`
 * and Google auth token.
 * @param userId Mongoose document id
 * @param googleToken Google session authentication token
 * @returns `Session` document
 * @throws `Error` if Axios request fails or an unknown error occurs
 */
async function getCurrentSession(
  userId: Types.ObjectId | string,
  googleToken: string
) {
  const id = new mongoose.Types.ObjectId(userId);
  const session: Session = {
    userId: id,
    token: googleToken,
  };
  try {
    const response = await SessionModel.updateSession(session);
    return response;
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      const response = await SessionModel.createSession(session);
      return response;
    } else if (error instanceof AxiosError) {
      throw new Error(error.message);
    } else {
      throw new Error(`Unknown error occurred! ${JSON.stringify(error)}`);
    }
  }
}

/**
 * Retrieves a `Session` by the provided access token
 * @param accessToken encoded JWT token
 * @returns `Session` document
 */
async function getSessionByToken(accessToken: string) {
  try {
    // Verify and decode the JWT
    const verificationResult = jwt.verifyJwt(accessToken);
    if (
      typeof verificationResult.decoded === 'string' ||
      !verificationResult?.decoded?.session
    ) {
      throw new Error();
    }
    const token = verificationResult.decoded.session;
    const session = await SessionModel.getSessionByToken(token);
    if (!session) {
      throw new Error(); // Invalid Session
    }
    return session;
  } catch (error: unknown) {
    throw new ApiError(
      'Invalid session token or incorrect token structure.',
      StatusCode.FORBIDDEN,
      Severity.MED
    );
  }
}

export default module.exports = {
  getCurrentSession,
  getSessionByToken,
};
