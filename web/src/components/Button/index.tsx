import {
  ButtonVariant,
  ButtonPrimary,
  ButtonSecondary,
  ButtonOutline,
  ButtonGhost,
  ButtonDestructive,
  ButtonLink,
} from './index.style';
import React, { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  as?: string;
  asChild?: boolean;
}

export const Button: ForwardRefExoticComponent<PropsWithoutRef<ButtonProps> & RefAttributes<HTMLButtonElement>> =
  React.forwardRef<HTMLButtonElement, ButtonProps>(({ variant = 'primary', ...props }, ref) => {
    switch (variant) {
      case 'secondary':
        return <ButtonSecondary ref={ref} {...props} />;
      case 'outline':
        return <ButtonOutline ref={ref} {...props} />;
      case 'ghost':
        return <ButtonGhost ref={ref} {...props} />;
      case 'destructive':
        return <ButtonDestructive ref={ref} {...props} />;
      case 'link':
        return <ButtonLink ref={ref} {...props} />;
      default:
        return <ButtonPrimary ref={ref} {...props} />;
    }
  });
