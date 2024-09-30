import mongoose from 'mongoose';
import Session from '../interfaces/Session';

const schema = new mongoose.Schema<Session>({
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
});

const SessionSchema = mongoose.model('Session', schema);

export default SessionSchema;
