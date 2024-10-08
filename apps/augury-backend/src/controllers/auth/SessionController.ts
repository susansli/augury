import { Types } from 'mongoose';
import { AxiosError } from 'axios';
import Session from '../../config/interfaces/Session';
import ApiError from '../../errors/ApiError';
import SessionModel from '../../models/auth/SessionModel';

export async function getSession(
  id: Types.ObjectId,
  token: string
): Promise<Session> {
  let response;
  const session: Session = {
    userId: id,
    token: token,
  };
  try {
    response = await SessionModel.updateSession(session);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      response = await SessionModel.createSession(session);
    } else if (error instanceof AxiosError) {
      throw new Error(error.message);
    } else {
      throw new Error(`Unknown error occurred! ${JSON.stringify(error)}`);
    }
  }

  return response;
}
