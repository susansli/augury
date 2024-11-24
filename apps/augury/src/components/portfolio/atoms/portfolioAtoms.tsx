import { atom } from 'recoil';
import { PortfolioInterface } from '../PortfolioCard';
import { PortfolioGroupInterface } from '../PortfolioGroupModal';
import { PortfolioColor } from '../portfolioData';
const portfolioAtom = atom<PortfolioInterface>({
  key: 'portfolioAtom',
  default: {
    name: '',
    riskPercentage1: 0,
    riskPercentage2: 0,
    sectorTags: [],
  },
});
export const portfolioIdAtom = atom<string>({
  key: 'portfolioIdAtom',
  default: '',
});
export const portfolioGroupAtom = atom<PortfolioGroupInterface>({
  key: 'portfolioGroupAtom',
  default: {
    name: 'hello',
    color: PortfolioColor.RED,
    userId: '',
    portfolios: [],
  },
});

export default portfolioAtom;
