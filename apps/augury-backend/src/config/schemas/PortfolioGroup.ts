import mongoose from 'mongoose';
import { Color } from '../interfaces/PortfolioGroup';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  color: {
    type: String,
    enum: Object.values(Color), // Enum definition
    default: 'white', // Default value for status
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const PortfolioGroupSchema = mongoose.model('PortfolioGroup', schema);

export default PortfolioGroupSchema;
