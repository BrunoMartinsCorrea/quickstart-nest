import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { styled } from 'styled-components';

export const StyledRoot = styled(CheckboxPrimitive.Root)`
  height: 1rem;
  width: 1rem;
  flex-shrink: 0;
  border: 1px solid ${(props) => props.theme.outline};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:disabled ~ label {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &[data-state='checked'] {
    background-color: ${(props) => props.theme.accent};
    color: ${(props) => props.theme.onAccent};
  }
`;

export const StyledIndicator = styled(CheckboxPrimitive.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
