export type Typography = typeof typography;

const typography = {
  letterSpacing: {
    tighter: '-0.1em',
    tight: '-0.05em',
    normal: '0',
    wide: '0.05em',
    wider: '0.1em',
    widest: '0.2em',
  },
  lineHeights: {
    normal: 'normal',
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: '2',
  },
  fontWeights: {
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },
  fonts: {
    heading: 'Helvetica, sans-serif',
    body: 'Helvetica, sans-serif',
    mono: 'Fira Code, sans-serif'
  },
  fontSizes: {
    xs: '0.8rem',
    sm: '0.9rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem',
  },
};

export default typography;
