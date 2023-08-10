import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { StyledRadioGroup, StyledRadioIndicator, StyledRadioItem } from './index.style';

const Group = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ children, ...props }, ref) => {
  return (
    <StyledRadioGroup {...props} ref={ref}>
      {children}
    </StyledRadioGroup>
  );
});
Group.displayName = RadioGroupPrimitive.Root.displayName;

const Item = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ ...props }, ref) => {
  return (
    <StyledRadioItem ref={ref} {...props}>
      <StyledRadioIndicator>
        <div />
      </StyledRadioIndicator>
    </StyledRadioItem>
  );
});

Item.displayName = RadioGroupPrimitive.Item.displayName;

export { Group, Item };
