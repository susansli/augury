import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  color: {
    type: String,
    enum: ['white', 'red', 'green', 'blue', 'yellow'], // Enum definition
    default: 'white', // Default value for status
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Portfolio',
    unique: true,
  },
});

const PortfolioGroupSchema = mongoose.model('PortfolioGroup', schema);

export default PortfolioGroupSchema;
