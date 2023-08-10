import { addLayoutProps, CommonLayoutProps } from '@/styles/common';
import { HTMLAttributes } from 'react';
import styled from 'styled-components';

export type AlignOptions =
  | 'baseline'
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'stretch'
  | 'self-start'
  | 'self-end';
export type JustifyOptions = AlignOptions | 'space-around' | 'space-evenly' | 'space-between';
export type DirectionOptions = 'column' | 'row' | 'column-reverse' | 'row-reverse';

export interface FlexProps extends CommonLayoutProps, HTMLAttributes<HTMLDivElement> {
  $dir?: DirectionOptions;
  $gap?: string | number;
  $align?: AlignOptions;
  $justify?: JustifyOptions;
  $wrap?: boolean;
}

export const Flex = styled.div<FlexProps>((props) => ({
  display: 'flex',
  flexDirection: props.$dir ?? 'row',
  ...(props.$gap && { gap: typeof props.$gap === 'string' ? props.$gap : `${props.$gap}rem` }),
  ...(props.$align && { alignItems: props.$align }),
  ...(props.$justify && { justifyContent: props.$justify }),
  flexWrap: props.$wrap ? 'wrap' : 'nowrap',
  ...addLayoutProps(props),
})) as React.ForwardRefExoticComponent<React.PropsWithoutRef<FlexProps> & React.RefAttributes<HTMLDivElement>>;
