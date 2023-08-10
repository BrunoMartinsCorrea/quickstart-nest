import { Theme } from './themes/theme';

interface CommonLayoutProps {
  $w?: string | number;
  $h?: string | number;
  $p?: string | number;
  $pt?: string | number;
  $pl?: string | number;
  $pr?: string | number;
  $pb?: string | number;
  $m?: string | number;
  $mt?: string | number;
  $ml?: string | number;
  $mr?: string | number;
  $mb?: string | number;
  $flex?: number;
}

interface CommonLetterProps {
  $color?: string;
  $fw?: 'normal' | '500' | 'bold';
  $fs?: string;
  letterSpacing?: number | string;
  $textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
}

function addLayoutProps(props: CommonLayoutProps & { theme: Theme }) {
  return {
    ...(props.$w && { width: props.$w }),
    ...(props.$h && { height: props.$h }),
    ...(props.$flex && { flex: props.$flex }),
    ...(props.$p && { padding: props.theme.spacing[props.$p] }),
    ...(props.$pt && { paddingTop: props.theme.spacing[props.$pt] }),
    ...(props.$pl && { paddingLeft: props.theme.spacing[props.$pl] }),
    ...(props.$pr && { paddingRight: props.theme.spacing[props.$pr] }),
    ...(props.$pb && { paddingBottom: props.theme.spacing[props.$pb] }),
    ...(props.$m && { margin: props.theme.spacing[props.$m] }),
    ...(props.$mt && { marginTop: props.theme.spacing[props.$mt] }),
    ...(props.$ml && { marginLeft: props.theme.spacing[props.$ml] }),
    ...(props.$mr && { marginRight: props.theme.spacing[props.$mr] }),
    ...(props.$mb && { marginBottom: props.theme.spacing[props.$mb] }),
  };
}

function addLetterProps(props: CommonLetterProps & { theme: Theme }) {
  return {
    ...(props.$color && { color: props.$color }),
    ...(props.$fs && { fontSize: props.$fs }),
    ...(props.$fw && { fontWeight: props.$fw }),
    ...(props.$textTransform && { textTransformation: props.$textTransform }),
  };
}

export type { CommonLayoutProps, CommonLetterProps };
export { addLayoutProps, addLetterProps };
