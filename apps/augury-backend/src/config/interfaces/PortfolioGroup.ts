import { Types } from 'mongoose';
import PortfolioColor from '../enums/PortfolioColor';
import Identifiable from './Identifiable';

export default interface PortfolioGroup extends Identifiable {
  name: string;
  color: PortfolioColor;
  userId: Types.ObjectId | string;
}
