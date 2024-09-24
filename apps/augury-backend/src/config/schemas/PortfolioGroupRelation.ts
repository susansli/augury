import mongoose from 'mongoose';
import PortfolioGroupRelation from '../interfaces/PortfolioGroupRelation';

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

const PortfolioGroupRelationSchema = mongoose.model(
  'PortfolioGroupRelation',
  schema
);

export default PortfolioGroupRelationSchema;
