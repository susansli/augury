import { Document } from 'mongoose';
import { ObjectId } from 'mongoose';

export default interface PortfolioGroupRelation extends Document {
  portfolioId: ObjectId;
  portfolioGroupId: ObjectId;
}
