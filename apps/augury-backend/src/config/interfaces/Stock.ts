import { Document, ObjectId } from 'mongoose';

export default interface Stock extends Document {
  portfolioId: ObjectId;
  symbol: string;
}
