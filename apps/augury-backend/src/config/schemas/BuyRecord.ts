import mongoose from 'mongoose';
import BuyRecord from '../interfaces/BuyRecord';

const schema = new mongoose.Schema<BuyRecord>({
  stockId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Stock',
  },

  shares: {
    type: Number,
    required: true,
  },

  boughtAtPrice: {
    type: Number,
    required: true,
  },
});

const BuyRecordSchema = mongoose.model('BuyRecord', schema);

export default BuyRecordSchema;
