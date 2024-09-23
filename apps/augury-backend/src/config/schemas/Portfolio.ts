import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  risk: {
    type: String,
    enum: ['Low', 'Medium', 'High'], // Enum definition
    default: 'Low', // Default value for status
    required: true,
  },
});

const PortfolioSchema = mongoose.model('Portfolio', schema);

export default PortfolioSchema;
