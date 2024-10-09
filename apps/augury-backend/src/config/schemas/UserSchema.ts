import mongoose from 'mongoose';
import User from '../interfaces/User';
import stripAndFormatIds from '../utils/stripAndFormatIds';

const schema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+@.+\..+/, // Basic email format validation
  },

  googleId: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },

  balance: {
    type: Number,
    default: 0,
  },
});
schema.plugin(stripAndFormatIds); // toJSON middleware

const UserSchema = mongoose.model<User>('User', schema);

export default UserSchema;
