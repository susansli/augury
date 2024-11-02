import mongoose from 'mongoose';
import User from '../../config/interfaces/User';
import UserSchema from '../../config/schemas/UserSchema';
import ApiError from '../../errors/ApiError';
import StatusCode from '../../config/enums/StatusCode';
import Severity from '../../config/enums/Severity';
import SessionController from '../../controllers/auth/SessionController';

/**
 * Retrieves a `User` based on passed id
 * @param id Mongoose document id
 * @returns `User` document
 * @throws ApiError if user doesn't exists/invalid ID
 */
const getUser = async (id: string | mongoose.Types.ObjectId) => {
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

/**
 * Retrieves a `User` based on the passed google id
 * @param googleId Unique Google account identifier
 * @returns `User` document
 * @throws ApiError if user doesn't exists/invalid ID
 */
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

/**
 * Creates a `User` based on passed data
 * @param data `User` object to create
 * @returns New `User` document
 * @throws ApiError if user couldn't be created
 */
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

/**
 * Updates a specific `User`'s data by id.
 * @param id Mongoose document id
 * @param data
 * @returns Updated user data
 * @throws ApiError if user doesn't exist/invalid id, or user couldn't be updated
 */
const updateUser = async (
  id: string | mongoose.Types.ObjectId,
  data: Partial<User>
) => {
  const user = await UserSchema.findById(id);

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
  if (typeof balance === 'number' && !isNaN(balance)) {
    user.balance = balance;
  }

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

/**
 * Deletes a user from the database
 * ! Note: This is a dangerous action and should be carefully considered and well-implemented!
 * @param id Mongoose document id
 * @returns Removed user data
 */
const deleteUser = async (id: string | mongoose.Types.ObjectId) => {
  const user = await UserSchema.findByIdAndDelete(id);

  if (!user) {
    throw new ApiError(
      'This user does not exist.',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return user;
};

/**
 * Retrieves a `User` from the database based on the provided session/`accessToken`
 * @param sessionToken Cookie from client `Request`
 * @returns `User` document
 * @throws ApiError if session is invalid or coult not retrieve user
 */
const getUserBySessionToken = async (sessionToken: string) => {
  const session = await SessionController.getSessionByToken(sessionToken);
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
