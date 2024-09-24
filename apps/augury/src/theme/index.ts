import { extendTheme } from '@chakra-ui/react';

// Foundation styling
import borders from './foundations/borders';
import colors from './foundations/colours';
import radii from './foundations/radius';
import shadows from './foundations/shadows';
import sizes from './foundations/sizes';
import transition from './foundations/transition';
import typography from './foundations/typography';
import zIndices from './foundations/z-index';

const theme = extendTheme({
  borders,
  colors,
  radii,
  shadows,
  sizes,
  transition,
  typography,
  zIndices,
});

export default theme;
