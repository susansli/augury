import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../config/utils/jwt';
import ApiError from '../errors/ApiError';
import ClientError from '../errors/ClientError';
import StatusCode from '../config/enums/StatusCode';
import Severity from '../config/enums/Severity';
import Session from '../config/interfaces/Session';
import SessionModel from '../models/auth/SessionModel';

export async function verifyAccessToken(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const accessToken = req?.cookies?.accessToken;
  if (!accessToken) {
    throw new ClientError('No access token found.', StatusCode.UNAUTHORIZED);
  }

  try {
    // Verify and decode the JWT
    const verificationResult = verifyJwt(accessToken);
    if (
      typeof verificationResult.decoded === 'string' ||
      !verificationResult?.decoded?.session
    ) {
      throw new Error();
    }
    const token = verificationResult.decoded.session;
    const session: Session = await SessionModel.getSessionByToken(token);
    if (!session) {
      throw new Error(); // Invalid Session
    }
    next();
  } catch (error) {
    throw new ApiError(
      'Invalid session token or incorrect token structure.',
      StatusCode.FORBIDDEN,
      Severity.MED
    );
  }
}
