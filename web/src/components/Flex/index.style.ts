import styled from "styled-components";

export type AlignOptions = 'baseline' | 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'stretch' | 'self-start' | 'self-end';
export type JustifyOptions = AlignOptions | 'space-around' | 'space-evenly' | 'space-between';
export type DirectionOptions = 'column' | 'row' | 'column-reverse' | 'row-reverse';

interface ContainerProps {
  direction: DirectionOptions;
  gap: string;
  align: AlignOptions,
  justify: JustifyOptions,
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: ${props => props.direction};
  gap: ${props => props.gap};
  align-items: ${props => props.align};
  justify-content: ${props => props.theme.justify};
`;
