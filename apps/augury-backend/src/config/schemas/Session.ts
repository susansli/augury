import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  token: {
    type: String,
    required: true,
    unique: true,
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
