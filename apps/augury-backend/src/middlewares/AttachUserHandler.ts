import { Response, NextFunction } from 'express';
import { verifyJwt } from '../config/utils/jwt';
import ApiError from '../errors/ApiError';
import StatusCode from '../config/enums/StatusCode';
import Severity from '../config/enums/Severity';
import Session from '../config/interfaces/Session';
import SessionModel from '../models/auth/SessionModel';
import UserModel from '../models/auth/UserModel';
import RequestWithUser from '../config/types/RequestWithUser';

export async function verifyTokenAndAttachUser(
  req: RequestWithUser,
  _res: Response,
  next: NextFunction
) {
  const accessToken = req?.cookies?.accessToken;
  if (!accessToken) {
    throw new ApiError(
      'No access token found.',
      StatusCode.UNAUTHORIZED,
      Severity.LOW
    );
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
    // Attach the data and pass control to the next middleware/handler
    req.user = await UserModel.getUser(session.userId);
    next();
  } catch (error) {
    throw new ApiError(
      'Invalid token structure.',
      StatusCode.FORBIDDEN,
      Severity.MED
    );
  }
}
