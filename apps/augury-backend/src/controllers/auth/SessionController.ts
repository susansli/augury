import mongoose from 'mongoose';
import { AxiosError } from 'axios';
import { Request, Response } from 'express';
import jwt from '../../config/utils/jwt';
import SessionModel from '../../models/auth/SessionModel';
import Session from '../../config/interfaces/Session';
import StatusCode from '../../config/enums/StatusCode';
import Severity from '../../config/enums/Severity';
import ApiError from '../../errors/ApiError';
import DocumentId from '../../config/interfaces/DocumentId';
import { assertExists } from '../../config/utils/validation';

function getSessionTokenFromJWT(accessToken: string) {
  // Verify and decode the JWT
  const verificationResult = jwt.verifyJwt(accessToken);
  if (
    typeof verificationResult.decoded === 'string' ||
    !verificationResult?.decoded?.session
  ) {
    throw new Error();
  }
  return verificationResult.decoded.session;
}

/**
 * Creates or updates the User's current session based on the passed `userId`
 * and Google auth token.
 * @param userId Mongoose document id
 * @param googleToken Google session authentication token
 * @returns `Session` document
 * @throws `Error` if Axios request fails or an unknown error occurs
 */
async function getCurrentSession(userId: DocumentId, googleToken: string) {
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
 * @throws `ApiError` if session is invalid
 */
async function getSessionByToken(accessToken: string) {
  try {
    const token = getSessionTokenFromJWT(accessToken);
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

/**
 * Request handler that logs the current user out based on their accessToken cookie.
 * @param req Request with accessToken cookie
 * @param res Response object
 * @throws `ApiError` if no session was deleted/other error
 */
async function endSession(req: Request, res: Response) {
  const accessToken = req.cookies?.accessToken;
  assertExists(accessToken, 'Request must contain access token');
  const token = getSessionTokenFromJWT(accessToken);
  // Delete session from database
  const response = await SessionModel.deleteSessionByToken(token);

  if (response) {
    res.status(StatusCode.OK).send();
  } else {
    // we throw an API error since this means something errored out with our server end
    throw new ApiError(
      'Could not end this users session',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }
}

export default module.exports = {
  getCurrentSession,
  getSessionByToken,
  endSession,
};
