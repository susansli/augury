import { Document, Types } from 'mongoose';

export default interface PortfolioGroupRelation extends Document {
  portfolioId: Types.ObjectId;
  portfolioGroupId: Types.ObjectId;
}
