import { fadeInAnimation, fadeOutAnimation, scaleInAnimation, scaleOutAnimation } from '@/styles/global';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { styled, css } from 'styled-components';

interface StyledSubTriggerProps {
  $inset: boolean;
}

export const StyledSubTrigger = styled(DropdownMenuPrimitive.SubTrigger)<StyledSubTriggerProps>`
  display: flex;
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 0.375rem 0.5rem;
  font-size: ${(props) => props.theme.fontSize};

  &:hover {
    outline: none;
    background-color: ${(props) => props.theme.surfaceDim};
  }

  ${(props) =>
    props.$inset &&
    css`
      padding-left: 2rem;
    `}

  & > svg {
    margin-left: auto;
  }
`;

export const StyledSubContent = styled(DropdownMenuPrimitive.SubContent)`
  z-index: 50;
  min-width: 8rem;
  padding: 0.25rem;
  overflow: hidden;
  border-radius: ${(props) => props.theme.borderRadiusMD};
  border: 1px solid ${(props) => props.theme.outline};
  background-color: ${(props) => props.theme.surface};
  filter: ${(props) => props.theme.dropShadowLG};

  &[data-state='open'] {
    animation-name: ${fadeInAnimation}, ${scaleInAnimation};
    animation-duration: ${(props) => props.theme.transitionSpeed};
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }

  &[data-state='close'] {
    animation-name: ${fadeOutAnimation}, ${scaleOutAnimation};
    animation-duration: ${(props) => props.theme.transitionSpeed};
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }
`;

interface StyledContentProps {
  $w: string | number;
}

export const StyledContent = styled(DropdownMenuPrimitive.Content)<StyledContentProps>`
  z-index: 50;
  min-width: 8rem;
  padding: 0.25rem;
  overflow: hidden;
  border-radius: ${(props) => props.theme.borderRadiusMD};
  border: 1px solid ${(props) => props.theme.outline};
  background-color: ${(props) => props.theme.surface};
  filter: ${(props) => props.theme.dropShadowMD};
  width: ${(props) => (typeof props.$w === 'string' ? props.$w : `${props.$w}px`)};

  &[data-state='open'] {
    animation-name: ${fadeInAnimation}, ${scaleInAnimation};
    animation-duration: ${(props) => props.theme.transitionSpeed};
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }

  &[data-state='close'] {
    animation-name: ${fadeOutAnimation}, ${scaleOutAnimation};
    animation-duration: ${(props) => props.theme.transitionSpeed};
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }
`;

interface StyledItemProps {
  $inset: boolean;
}

export const StyledItem = styled(DropdownMenuPrimitive.Item)<StyledItemProps>`
  padding: 0.375rem 0.5rem;
  position: relative;
  display: flex;
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: ${(props) => props.theme.fontSize};
  transition: all ${(props) => props.theme.transitionSpeed};
  color: ${(props) => props.theme.text};

  &:hover {
    outline: none;
    background-color: ${(props) => props.theme.surfaceDim};
  }

  &:focus {
    background-color: ${(props) => props.theme.surfaceDim};
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  ${(props) =>
    props.$inset &&
    css`
      padding-left: 2rem;
    `}
`;

export const StyledCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem)`
  position: relative;
  display: flex;
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 0.375rem 0;
  padding-left: 2rem;
  padding-right: 0.5rem;
  font-size: ${(props) => props.theme.fontSize};
  transition: all ${(props) => props.theme.transitionSpeed};

  &:focus {
    background-color: ${(props) => props.theme.surfaceDim};
  }

  &:hover {
    outline: none;
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  & > span {
    position: absolute;
    left: 0.5rem;
    display: flex;
    height: 0.875rem;
    width: 0.875rem;
    align-items: center;
    justify-content: center;

    svg {
      width: 1rem;
      height: 1rem;
      margin-top: 0.185rem;
      align-self: center;
    }
  }
`;

export const StyledRadioItem = styled(DropdownMenuPrimitive.RadioItem)`
  position: relative;
  display: flex;
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 0.375rem 0;
  padding-left: 2rem;
  padding-right: 0.5rem;
  font-size: ${(props) => props.theme.fontSize};
  transition: all ${(props) => props.theme.transitionSpeed};

  &:focus {
    background-color: ${(props) => props.theme.surfaceDim};
  }

  &:hover {
    outline: none;
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  & > span {
    position: absolute;
    left: 0.5rem;
    display: flex;
    height: 0.875rem;
    width: 0.875rem;
    align-items: center;
    justify-content: center;
  }
`;

export const StyledLabel = styled(DropdownMenuPrimitive.Label)`
  padding: 0.375rem 0.5rem;
  font-size: ${(props) => props.theme.fontSize};
  font-weight: 500;
`;

export const StyledSeparator = styled(DropdownMenuPrimitive.Separator)`
  margin: 0.25rem -0.25rem;
  height: 1px;
  background-color: ${(props) => props.theme.surfaceDim};
`;

export const StyledShortcut = styled.span`
  letter-spacing: 0.1em;
  margin-left: auto;
  font-size: calc(${(props) => props.theme.fontSize} - 2px);
  opacity: 0.6;
`;
