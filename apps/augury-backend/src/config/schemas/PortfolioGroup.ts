import mongoose from 'mongoose';
import PortfolioGroup from '../interfaces/PortfolioGroup';
import { PortfolioColor } from '../enums/PortfolioColor';

const schema = new mongoose.Schema<PortfolioGroup>({
  name: {
    type: String,
    required: true,
  },

  color: {
    type: String,
    enum: Object.values(PortfolioColor), // Enum definition
    default: PortfolioColor.WHITE, // Default value for status
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
