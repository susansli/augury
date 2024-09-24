import mongoose from 'mongoose';
import { Document } from 'mongoose';

export default interface Session extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  created: number;
  expires: number;
}
