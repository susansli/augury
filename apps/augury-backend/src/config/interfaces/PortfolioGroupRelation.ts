import { Types } from 'mongoose';

export default interface PortfolioGroupRelation {
  portfolioId: Types.ObjectId;
  portfolioGroupId: Types.ObjectId;
}
