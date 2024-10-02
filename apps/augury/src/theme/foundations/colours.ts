import { flavors } from "@catppuccin/palette";

const palette = flavors.mocha.colors;

const colors = {
  background: {
    // Background pane
    crust: palette.crust.hex,
    // Secondary panes
    mantle: palette.mantle.hex,
    base: palette.base.hex,
    // Surface elements
    surface0: palette.surface0.hex,
    surface1: palette.surface1.hex,
    surface2: palette.surface2.hex,
    // overlays
    overlay0: palette.overlay0.hex,
    overlay1: palette.overlay1.hex,
    overlay2: palette.overlay2.hex,
    selBg: `${palette.overlay2.hex}33`
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
