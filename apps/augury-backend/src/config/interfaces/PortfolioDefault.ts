import { Types } from 'mongoose';
import Portfolio from './Portfolio';
import Identifiable from './Identifiable';

export default interface PortfolioDefault extends Identifiable, Portfolio {
  userId: Types.ObjectId;
}
