import { Types } from 'mongoose';

export default interface BuyRecord {
  stockId: Types.ObjectId;
  shares: number;
  boughtAtPrice: number;
}
