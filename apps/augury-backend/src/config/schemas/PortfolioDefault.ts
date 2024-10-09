import mongoose from 'mongoose';
import PortfolioDefault from '../interfaces/PortfolioDefault';
import { PortfolioRisk } from '../enums/PortfolioRisk';
import stripAndFormatIds from '../utils/stripAndFormatIds';

const schema = new mongoose.Schema<PortfolioDefault>({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User',
  },

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

const PortfolioDefaultSchema = mongoose.model<PortfolioDefault>(
  'PortfolioDefault',
  schema
);

export default PortfolioDefaultSchema;
