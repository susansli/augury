import { atom } from 'recoil';
import { OptionType, Sectors } from './onboardingData';
import { SingleValue } from 'react-select';

export const onboardingSectorAtom = atom<SingleValue<OptionType>>({
  key: 'onboardingSectorAtom',
  default: null,
});
