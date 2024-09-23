import { Document } from 'mongoose';

export enum PortfolioRisk {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export default interface Portfolio extends Document {
  name: string;
  risk: PortfolioRisk;
}
