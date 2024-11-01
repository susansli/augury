import { atom, selector } from 'recoil';
import { CompositionValues } from '../OnboardingDefaults';
import { PortfolioDefaultBody } from 'apps/augury/src/api/portfolio/Portfolio';

export const onboardingBalanceAtom = atom<string>({
  key: 'onboardingBalanceAtom',
  default: '1000.00',
});

export const onboardingCompAtom = atom<CompositionValues>({
  key: 'onboardingCompAtom',
  default: CompositionValues.BALANCED,
});

export const onboardingRiskAtom = atom<boolean>({
  key: 'onboardingRiskAtom',
  default: false,
});

export const onboardingSectorAtom = atom<string[]>({
  key: 'onboardingSectorAtom',
  default: [],
});

export const onboardingAtomSelector = selector({
  key: 'onboardingAtomSelector',
  get: ({ get }) => {
    const balance = get(onboardingBalanceAtom);
    const composition = get(onboardingCompAtom);
    const risk = get(onboardingRiskAtom);
    const sectors = get(onboardingSectorAtom);
    
    const onboardingBody: PortfolioDefaultBody = {
      balance: balance, 
      composition: composition, 
      risk: risk, 
      sectors: sectors 
    }
    return onboardingBody;
  },
});
