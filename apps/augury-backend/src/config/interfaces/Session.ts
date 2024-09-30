import { Types } from 'mongoose';

export default interface Session {
  userId: Types.ObjectId;
  token: string;
  created: number;
  expires: number;
}
