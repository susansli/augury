import { ObjectId } from 'mongoose';
import Portfolio from './Portfolio';

export default interface PortfolioDefault extends Portfolio {
  userId: ObjectId;
}
