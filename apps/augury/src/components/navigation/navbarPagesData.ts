import { faHouse, faBriefcase, faGear } from "@fortawesome/free-solid-svg-icons";
import { NavbarPage } from "./PageWrapper";

export const navbarPages: NavbarPage[] = [
  {
    icon: faHouse,
    link: '/',
    text: 'home',
    baseValue: 0,
  },
  {
    icon: faBriefcase,
    link: '/portfolio',
    text: 'portfolio',
    baseValue: 1,
  },
  {
    icon: faGear,
    link: '/settings',
    text: 'settings',
    baseValue: 2,
  },
];