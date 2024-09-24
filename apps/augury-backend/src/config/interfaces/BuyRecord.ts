import { Document, Types } from 'mongoose';

export default interface BuyRecord extends Document {
  stockId: Types.ObjectId;
  shares: number;
  boughtAtPrice: number;
}
