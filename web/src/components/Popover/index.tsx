import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { StyledContent } from './index.style';

const Root = PopoverPrimitive.Root;
const Trigger = PopoverPrimitive.Trigger;

const Content = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    w?: string | number;
  }
>(({ className, align = 'center', w, sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <StyledContent ref={ref} align={align} sideOffset={sideOffset} $w={w} {...props} />
  </PopoverPrimitive.Portal>
));
Content.displayName = PopoverPrimitive.Content.displayName;

export { Root, Trigger, Content };
