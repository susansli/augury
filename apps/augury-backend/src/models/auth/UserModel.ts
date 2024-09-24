import mongoose from 'mongoose';
import User from '../../config/interfaces/User';
import UserSchema from '../../config/schemas/User';

const getUser = async (id: mongoose.Types.ObjectId): Promise<User> => {
  const user = await UserSchema.findById(id);

  if (!user) {
    // TODO: Replace when merged with error handling middlware
    // throw new ApiError('This user does not exist.');
    throw new Error('This user does not exist.');
  }

  return user;
};

const createUser = async (data: User): Promise<User> => {
  const user = await UserSchema.create(data);

  if (!user) {
    // TODO: Replace when merged with error handling middlware
    // throw new ApiError('This user could not be created.');
    throw new Error('This user could not be created.');
  }

  return user;
};

const updateUser = async (
  id: mongoose.Types.ObjectId,
  data: User
): Promise<User> => {
  const user = await UserSchema.findById(id);

  if (!user) {
    // TODO: Replace when merged with error handling middlware
    // throw new ApiError('This user does not exist.');
    throw new Error('This user does not exist.');
  }

  if (data.email) user.email = data.email;
  if (data.password) user.password = data.password;
  if (data.firstName) user.firstName = data.firstName;
  if (data.lastName) user.lastName = data.lastName;
  const updatedUser = await user.save();

  if (!updatedUser) {
    // TODO: Replace when merged with error handling middlware
    // throw new ApiError('This user could not be updated.');
    throw new Error('This user could not be updated.');
  }

  return updatedUser;
};

const deleteUser = async (id: mongoose.Types.ObjectId): Promise<User> => {
  const user: User = await UserSchema.findByIdAndDelete(id);

  if (!user) {
    // TODO: Replace when merged with error handling middlware
    // throw new ApiError('This user does not exist.');
    throw new Error('This user does not exist.');
  }

  return user;
};

export default module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
