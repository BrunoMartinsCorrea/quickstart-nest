import { ReactNode } from "react";
import { Flex } from "../Flex";

interface CenterProps {
  children?: ReactNode;
}

export function Center({children}: CenterProps) {
  return (
    <Flex align="center" justify="center">
      {children}
    </Flex>
  )
}
