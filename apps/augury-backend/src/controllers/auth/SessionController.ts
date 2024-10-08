import mongoose, { Types } from 'mongoose';
import { AxiosError } from 'axios';
import Session from '../../config/interfaces/Session';
import ApiError from '../../errors/ApiError';
import SessionModel from '../../models/auth/SessionModel';

export async function getSession(
  id: Types.ObjectId | string,
  token: string
): Promise<Session> {
  const _id = new mongoose.Types.ObjectId(id);
  let response;
  const session: Session = {
    userId: _id,
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
