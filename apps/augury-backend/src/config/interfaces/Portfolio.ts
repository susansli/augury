import { Document } from 'mongoose';

export enum PortfolioRisk {
  Conservative = 'Conservative',
  Moderate = 'Moderate',
  Aggressive = 'Aggressive',
}

export default interface Portfolio extends Document {
  name: string;
  risk: PortfolioRisk;
}
