import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  risk: {
    type: String,
    enum: ['Conservative', 'Moderate', 'Aggressive'], // Enum definition
    default: 'Conservative', // Default value for status
    required: true,
  },
});

const PortfolioSchema = mongoose.model('Portfolio', schema);

export default PortfolioSchema;
