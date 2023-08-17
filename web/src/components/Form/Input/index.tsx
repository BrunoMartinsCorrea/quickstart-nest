import { InputHTMLAttributes } from 'react';
import { StyledInput } from './index.style';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return <StyledInput {...props} />;
}
