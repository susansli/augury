import { Document, ObjectId } from 'mongoose';

export default interface Session extends Document {
  userId: ObjectId;
  token: string;
  created: number;
  expires: number;
}
