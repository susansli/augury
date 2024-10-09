import mongoose from 'mongoose';
import Stock from '../interfaces/Stock';
import stripAndFormatIds from '../utils/stripAndFormatIds';

const schema = new mongoose.Schema<Stock>({
  portfolioId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Portfolio',
  },

  symbol: {
    type: String,
    required: true,
  },
});
schema.plugin(stripAndFormatIds); // toJSON middleware

const StockSchema = mongoose.model<Stock>('Stock', schema);

export default StockSchema;
