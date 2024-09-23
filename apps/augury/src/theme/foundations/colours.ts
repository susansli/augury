import { flavors } from "@catppuccin/palette";

// TODO: potentially find way to switch themes?
const palette = flavors.mocha.colors;

const colors = {
  main: {
    500: '#02558B', // this is to just set default button color to usafa
    warning: '#EE580D',
    mediumWarning: '#FFD000',
    lightGrey: '#EBEBEB',
  },
  background: {
    // Background pane
    100: palette.crust.hex,
    // Secondary panes
    200: palette.mantle.hex,
    300: palette.base.hex,
    // Surface elements
    400: palette.surface0.hex,
    500: palette.surface1.hex,
    600: palette.surface2.hex,
    // overlays
    700: palette.overlay0.hex,
    800: palette.overlay1.hex,
    900: palette.overlay2.hex,
  },
  text: {
    body: palette.text.hex,
    header: palette.text.hex,
    subtitle1: palette.subtext0.hex,
    subtitle2: palette.subtext1.hex,
    subtle: palette.overlay1.hex,
    link: palette.blue.hex,
    success: palette.green.hex,
    warning: palette.yellow.hex,
    error: palette.red.hex,
    tag: palette.blue.hex,
    selBg: `${palette.overlay2.hex}33`, // ~25% Opacity
    cursor: palette.rosewater.hex,
    accent: palette.green.hex // Primary accent colour
  },
  color: {
    // May remove later
    // Could be done programatically, unsure how chakra handles it
    rosewater: palette.rosewater.hex,
    flamingo: palette.flamingo.hex,
    pink: palette.pink.hex,
    mauve: palette.mauve.hex,
    red: palette.red.hex,
    maroon: palette.maroon.hex,
    yellow: palette.yellow.hex,
    green: palette.green.hex,
    teal: palette.teal.hex,
    sky: palette.sky.hex,
    sapphire: palette.sapphire.hex,
    blue: palette.blue.hex,
    lavender: palette.lavender.hex,
  }
};

export default colors;
