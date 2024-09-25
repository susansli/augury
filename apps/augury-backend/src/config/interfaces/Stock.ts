import { Types } from 'mongoose';

export default interface Stock {
  portfolioId: Types.ObjectId;
  symbol: string;
}
