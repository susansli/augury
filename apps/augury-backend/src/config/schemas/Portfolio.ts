import mongoose from 'mongoose';
import Portfolio, { PortfolioRisk } from '../interfaces/Portfolio';

const schema = new mongoose.Schema<Portfolio>({
  name: {
    type: String,
    required: true,
  },

  risk: {
    type: String,
    enum: Object.values(PortfolioRisk), // Enum definition
    default: PortfolioRisk.CONSERVATIVE, // Default value for status
    required: true,
  },
});

const PortfolioSchema = mongoose.model('Portfolio', schema);

export default PortfolioSchema;
