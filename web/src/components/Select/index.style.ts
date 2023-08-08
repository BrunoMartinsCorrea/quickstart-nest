import styled, { keyframes, css } from "styled-components";
import * as SelectPrimitive from "@radix-ui/react-select"

export const StyledTrigger = styled(SelectPrimitive.Trigger)`
  display: flex;
  height: 2.5rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-radius: ${props => props.theme.borderRadiusMD};
  border: 1px solid ${props => props.theme.border};
  background-color: ${props => props.theme.background};
  padding: 0.5rem 0.75rem;

  &:placeholder {
    color: ${props => props.theme.mutedText};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  & > span > svg {
    width: 1rem;
    height: 1rem;
    opacity: 0.5;
  }
`;

/*
className={cn(
  "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover
  text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out
  data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95
  data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
  data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  position === "popper" &&
    "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1
    data-[side=top]:-translate-y-1",
)}
*/
const enter = keyframes`
  from {
    opacity: 0;
    transform: scale(0.7);

    bottom: 0;
    /* left: 0; */
    /* transform: rotate(0deg); */
  }
  to {
    opacity: 1;
    transform: scale(1);
    bottom: 0;
    /* left: 2rem; */
    /* transform: rotate(360deg); */
  }
`;

const exit = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.7);
  }
`;

// export const Container = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   animation: ${spin} 1s linear infinite;
// `;

export const StyledContent = styled(SelectPrimitive.Content)`
  position: relative;
  z-index: 50;
  min-width: 16rem;
  width: 100%;
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadiusMD};
  border: 1px solid ${props => props.theme.border};
  background-color: ${props => props.theme.background};
  filter: ${props => props.theme.dropShadowMD};
  transition: all ${props => props.theme.transitionSpeed};

  &[data-state=open] {
    animation: ${enter} ${props => props.theme.transitionSpeed} ease-in-out forwards;
  }
  &[data-state=close] {
    animation: ${exit} ${props => props.theme.transitionSpeed} ease-in-out forwards;
  }

  ${props => props.position === 'popper' && css`
    &[data-side=bottom] {
      transform: translateY(0.25rem);
    }

    &[data-side=left] {
      transform: -translateX(0.25rem);
    }

    &[data-side=right] {
      transform: translateX(0.25rem);
    }

    &[data-side=top] {
      transform: -translateY(0.25rem);
    }
  `}
`;

export const StyledViewport = styled(SelectPrimitive.Viewport)`
  padding: 1rem;
`;

export const StyledLabel = styled(SelectPrimitive.Label)`
  padding: 0.375rem 0;
  padding-left: 0.55rem;
  padding-right: 0.5rem;
  font-weight: 500;
`;

export const StyledItem = styled(SelectPrimitive.Item)`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  cursor: default;
  padding: 0.5rem 0;
  padding-left: 2rem;
  border-radius: ${props => props.theme.borderRadiusMD};
  padding-right: 0.5rem;
  user-select: none;
  color: ${props => props.theme.text};

  &:focus {
    background-color: ${props => props.theme.mutedBackground};
    outline: none;
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  & .checkIcon {
    position: absolute;
    left: 0.5rem;
    display: flex;
    height: 0.875rem;
    width: 0.875rem;
    align-items: center;
    justify-content: center;
  }
`;

export const StyledSeparator = styled(SelectPrimitive.Separator)`
  margin: 0.25rem;
  height: 1px;
  background-color: ${props => props.theme.mutedBackground};
`;


