import * as React from "react"
import { Container } from "./index.style";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>{
  variant?: 'primary' | 'secondary' | 'outline';
}

export function Badge({variant = 'primary', children, ...props}: BadgeProps) {
  return (
    <Container $variant={variant} {...props}>
      {children}
    </Container>
  )
}
