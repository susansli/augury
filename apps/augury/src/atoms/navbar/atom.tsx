import { atom } from 'recoil';

// TODO: handle logic with this
// Show navbar
export const navbarShowState = atom({
  key: 'navbarShowState',
  default: true,
});

// Shows which button on the navbar is considered 'active'
export const navbarPageState = atom({
  key: 'navbarPageState',
  default: 0,
});
