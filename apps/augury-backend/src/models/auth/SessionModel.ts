import mongoose from 'mongoose';
import { Severity } from '../../config/enums/Severity';
import StatusCode from '../../config/enums/StatusCode';
import Session from '../../config/interfaces/Session';
import SessionSchema from '../../config/schemas/Session';
import ApiError from '../../errors/ApiError';

const getSessionByUserId = async (
  userId: mongoose.Types.ObjectId
): Promise<Session> => {
  const session = await SessionSchema.findOne({ userId: userId });

  if (!session) {
    throw new ApiError(
      'This session does not exist.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return session;
};

const createSession = async (data: Session): Promise<Session> => {
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

const updateSession = async (data: Session): Promise<Session> => {
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
  createSession,
  updateSession,
};
