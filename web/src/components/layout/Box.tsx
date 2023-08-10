import { CommonLayoutProps, CommonLetterProps, addLayoutProps, addLetterProps } from "@/styles/common";
import styled from "styled-components";

interface BoxProps extends CommonLayoutProps, CommonLetterProps {
  $bg: string;
}

export const Box = styled.div<BoxProps>(props => ({
  ...addLayoutProps(props),
  ...addLetterProps(props),
  ...(props.$bg && { backgroundColor: props.$bg }),
}))
