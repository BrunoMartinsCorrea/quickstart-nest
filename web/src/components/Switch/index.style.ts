import styled from "styled-components";
import * as SwitchPrimitives from "@radix-ui/react-switch"

// "peer inline-flex h-[20px]
// focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
// focus-visible:ring-offset-2 focus-visible:ring-offset-background
//  data-[state=unchecked]:bg-input",
export const StyledRoot = styled(SwitchPrimitives.Root)`
  display: inline-flex;
  width: 36px;
  align-items: center;
  border-radius: 9999px;
  border: 2px solid transparent;
  flex-shrink: 0;
  cursor: pointer;
  filter: ${props => props.theme.dropShadowSM};
	transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: ${props => props.theme.transitionSpeed};

  &[data-state=checked] {
    background-color: ${props => props.theme.primary};
  }

  &[data-state=unchecked] {
    background-color: ${props => props.theme.mutedBackground};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
/* "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0
transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0" */

export const StyledThumb = styled(SwitchPrimitives.Thumb)`
  display: block;
  height: 1rem;
  width: 1rem;
  border-radius: 9999px;
  background-color: ${props => props.theme.background};
  filter: ${props => props.theme.dropShadowLG};
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: ${props => props.theme.transitionSpeed};
  pointer-events: none;
  box-shadow: 0;

  &[data-state=checked] {
    transform: translateX(1rem);
  }

  &[data-state=unchecked] {
    transform: translateX(0);
  }
`;
