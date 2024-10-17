import { Types } from 'mongoose';
import Identifiable from './Identifiable';

export default interface BuyRecord extends Identifiable {
  stockId: Types.ObjectId | string;
  shares: number;
  boughtAtPrice: number;
}
