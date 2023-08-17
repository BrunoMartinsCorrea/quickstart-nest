export interface Theme {
  accent: string;
  onAccent: string;

  surface: string;
  surfaceDim: string;
  surfaceFocus: string;

  card: string;
  onCard: string;

  destructive: string;
  onDestructive: string;

  outline: string;
  borderRadius: string;
  borderRadiusMD: string;
  borderRadiusLG: string;

  text: string;
  caption: string;

  transitionSpeed: string;

  dropShadowSM: string;
  dropShadowMD: string;
  dropShadowLG: string;

  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };

  containerSize: string;
  fontSize: string;

  spacing: {
    0: string;
    0.5: string;
    1: string;
    1.5: string;
    2: string;
    2.5: string;
    3: string;
    3.5: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    11: string;
    12: string;
    14: string;
    16: string;
    20: string;
    24: string;
    28: string;
    32: string;
    36: string;
    40: string;
    44: string;
    48: string;
    52: string;
    56: string;
    60: string;
    64: string;
    72: string;
    80: string;
    96: string;
  };
}
