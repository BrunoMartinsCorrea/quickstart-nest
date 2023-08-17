import * as React from 'react';
import { BadgeContainer } from './index.style';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export function Badge({ variant = 'primary', children, ...props }: BadgeProps) {
  return (
    <BadgeContainer $variant={variant} {...props}>
      {children}
    </BadgeContainer>
  );
}
