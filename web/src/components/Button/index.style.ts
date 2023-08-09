import styled, { css } from "styled-components";
import { lighten } from 'polished';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive' | 'link';

interface ContainerProps {
  $variant: ButtonVariant;
  disabled: boolean;
}

export const Container = styled.button<ContainerProps>`
  border: 0;
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadiusMD};
  cursor: pointer;
  font-weight: bold;
  line-height: 1.4;
  transition: background-color ${props => props.theme.transitionSpeed};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-sizing: border-box;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${({ $variant, ...props }) => $variant == 'primary' && css`
    background-color: ${props.theme.primary};
    color: ${props.theme.onPrimary};

    &:hover {
      background-color: ${lighten(0.05, props.theme.primary)};
    }
  `}

  ${({ $variant, ...props }) => $variant == 'destructive' && css`
    background-color: ${props.theme.destructive};
    color: ${props.theme.onDestructive};

    &:hover {
      background-color: ${lighten(0.05, props.theme.destructive)};
    }
  `}

  ${({ $variant, ...props }) => $variant == 'outline' && css`
    background-color: transparent;
    color: ${props.theme.primary};
    border: 1px solid ${lighten(0.80, props.theme.primary)};

    &:hover {
      background-color: ${lighten(0.875, props.theme.primary)};
    }
  `}

  ${({$variant, ...props}) => $variant == 'link' && css`
    background-color: transparent;
    color: ${props.theme.primary};

    &:hover {
      text-decoration: underline;
    }
  `}

  ${({ $variant, ...props }) => $variant == 'secondary' && css`
    background-color: ${props.theme.mutedBackground};
    color: ${props.theme.text};
    border: 1px solid ${lighten(0.80, props.theme.mutedBackground)};

    &:hover {
      background-color: ${lighten(0.1, props.theme.mutedBackground)};
    }
  `}


  ${({ $variant, ...props }) => $variant == 'ghost' && css`
    background-color: ${props => props.theme.background};
    color: ${props.theme.text};
    border: 1px solid ${props => props.theme.background};

    &:hover {
      background-color: ${props.theme.mutedBackground};
    }
  `}
`;
