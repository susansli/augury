import { Document, Types } from 'mongoose';

export default interface Stock extends Document {
  portfolioId: Types.ObjectId;
  symbol: string;
}
