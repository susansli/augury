import { flavors } from "@catppuccin/palette";
import { mode } from "@chakra-ui/theme-tools";

const palette = flavors.mocha.colors;

const styles = {
  global: (props: any) => ({
    body: {
      color: mode('#000', '#FFF')(props),
      bg: mode('#FFF', palette.base.hex)(props),
    },
  }),
};

export default styles;