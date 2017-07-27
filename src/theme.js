import { darken, lighten } from 'polished';

const pinkBase = '#ff3db0';

const theme = {
  pink: pinkBase,
  pinkLight: lighten(0.1, pinkBase),
  pinkLighter: lighten(0.2, pinkBase),
  pinkLightest: lighten(0.3, pinkBase),
  pinkDark: darken(0.3, pinkBase),
  pinkDarker: darken(0.4, pinkBase),
  pinkDarkest: darken(0.5, pinkBase),
};

export default theme;
