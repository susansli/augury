import borders from './borders';
import colours from './colours';
import radii from './radius';
import shadows from './shadows';
import sizes from './sizes';
import { spacing } from './spacing';
import transition from './transition';
import typography from './typography';
import zIndices from './z-index';

const foundations = {
  zIndices,
  radii,
  colours,
  ...typography,
  sizes,
  shadows,
  space: spacing,
  borders,
  transition,
};

export default foundations;
