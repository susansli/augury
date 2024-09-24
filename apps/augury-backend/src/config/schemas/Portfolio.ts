import mongoose from 'mongoose';
import { PortfolioRisk } from '../interfaces/Portfolio';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  risk: {
    type: String,
    enum: Object.values(PortfolioRisk), // Enum definition
    default: 'conservative', // Default value for status
    required: true,
  },
});

const PortfolioSchema = mongoose.model('Portfolio', schema);

export default PortfolioSchema;
