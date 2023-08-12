import { ButtonVariant, Container } from './index.style';
import React, { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  as?: string;
  asChild?: boolean;
}

export const Button: ForwardRefExoticComponent<PropsWithoutRef<ButtonProps> & RefAttributes<HTMLButtonElement>> =
  React.forwardRef<HTMLButtonElement, ButtonProps>(({ variant = 'primary', ...props }, ref) => {
    return <Container $variant={variant} ref={ref} {...props} />;
  });
