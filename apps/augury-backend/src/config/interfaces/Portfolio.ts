import { Document } from 'mongoose';

export enum PortfolioRisk {
  CONSERVATIVE = 'conservative',
  MODERATE = 'moderate',
  AGGRESSIVE = 'aggressive',
}

export default interface Portfolio extends Document {
  name: string;
  risk: PortfolioRisk;
}
