import { Types } from 'mongoose';
import Identifiable from './Identifiable';

export default interface Session extends Identifiable {
  userId: Types.ObjectId;
  token: string;
}
