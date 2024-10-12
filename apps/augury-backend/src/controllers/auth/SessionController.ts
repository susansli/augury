import mongoose, { Types } from 'mongoose';
import { AxiosError } from 'axios';
import jwt from '../../config/utils/jwt';
import SessionModel from '../../models/auth/SessionModel';
import Session from '../../config/interfaces/Session';
import StatusCode from '../../config/enums/StatusCode';
import Severity from '../../config/enums/Severity';
import ApiError from '../../errors/ApiError';

async function getSession(id: Types.ObjectId | string, token: string) {
  const _id = new mongoose.Types.ObjectId(id);
  const session: Session = {
    userId: _id,
    token: token,
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
  getSession,
  getSessionByToken,
};
