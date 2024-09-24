import mongoose from 'mongoose';
import { Document } from 'mongoose';

export default interface Stock extends Document {
  portfolioId: mongoose.Types.ObjectId;
  symbol: string;
}
