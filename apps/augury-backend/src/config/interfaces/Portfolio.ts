import PortfolioRisk from '../enums/PortfolioRisk';
import Identifiable from './Identifiable';

export default interface Portfolio extends Identifiable {
  name: string;
  risk: PortfolioRisk;
}
