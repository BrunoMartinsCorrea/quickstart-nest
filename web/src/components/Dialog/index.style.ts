import * as DialogPrimitive from '@radix-ui/react-dialog';
import { styled, keyframes, css } from 'styled-components';
import { fadeInAnimation, fadeOutAnimation } from '@/styles/global';

export const overlayFadeInAnimation = keyframes`
  from { opacity: 0 }
  to { opacity:  0.8 }
`;

export const StyledOverlay = styled(DialogPrimitive.Overlay)`
  position: fixed;
  inset: 0px;
  z-index: 50px;
  background-color: ${(props) => props.theme.background};
  backdrop-filter: blur(4px);

  &[data-state='open'] {
    animation: ${overlayFadeInAnimation} ${(props) => props.theme.transitionSpeed} forwards;
  }
`;

export interface StyledContentProps {
  $maxW?: string;
}

export const StyledContent = styled(DialogPrimitive.Content)<StyledContentProps>`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 50px;
  display: grid;
  width: 100%;
  max-width: 32rem;
  transform: translateX(-50%) translateY(-50%);
  gap: 1rem;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadiusMD};
  background-color: ${(props) => props.theme.background};
  padding: 1.5rem;
  filter: ${(props) => props.theme.dropShadowLG};
  transition-duration: 200ms;

  ${props => props.$maxW && css`
    max-width: ${props.$maxW}
  `};

  &[data-state='open'] {
    animation: ${fadeInAnimation} ${(props) => props.theme.transitionSpeed} ease-in-out forwards;
  }
  &[data-state='close'] {
    animation: ${fadeOutAnimation} ${(props) => props.theme.transitionSpeed} ease-in-out forwards;
  }
`;

export const StyledClose = styled(DialogPrimitive.Close)`
  position: absolute;
  right: 1rem;
  background-color: transparent;
  top: 1rem;
  border-radius: ${(props) => props.theme.borderRadius};
  border: 0;
  opacity: 0.7;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  transition-property: opacity;
  transition-duration: ${(props) => props.theme.transitionSpeed};

  &:disabled {
    pointer-events: none;
  }

  &[data-state='open'] {
    color: ${(props) => props.theme.mutedText};
  }

  & > span {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.375rem 0;
  text-align: start;
`;

export const StyledFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0.375rem 0;
  text-align: center;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    flex-direction: row;
    justify-content: end;
    margin: 0 0.5rem;
  }
`;

export const StyledTitle = styled(DialogPrimitive.Title)`
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.025em;
`;

export const StyledDescription = styled(DialogPrimitive.Description)`
  color: ${(props) => props.theme.mutedText};
  margin-top: 0.375rem;
  line-height: 1.25rem;
`;
