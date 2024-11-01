import { atom, selector } from 'recoil';
import { CompositionValues } from '../OnboardingDefaults';
import { jsonifyOnboarding } from '../../../helpers/format';
import { OptionType, Sectors } from '../onboardingData';
import { SingleValue } from 'react-select';

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

export const onboardingSectorAtom = atom<SingleValue<OptionType>>({
  key: 'onboardingSectorAtom',
  default: null,
});

export const onboardingAtomSelector = selector({
  key: 'onboardingAtomSelector',
  get: ({ get }) => {
    const balance = get(onboardingBalanceAtom);
    const composition = get(onboardingCompAtom);
    const risk = get(onboardingRiskAtom);
    const sectors = get(onboardingSectorAtom);
    return { balance, composition, risk, sectors };
  },
});
