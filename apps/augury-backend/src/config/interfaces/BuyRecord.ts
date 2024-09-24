import mongoose from 'mongoose';
import { Document } from 'mongoose';

export default interface BuyRecord extends Document {
  stockId: mongoose.Types.ObjectId;
  shares: number;
  boughtAtPrice: number;
}
