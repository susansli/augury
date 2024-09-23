import { Document, ObjectId } from 'mongoose';

export default interface BuyRecord extends Document {
  stockId: ObjectId;
  shares: number;
  boughtAtPrice: number;
}
