import { LabelHTMLAttributes } from 'react';
import { StyledLabel } from './styles';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  size?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
}

export function Label({ size = '2', ...props }: LabelProps) {
  return <StyledLabel $size={size} {...props} />;
}
