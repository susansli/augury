import mongoose from 'mongoose';
import PortfolioGroupRelation from '../interfaces/PortfolioGroupRelation';
import stripAndFormatIds from '../utils/stripAndFormatIds';

const schema = new mongoose.Schema<PortfolioGroupRelation>({
  portfolioId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Portfolio',
  },

  portfolioGroupId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'PortfolioGroup',
  },
});
schema.plugin(stripAndFormatIds); // toJSON middleware
// Prevent duplicated relations
schema.index({ portfolioId: 1, portfolioGroupId: 1 }, { unique: true });

const PortfolioGroupRelationSchema = mongoose.model<PortfolioGroupRelation>(
  'PortfolioGroupRelation',
  schema
);

export default PortfolioGroupRelationSchema;
