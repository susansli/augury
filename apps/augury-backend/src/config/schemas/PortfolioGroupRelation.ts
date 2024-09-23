import mongoose from 'mongoose';

const schema = new mongoose.Schema({
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
