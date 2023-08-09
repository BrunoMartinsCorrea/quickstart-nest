import styled, { css } from "styled-components";
import * as SelectPrimitive from "@radix-ui/react-select"
import { fadeInAnimation, fadeOutAnimation, scaleInAnimation, scaleOutAnimation } from "@/styles/global";

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
    animation-name: ${fadeInAnimation}, ${scaleInAnimation};
    animation-duration: ${props => props.theme.transitionSpeed};
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }

  &[data-state=close] {
    animation-name: ${fadeOutAnimation}, ${scaleOutAnimation};
    animation-duration: ${props => props.theme.transitionSpeed};
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
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


