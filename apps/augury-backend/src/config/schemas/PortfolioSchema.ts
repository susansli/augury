import mongoose from 'mongoose';
import Portfolio from '../interfaces/Portfolio';
import PortfolioRisk from '../enums/PortfolioRisk';
import stripAndFormatIds from '../utils/stripAndFormatIds';
import Sectors from '../enums/Sectors';

const schema = new mongoose.Schema<Portfolio>({
  name: { type: String, required: true }, // Portfolio name
  risk: {
    // Optional risk level
    type: String,
    enum: Object.values(PortfolioRisk), // Enum definition
    // default: PortfolioRisk.CONSERVATIVE, // Default value for status
  },
  useCustomRisk: { type: Boolean, required: true }, // If true, custom risk settings are used
  customRiskPercentage1: { type: Number },
  customRiskPercentage2: { type: Number },
  sectorTags: {
    type: [String],
    enum: Object.values(Sectors),
  },
});
schema.plugin(stripAndFormatIds); // toJSON middleware

const PortfolioSchema = mongoose.model<Portfolio>('Portfolio', schema);

export default PortfolioSchema;
