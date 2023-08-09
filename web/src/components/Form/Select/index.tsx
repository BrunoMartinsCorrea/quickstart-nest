import * as SelectPrimitive from "@radix-ui/react-select"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { StyledContent, StyledItem, StyledLabel, StyledSeparator, StyledTrigger, StyledViewport } from "./index.style"
import React from "react"

const Root = SelectPrimitive.Root
const Group = SelectPrimitive.Group
const Value = SelectPrimitive.Value

const Trigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <StyledTrigger
    ref={ref}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <CaretSortIcon  />
    </SelectPrimitive.Icon>
  </StyledTrigger>
))
Trigger.displayName = SelectPrimitive.Trigger.displayName

interface ContentProps extends SelectPrimitive.SelectContentProps {}

function Content({children, position = 'popper', ...props}: ContentProps) {
  return (
    <SelectPrimitive.Portal>
      <StyledContent
        position={position}
        align="center"
        {...props}
      >
        <StyledViewport>
          {children}
        </StyledViewport>
      </StyledContent>
    </SelectPrimitive.Portal>
  )
}

interface LabelProps extends SelectPrimitive.SelectLabelProps {}

function Label(props: LabelProps) {
  return (
    <StyledLabel {...props} />
  )
}

interface ItemProps extends SelectPrimitive.SelectItemProps {}

function Item({children, ...props}: ItemProps) {
  return (
    <StyledItem {...props}>
      <span className="checkIcon">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon width="1rem" height="1rem" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </StyledItem>
  )
}

interface SeparatorProps extends SelectPrimitive.SelectSeparatorProps {}

function Separator(props: SeparatorProps) {
  return (
    <StyledSeparator />
  )
}

export {
  Root,
  Group,
  Value,
  Trigger,
  Content,
  Label,
  Item,
  Separator,
}
