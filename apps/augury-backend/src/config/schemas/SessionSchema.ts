import mongoose from 'mongoose';
import Session from '../interfaces/Session';
import stripAndFormatIds from '../utils/stripAndFormatIds';

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
schema.plugin(stripAndFormatIds); // toJSON middleware

const SessionSchema = mongoose.model<Session>('Session', schema);

export default SessionSchema;
