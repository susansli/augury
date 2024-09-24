import mongoose from 'mongoose';
import { Document } from 'mongoose';

export default interface PortfolioGroupRelation extends Document {
  portfolioId: mongoose.Types.ObjectId;
  portfolioGroupId: mongoose.Types.ObjectId;
}
