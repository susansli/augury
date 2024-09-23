import { Document } from 'mongoose';

export default interface Stock extends Document {
  portfolioId: string;
  symbol: string;
}
