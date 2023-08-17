import { styled } from 'styled-components';

interface BodyTextProps {
  textAlign?: 'left' | 'right' | 'center';
}

export const BodyText = styled.p<BodyTextProps>((props) => ({
  lineHeight: '1.25rem',
  textAlign: props.textAlign ?? 'left',
  color: props.theme.caption,
}));
