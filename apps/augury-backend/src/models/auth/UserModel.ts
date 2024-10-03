import mongoose from 'mongoose';
import User from '../../config/interfaces/User';
import UserSchema from '../../config/schemas/User';
import ApiError from '../../errors/ApiError';
import StatusCode from '../../config/enums/StatusCode';
import Severity from '../../config/enums/Severity';

const getUser = async (id: mongoose.Types.ObjectId): Promise<User> => {
  const user = await UserSchema.findById(id);

  if (!user) {
    throw new ApiError(
      'This user does not exist.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return user;
};

const getUserByGoogleId = async (googleId: string): Promise<User> => {
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

const createUser = async (data: User): Promise<User> => {
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
  id: mongoose.Types.ObjectId,
  data: User
): Promise<User> => {
  const user = await UserSchema.findById(id);

  if (!user) {
    throw new ApiError(
      'This user does not exist.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  const { email, googleId, firstName, lastName, balance }: User = data;

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

const deleteUser = async (id: mongoose.Types.ObjectId): Promise<User> => {
  const user: User = await UserSchema.findByIdAndDelete(id);

  if (!user) {
    throw new ApiError(
      'This user does not exist.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return user;
};

export default module.exports = {
  getUser,
  getUserByGoogleId,
  createUser,
  updateUser,
  deleteUser,
};
