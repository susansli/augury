import mongoose from 'mongoose';
import Portfolio from '../interfaces/Portfolio';
import PortfolioRisk from '../enums/PortfolioRisk';
import stripAndFormatIds from '../utils/stripAndFormatIds';

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
schema.plugin(stripAndFormatIds); // toJSON middleware

const PortfolioSchema = mongoose.model<Portfolio>('Portfolio', schema);

export default PortfolioSchema;
