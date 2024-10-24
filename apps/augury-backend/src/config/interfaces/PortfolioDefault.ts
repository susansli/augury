import { Types } from 'mongoose';
import Portfolio from './Portfolio';

export default interface PortfolioDefault extends Portfolio {
  userId: Types.ObjectId | string;
}
