import styled from 'styled-components';

interface StyledLabelProps {
  $size: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
}

export const StyledLabel = styled.label<StyledLabelProps>`
  font-size: var(--font-size-${(props) => props.$size});
  line-height: var(--line-height-${(props) => props.$size});
  letter-spacing: var(--letter-spacing-${(props) => props.$size});
  font-weight: var(--font-weight-medium);
`;
