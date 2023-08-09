import styled from "styled-components";

export type AlignOptions = 'baseline' | 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'stretch' | 'self-start' | 'self-end';
export type JustifyOptions = AlignOptions | 'space-around' | 'space-evenly' | 'space-between';
export type DirectionOptions = 'column' | 'row' | 'column-reverse' | 'row-reverse';

interface ContainerProps {
  direction: DirectionOptions;
  $gap: string | number;
  $align: AlignOptions,
  $justify: JustifyOptions,
  $flex?: string | number,
  $wrap: boolean,
  $width?: string | number,
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: ${props => props.direction};
  gap: ${props => typeof props.$gap == 'string' ? props.$gap : `${props.$gap}rem`};
  align-items: ${props => props.$align};
  justify-content: ${props => props.$justify};
  flex-wrap: ${props => props.$wrap ? 'wrap' : 'nowrap'};
  flex: ${props => props.$flex};
  width: ${props => props.$width};
`;
