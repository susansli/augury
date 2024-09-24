import { Document, Types } from 'mongoose';

export default interface Session extends Document {
  userId: Types.ObjectId;
  token: string;
  created: number;
  expires: number;
}
