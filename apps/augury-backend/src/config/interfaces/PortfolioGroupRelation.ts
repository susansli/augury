import { Types } from 'mongoose';
import Identifiable from './Identifiable';

export default interface PortfolioGroupRelation extends Identifiable {
  portfolioId: Types.ObjectId;
  portfolioGroupId: Types.ObjectId;
}
