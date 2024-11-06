import mongoose from 'mongoose';
import PortfolioDefault from '../interfaces/PortfolioDefault';
// import PortfolioRisk from '../enums/PortfolioRisk';
import stripAndFormatIds from '../utils/stripAndFormatIds';

const schema = new mongoose.Schema<PortfolioDefault>({
  userId: { type: mongoose.Schema.Types.ObjectId }, // Reference to the user these defaults are for
  name: { type: String, required: true }, // Portfolio name
  // risk: {
  //   // Optional risk level
  //   type: String,
  //   enum: Object.values(PortfolioRisk), // Enum definition
  //   // default: PortfolioRisk.CONSERVATIVE, // Default value for status
  // },
  // useCustomRisk: { type: Boolean, required: true }, // If true, custom risk settings are used
  riskPercentage1: { type: Number },
  riskPercentage2: { type: Number },
  sectorTags: [String], // Would use custom validation but it's weird to enforce. Will validate through business logic
});
schema.plugin(stripAndFormatIds); // toJSON middleware

const PortfolioDefaultSchema = mongoose.model<PortfolioDefault>(
  'PortfolioDefault',
  schema
);

export default PortfolioDefaultSchema;
