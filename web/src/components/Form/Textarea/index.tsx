import * as React from 'react';
import { StyledTextarea } from './index.style';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea(props: TextareaProps) {
  return <StyledTextarea {...props} />;
}
