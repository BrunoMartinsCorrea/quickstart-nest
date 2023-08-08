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
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  }
}
