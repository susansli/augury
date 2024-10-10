import { Request, Response, NextFunction } from 'express';
import ApiError from '../errors/ApiError';
import ClientError from '../errors/ClientError';
import StatusCode from '../config/enums/StatusCode';
import Severity from '../config/enums/Severity';
import SessionController from '../controllers/auth/SessionController';

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
    SessionController.getSessionByToken(accessToken);
    next();
  } catch (error) {
    throw new ApiError(
      'Invalid session token or incorrect token structure.',
      StatusCode.FORBIDDEN,
      Severity.MED
    );
  }
}
