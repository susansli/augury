import mongoose from 'mongoose';
import Portfolio from '../interfaces/Portfolio';
// import PortfolioRisk from '../enums/PortfolioRisk';
import stripAndFormatIds from '../utils/stripAndFormatIds';

const schema = new mongoose.Schema<Portfolio>({
  name: { type: String, required: true }, // Portfolio name
  // risk: {
  //   // Optional risk level
  //   type: String,
  //   enum: Object.values(PortfolioRisk), // Enum definition
  //   // default: PortfolioRisk.CONSERVATIVE, // Default value for status
  // },
  // useCustomRisk: { type: Boolean, required: true }, // If true, custom risk settings are used
  riskPercentage1: { type: Number, required: true },
  riskPercentage2: { type: Number, required: true },
  sectorTags: [String], // Would use custom validation but it's weird to enforce. Will validate through business logic
});
schema.plugin(stripAndFormatIds); // toJSON middleware

const PortfolioSchema = mongoose.model<Portfolio>('Portfolio', schema);

export default PortfolioSchema;
