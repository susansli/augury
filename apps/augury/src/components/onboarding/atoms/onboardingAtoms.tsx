import { atom, selector } from 'recoil';
import { CompositionValues } from '../OnboardingDefaults';
import { jsonifyOnboarding } from '../../../helpers/format';

export const onboardingBalanceAtom = atom<string>({
  key: 'onboardingBalanceAtom',
  default: '1000.00',
});

export const onboardingCompAtom = atom({
  key: 'onboardingCompAtom',
  default: CompositionValues.BALANCED,
});

export const onboardingRiskAtom = atom<boolean>({
  key: 'onboardingRiskAtom',
  default: false,
});

export const onboardingAtomSelector = selector({
  key: 'onboardingAtomSelector',
  get: ({ get }) => {
    const balance = get(onboardingBalanceAtom);
    const composition = get(onboardingCompAtom);
    const risk = get(onboardingRiskAtom);
    return [balance, composition, risk];
  },
});
