import mongoose from 'mongoose';
import { Document } from 'mongoose';

export enum Color {
  WHITE = 'white',
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
  YELLOW = 'yellow',
}

export default interface PortfolioGroup extends Document {
  name: string;
  color: Color;
  userId: mongoose.Types.ObjectId;
}
