import { Document } from 'mongoose';

export enum PortfolioRisk {
  CONSERVATIVE = 'Conservative',
  MODERATE = 'Moderate',
  AGGRESSIVE = 'Aggressive',
}

export default interface Portfolio extends Document {
  name: string;
  risk: PortfolioRisk;
}
