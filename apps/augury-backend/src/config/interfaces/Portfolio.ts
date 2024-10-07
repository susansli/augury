import { Document } from 'mongoose';
import { PortfolioRisk } from '../enums/PortfolioRisk';

export default interface Portfolio extends Document {
  name: string;
  risk: PortfolioRisk;
}
