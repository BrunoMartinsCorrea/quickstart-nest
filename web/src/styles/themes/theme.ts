export interface Theme {
  primary: string;
  onPrimary: string;

  background: string;
  mutedBackground: string;

  destructive: string;
  onDestructive: string;

  border: string;
  borderRadius: string,
  borderRadiusMD: string,
  borderRadiusLG: string,

  text: string;
  mutedText: string;

  transitionSpeed: string;

  dropShadowSM: string;
  dropShadowMD: string;
  dropShadowLG: string;

  breakpoints: {
    xs: string,
    sm: string,
    md: string,
    lg: string,
    xl: string,
    xxl: string,
  }

  containerSize: string;
  fontSize: string;
}
