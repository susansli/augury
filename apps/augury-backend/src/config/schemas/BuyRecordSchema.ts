import mongoose from 'mongoose';
import BuyRecord from '../interfaces/BuyRecord';
import stripAndFormatIds from '../utils/stripAndFormatIds';

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
schema.plugin(stripAndFormatIds); // toJSON middleware

const BuyRecordSchema = mongoose.model<BuyRecord>('BuyRecord', schema);

export default BuyRecordSchema;
