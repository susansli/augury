import { Document, ObjectId } from 'mongoose';

export default interface PortfolioGroupRelation extends Document {
  portfolioId: ObjectId;
  portfolioGroupId: ObjectId;
}
