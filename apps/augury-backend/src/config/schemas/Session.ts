import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true,
  },

  token: {
    type: String,
    required: true,
  },

  created: {
    type: Number,
    required: true,
  },

  expires: {
    type: Number,
    required: true,
  },
});

const SessionSchema = mongoose.model('Session', schema);

export default SessionSchema;
