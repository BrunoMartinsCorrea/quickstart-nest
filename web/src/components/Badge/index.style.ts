import { styled, css } from 'styled-components';
import { lighten } from 'polished';

type VariantOptions = 'primary' | 'secondary' | 'outline';

interface BadgeContainerProps {
  $variant: VariantOptions;
}

export const BadgeContainer = styled.div<BadgeContainerProps>`
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  padding: 0.125rem 0.625rem;
  font-weight: 500;
  font-size: calc(${(props) => props.theme.fontSize} - 2px);
  transition: background-color border-color ${(props) => props.theme.transitionSpeed};
  border: 1px solid transparent;
  background-color: ${(props) => props.theme.accent};
  color: ${(props) => props.theme.surface};

  ${(props) =>
    props.$variant === 'primary' &&
    css`
      &:hover {
        background-color: ${(props) => lighten(0.1, props.theme.accent)};
      }
    `}

  ${(props) =>
    props.$variant === 'outline' &&
    css`
      border-color: ${props.theme.outline};
      background-color: ${props.theme.surface};
      color: ${props.theme.text};
    `}

  ${(props) =>
    props.$variant === 'secondary' &&
    css`
      border-color: ${props.theme.surfaceDim};
      background-color: ${props.theme.surfaceDim};
      color: ${props.theme.text};
    `}
`;
