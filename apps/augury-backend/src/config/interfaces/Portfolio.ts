import PortfolioRisk from '../enums/PortfolioRisk';
import Sectors from '../enums/Sectors';
import Identifiable from './Identifiable';

export default interface Portfolio extends Identifiable {
  name?: string; // Portfolio name
  risk?; // Optional risk if `useCustomRisk` is true
  useCustomRisk?: boolean; // If true, indicates custom risk settings are used
  customRiskPercentage1?: number; // First custom percentage value if using custom risk
  customRiskPercentage2?: number; // Second custom percentage value if using custom risk
  sectorTags?: Sectors[]; // Array of sector tags
}
