import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { StyledRoot, StyledThumb } from './index.style';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <StyledRoot {...props} ref={ref}>
    <StyledThumb />
  </StyledRoot>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
