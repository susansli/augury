import mongoose from 'mongoose';
import Stock from '../interfaces/Stock';

const schema = new mongoose.Schema({
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

const StockSchema = mongoose.model<Stock>('Stock', schema);

export default StockSchema;
