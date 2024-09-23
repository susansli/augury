import { Document } from 'mongoose';
import { ObjectId } from 'mongoose';

export default interface Stock extends Document {
  portfolioId: ObjectId;
  symbol: string;
}
