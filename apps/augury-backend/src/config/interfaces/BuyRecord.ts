import { Types } from 'mongoose';
import Identifiable from './Identifiable';

export default interface BuyRecord extends Identifiable {
  stockId: Types.ObjectId;
  shares: number;
  boughtAtPrice: number;
}
