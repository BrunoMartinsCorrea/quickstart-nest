import { Theme } from './theme'

export const defaultTheme: Theme = {
  primary: '#18181B',
  onPrimary: '#FFFFFF',

  background: '#FFFFFF',
  mutedBackground: '#F4F4F5',

  destructive: '#DC2626',
  onDestructive: '#FFFFFF',

  border: '#E4E4E7',

  text: '#09090B',
  mutedText: '#71717A',

  transitionSpeed: '150ms',

  borderRadius: '0.25rem',
  borderRadiusMD: '0.375rem',
  borderRadiusLG: '0.5rem',

  dropShadowSM: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))',
  dropShadowMD: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));',
  dropShadowLG: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))',

  breakpoints: {
    xs: '330px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },

  containerSize: '1400px',
  fontSize: '14px',

  spacing: {
    0: '0',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  }
}
