import { Document } from 'mongoose';
import { ObjectId } from 'mongoose';

export default interface Stock extends Document {
  stockId: ObjectId;
  shares: number;
  boughtAtPrice: number;
}
