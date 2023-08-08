import { HTMLAttributes } from "react";
import { AlignOptions, Container, DirectionOptions, JustifyOptions } from "./index.style";

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: DirectionOptions;
  align?: AlignOptions,
  justify?: JustifyOptions,
  gap?: string;
}

export function Flex({
  direction = 'row',
  gap = '0px',
  align='flex-start',
  justify='flex-start',
  children,
  ...props
}: FlexProps) {
  return (
    <Container
      direction={direction}
      gap={gap}
      align={align}
      justify={justify}
      {...props}
    >
      {children}
    </Container>
  );
}
