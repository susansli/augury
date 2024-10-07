import { atom } from 'recoil';

// Show navbar
export const navbarShowAtom = atom<boolean>({
  key: 'navbarShowAtom',
  default: true,
});

// Shows which button on the navbar is considered 'active'
export const navbarPageAtom = atom<number>({
  key: 'navbarPageState',
  default: 0,
});
