import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

// className={cn(
//       "peer h-4 w-4 shrink-0 rounded-sm border border-primary
//ring-offset-background
//focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring

// focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
// data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
//       className
//     )}

import styled from "styled-components";

export const StyledRoot = styled(CheckboxPrimitive.Root)`
  height: 1rem;
  width: 1rem;
  flex-shrink: 0;
  border: 1px solid ${props => props.theme.border};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &[data-state=checked] {
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.onPrimary};
  }
`;

export const StyledIndicator = styled(CheckboxPrimitive.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
