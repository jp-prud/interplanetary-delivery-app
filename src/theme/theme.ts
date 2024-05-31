import { ViewStyle } from 'react-native';

import { createTheme } from '@shopify/restyle';

export const palette = {
  neutral0: '#fefefe',
  neutral100: '#f1f1f1',
  neutral200: '#e2e2e2',
  neutral300: '#c6c6c6',
  neutral400: '#ababab',
  neutral500: '#919191',
  neutral600: '#6a6a6a',
  neutral700: '#525252',
  neutral800: '#3b3b3b',
  neutral900: '#262626',
  neutral1000: '#111111',
  black100: '#0000001a',
  black200: '#00000033',
  black300: '#0000004d',
  black400: '#00000066',
  black500: '#00000080',
  black600: '#00000099',
  black700: '#000000b3',
  black800: '#000000cc',
  black900: '#000000e6',
  black1000: '#111111',
  whiteTint100: '#ffffff1a',
  whiteTint200: '#ffffff33',
  whiteTint300: '#ffffff4d',
  whiteTint400: '#ffffff66',
  whiteTint500: '#ffffff80',
  whiteTint600: '#ffffff99',
  whiteTint700: '#ffffffb3',
  whiteTint800: '#ffffffcc',
  whiteTint900: '#ffffffe6',
  whiteTint1000: '#ffffff',
  grayBackground: '#F2F2F2',
  primary: '#01c27d',
  primaryLight: '#edfbf6',
  secondary: '#ffefcf',
  border: '#E9F1FF',
  text: '#040415',
  subtext: '#9B9BA1',
  white: '#FFFFFF',
  success: '#4ABC86',
  successLight: '#D8FFEC',
  redError: '#EA3838',
  redErrorLight: '#FBECEC',
};

export const theme = createTheme({
  colors: {
    ...palette,
    primary: palette.primary,
    primaryContrast: palette.white,

    buttonPrimary: palette.primary,

    background: palette.white,
    backgroundContrast: palette.text,

    error: palette.redError,
    errorLight: palette.redErrorLight,

    success: palette.success,
    successLight: palette.successLight,
  },
  spacing: {
    s0: 0,
    s4: 4,
    s8: 8,
    s10: 10,
    s12: 12,
    s14: 14,
    s16: 16,
    s20: 20,
    s24: 24,
    s28: 28,
    s32: 32,
    s36: 36,
    s40: 40,
    s42: 42,
    s48: 48,
    s56: 56,
  },
  borderRadii: {
    s8: 8,
    s12: 12,
    s16: 16,
    s32: 32,
  },
  textVariants: {
    defaults: {},
  },
});

export const $shadowProps: ViewStyle = {
  elevation: 10,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: -3 },
};

export type Theme = typeof theme;
export type ThemeColors = keyof Theme['colors'];
