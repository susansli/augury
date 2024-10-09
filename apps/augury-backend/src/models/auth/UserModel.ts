import mongoose from 'mongoose';
import User from '../../config/interfaces/User';
import UserSchema from '../../config/schemas/User';
import ApiError from '../../errors/ApiError';
import StatusCode from '../../config/enums/StatusCode';
import Severity from '../../config/enums/Severity';
import { getSessionByToken } from '../../controllers/auth/SessionController';

const getUser = async (id: string | mongoose.Types.ObjectId) => {
  const userId = new mongoose.Types.ObjectId(id);
  const user = await UserSchema.findById(userId);

  if (!user) {
    throw new ApiError(
      'This user does not exist.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return user;
};

const getUserByGoogleId = async (googleId: string) => {
  const user = await UserSchema.findOne({ googleId: googleId });

  if (!user) {
    throw new ApiError(
      'This user does not exist.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return user;
};

const createUser = async (data: User) => {
  const user = await UserSchema.create(data);

  if (!user) {
    throw new ApiError(
      'This user could not be created.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return user;
};

const updateUser = async (
  id: string | mongoose.Types.ObjectId,
  data: Partial<User>
) => {
  const userId = new mongoose.Types.ObjectId(id);
  const user = await UserSchema.findById(userId);

  if (!user) {
    throw new ApiError(
      'This user does not exist.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  const { email, googleId, firstName, lastName, balance }: Partial<User> = data;

  user.email = email || user.email;
  user.googleId = googleId || user.googleId;
  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.balance = balance || user.balance;

  const updatedUser = await user.save();

  if (!updatedUser) {
    throw new ApiError(
      'This user could not be updated.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return updatedUser;
};

const deleteUser = async (id: string | mongoose.Types.ObjectId) => {
  const userId = new mongoose.Types.ObjectId(id);
  const user = await UserSchema.findByIdAndDelete(userId);

  if (!user) {
    throw new ApiError(
      'This user does not exist.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return user;
};

const getUserBySessionToken = async (sessionToken: string) => {
  const session = await getSessionByToken(sessionToken);
  const user = await getUser(session.userId);
  return user;
};

export default module.exports = {
  getUser,
  getUserByGoogleId,
  getUserBySessionToken,
  createUser,
  updateUser,
  deleteUser,
};
