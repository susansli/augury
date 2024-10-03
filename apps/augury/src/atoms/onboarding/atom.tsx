import { atom } from 'recoil';

export const OnboardingPage = atom({
  key: 'onboardingPage',
  default: 0,
})

export const CustomComposition = atom({
  key: 'onboardingCustomComposition',
  default: false,
})