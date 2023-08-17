import { styled } from 'styled-components';
import { darken, lighten } from 'polished';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive' | 'link';

const ButtonContainer = styled.button`
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  border-radius: ${(props) => props.theme.borderRadiusMD};
  cursor: pointer;
  font-weight: bold;
  line-height: 1.72;
  transition: background-color ${(props) => props.theme.transitionSpeed};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 1px solid ${(props) => darken(0.3, props.theme.outline)};
    outline-offset: 0.15rem;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const ButtonPrimary = styled(ButtonContainer)((props) => ({
  backgroundColor: props.theme.accent,
  color: props.theme.onAccent,
  '&:not(:disabled):hover': {
    backgroundColor: lighten(0.05, props.theme.accent),
  },
}));

export const ButtonSecondary = styled(ButtonContainer)((props) => ({
  backgroundColor: props.theme.surfaceDim,
  color: props.theme.text,
  '&:not(:disabled):hover': {
    backgroundColor: lighten(0.015, props.theme.surfaceDim),
  },
}));

export const ButtonOutline = styled(ButtonContainer)((props) => ({
  backgroundColor: 'transparent',
  color: props.theme.accent,
  borderColor: lighten(0.8, props.theme.accent),
  '&:not(:disabled):hover': {
    backgroundColor: lighten(0.875, props.theme.accent),
  },
}));

export const ButtonGhost = styled(ButtonContainer)((props) => ({
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  color: props.theme.text,
  '&:not(:disabled):hover': {
    backgroundColor: props.theme.surfaceDim,
  },
}));

export const ButtonDestructive = styled(ButtonContainer)((props) => ({
  backgroundColor: props.theme.destructive,
  color: props.theme.onDestructive,
  '&:not(:disabled):hover': {
    backgroundColor: lighten(0.05, props.theme.destructive),
  },
}));

export const ButtonLink = styled(ButtonContainer)((props) => ({
  backgroundColor: 'transparent',
  color: props.theme.accent,
  '&:not(:disabled):hover': {
    textDecoration: 'underline',
  },
}));
