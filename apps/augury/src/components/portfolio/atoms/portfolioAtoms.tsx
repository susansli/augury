import { atom } from 'recoil';
import { PortfolioInterface } from '../PortfolioCard';
import {
  PortfolioGroup,
  PortfolioGroupInterface,
} from '../PortfolioGroupModal';
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
export const portfolioGroupAtom = atom<PortfolioGroupInterface>({
  key: 'portfolioGroupAtom',
  default: {
    name: 'hello',
    color: PortfolioColor.RED,
    userId: '672a6e7501ca4cc969f7ac3b',
    portfolios: [],
  },
});

export default portfolioAtom;
