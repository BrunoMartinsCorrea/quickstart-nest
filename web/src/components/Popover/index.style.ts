import styled from 'styled-components';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { fadeInAnimation, fadeOutAnimation, scaleInAnimation, scaleOutAnimation } from '@/styles/global';

interface StyledContentProps {
  $w: string | number;
}

export const StyledContent = styled(PopoverPrimitive.Content)<StyledContentProps>((props) => ({
  zIndex: 50,
  padding: '0.25rem',
  width: props.$w ?? '72px',
  border: `1px solid ${props.theme.outline}`,
  borderRadius: props.theme.borderRadiusMD,
  backgroundColor: props.theme.surface,
  filter: props.theme.dropShadowLG,
  outline: 'none',
  animationDuration: props.theme.transitionSpeed,
  animationTimingFunction: 'ease-in-out',
  animationFillMode: 'forwards',
  '&[data-state=open]': {
    animationName: `${fadeInAnimation.getName()}, ${scaleInAnimation.getName()}`,
  },
  '&[data-state=close]': {
    animationName: `${fadeOutAnimation.getName()}, ${scaleOutAnimation.getName()}`,
  },
}));
