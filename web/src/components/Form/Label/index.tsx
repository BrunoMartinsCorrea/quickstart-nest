import { LabelHTMLAttributes } from 'react';
import { StyledLabel } from './index.style';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export function Label(props: LabelProps) {
  return <StyledLabel {...props}>{props.children}</StyledLabel>;
}
