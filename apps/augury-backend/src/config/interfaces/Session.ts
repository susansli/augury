import { Document } from 'mongoose';
import { ObjectId } from 'mongoose';

export default interface Session extends Document {
  userId: ObjectId;
  token: string;
  created: number;
  expires: number;
}
