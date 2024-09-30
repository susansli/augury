import { Severity } from '../../config/enums/Severity';
import StatusCode from '../../config/enums/StatusCode';
import Session from '../../config/interfaces/Session';
import SessionSchema from '../../config/schemas/Session';
import ApiError from '../../errors/ApiError';

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

export default module.exports = {
  createSession,
};
