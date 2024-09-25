import { Types } from 'mongoose';
import { PortfolioColor } from '../enums/PortfolioColor';

export default interface PortfolioGroup {
  name: string;
  color: PortfolioColor;
  userId: Types.ObjectId;
}
