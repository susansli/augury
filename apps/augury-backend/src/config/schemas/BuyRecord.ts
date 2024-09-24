import mongoose from 'mongoose';

const schema = new mongoose.Schema({
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
