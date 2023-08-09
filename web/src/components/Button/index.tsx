import { ButtonVariant, Container } from "./index.style";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>  {
  children: React.ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  as?: string;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", disabled = false, ...props }, ref) => {
    return (
      <Container
        $variant={variant}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    )
  }
)
