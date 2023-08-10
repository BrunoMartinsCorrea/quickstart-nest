import { styled } from 'styled-components';
import * as TabsPrimitive from '@radix-ui/react-tabs';

export const StyledPrimitiveRoot = styled(TabsPrimitive.Root)<{ width?: string }>`
  width: 100%;
  max-width: ${(props) => props.width};
`;

export const StyledPrimitiveList = styled(TabsPrimitive.List)`
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.mutedBackground};
`;

export const StyledPrimitiveTrigger = styled(TabsPrimitive.Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: calc(${(props) => props.theme.borderRadius} - 2px);
  padding: 0.375rem 0.75rem;
  border: 0;
  cursor: pointer;
  font-weight: 500;
  width: auto;
  background-color: transparent;
  width: 100%;
  transition-property: all;
  transition-duration: ${(props) => props.theme.transitionSpeed};

  &:focus {
    outline: none;
  }

  &[data-state='active'] {
    background-color: ${(props) => props.theme.background};
    filter: ${(props) => props.theme.dropShadowSM};
  }
`;

export const StyledPrimitiveContent = styled(TabsPrimitive.Content)`
  &:focus {
    outline: none;
  }

  margin-top: 0.5rem;
`;
