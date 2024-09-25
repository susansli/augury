import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+@.+\..+/, // Basic email format validation
  },

  password: {
    type: String,
    required: true,
    min: 8,
    max: 64,
  },

  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },
});

const UserSchema = mongoose.model('User', schema);

export default UserSchema;
