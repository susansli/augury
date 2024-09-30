import mongoose from 'mongoose';
import User from '../interfaces/User';

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

const UserSchema = mongoose.model('User', schema);

export default UserSchema;
