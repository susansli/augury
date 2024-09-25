import { Document, ObjectId } from 'mongoose';
import { PortfolioColor } from '../enums/PortfolioColor';

export default interface PortfolioGroup extends Document {
  name: string;
  color: PortfolioColor;
  userId: ObjectId;
}
