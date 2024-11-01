// import PortfolioRisk from '../enums/PortfolioRisk';
import Sectors from '../enums/Sectors';
import Identifiable from './Identifiable';

export default interface Portfolio extends Identifiable {
  name: string; // Portfolio name
  // risk?: PortfolioRisk; // Optional risk if `useCustomRisk` is true
  // useCustomRisk: boolean; // If true, indicates custom risk settings are used
  riskPercentage1?: number;
  riskPercentage2?: number;
  sectorTags?: Sectors[];
}
