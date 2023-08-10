import { styled } from 'styled-components';

interface BodyTextProps {
  textAlign?: 'left' | 'right' | 'center';
}

export const BodyText = styled.p<BodyTextProps>`
  line-height: 1.25rem;
  text-align: ${(props) => props.textAlign ?? 'left'};
  color: ${(props) => props.theme.mutedText};
`;
