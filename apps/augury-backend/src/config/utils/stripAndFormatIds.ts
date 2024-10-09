import { Schema } from 'mongoose';

export default function (schema: Schema) {
  schema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });
}
