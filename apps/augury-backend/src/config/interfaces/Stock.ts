import { Types } from 'mongoose';
import Identifiable from './Identifiable';

export default interface Stock extends Identifiable {
  portfolioId: Types.ObjectId | string;
  symbol: string;
}
