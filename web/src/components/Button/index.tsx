import { HtmlHTMLAttributes, ReactNode } from "react";
import { ButtonVariant, Container } from "./index.style";

interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement>  {
  children: ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  as?: string;
}

export function Button({
  variant = 'primary',
  disabled = false,
  children,
  ...props
}: ButtonProps) {
  return <Container variant={variant} {...props} disabled={disabled}>
    {children}
  </Container>;
}
