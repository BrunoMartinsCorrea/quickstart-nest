import { HTMLAttributes } from "react";
import { AlignOptions, Container, DirectionOptions, JustifyOptions } from "./index.style";

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: DirectionOptions;
  align?: AlignOptions,
  justify?: JustifyOptions,
  gap?: string | number;
  flex?: string | number;
  wrap?: boolean;
  width?: string | number;
}

export function Flex({
  direction = 'row',
  gap = '0px',
  align='flex-start',
  justify='flex-start',
  wrap = false,
  width,
  flex,
  children,
  ...props
}: FlexProps) {
  return (
    <Container
      direction={direction}
      $gap={gap}
      $align={align}
      $justify={justify}
      $flex={flex}
      $wrap={wrap}
      $width={width}
      {...props}
    >
      {children}
    </Container>
  );
}
