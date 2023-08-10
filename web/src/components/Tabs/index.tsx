import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import {
  StyledPrimitiveContent,
  StyledPrimitiveList,
  StyledPrimitiveRoot,
  StyledPrimitiveTrigger,
} from './index.style';

const Root = StyledPrimitiveRoot;

const List = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>((props, ref) => {
  return <StyledPrimitiveList ref={ref} {...props} />;
});

List.displayName = TabsPrimitive.List.displayName;

const Trigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>((props, ref) => <StyledPrimitiveTrigger ref={ref} {...props} />);

Trigger.displayName = TabsPrimitive.Trigger.displayName;

const Content = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>((props, ref) => <StyledPrimitiveContent ref={ref} {...props} />);
Content.displayName = TabsPrimitive.Content.displayName;

export { Root, List, Trigger, Content };
