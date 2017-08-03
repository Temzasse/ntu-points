import { darken, lighten } from 'polished';

const pinkBase = '#ff3db0';

const theme = {
  pink: pinkBase,
  pinkLight: lighten(0.1, pinkBase),
  pinkLighter: lighten(0.2, pinkBase),
  pinkLightest: lighten(0.35, pinkBase),
  pinkDark: darken(0.25, pinkBase),
  pinkDarker: darken(0.4, pinkBase),
  pinkDarkest: darken(0.5, pinkBase),
  pinkGradient: `linear-gradient(
    135deg,
    ${lighten(0.2, pinkBase)} 0%,
    ${pinkBase} 100%
  )`,
  pinkGradientSideways: `linear-gradient(
    -45deg,
    ${pinkBase} 0%,
    ${lighten(0.2, pinkBase)} 100%
  )`,
};

export default theme;
