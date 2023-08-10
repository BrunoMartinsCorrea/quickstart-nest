import { styled, css } from 'styled-components';
import { lighten } from 'polished';

type VariantOptions = 'primary' | 'secondary' | 'outline';

interface ContainerProps {
  $variant: VariantOptions;
}

export const Container = styled.div<ContainerProps>`
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  padding: 0.125rem 0.625rem;
  font-weight: 500;
  font-size: calc(${(props) => props.theme.fontSize} - 2px);
  transition: background-color border-color ${(props) => props.theme.transitionSpeed};
  border: 1px solid ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.background};

  ${(props) =>
    props.$variant === 'primary' &&
    css`
      &:hover {
        background-color: ${(props) => lighten(0.1, props.theme.primary)};
      }
    `}

  ${(props) =>
    props.$variant === 'outline' &&
    css`
      border: 1px solid ${props.theme.border};
      background-color: ${props.theme.background};
      color: ${props.theme.text};
    `}

  ${(props) =>
    props.$variant === 'secondary' &&
    css`
      border: 1px solid ${props.theme.mutedBackground};
      background-color: ${props.theme.mutedBackground};
      color: ${props.theme.text};
    `}
`;
