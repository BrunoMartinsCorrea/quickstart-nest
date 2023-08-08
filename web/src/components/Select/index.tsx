import * as SelectPrimitive from "@radix-ui/react-select"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { StyledContent, StyledItem, StyledLabel, StyledSeparator, StyledTrigger, StyledViewport } from "./index.style"
import React from "react"

const Root = SelectPrimitive.Root
const Group = SelectPrimitive.Group
const Value = SelectPrimitive.Value

interface TriggerProps extends SelectPrimitive.SelectTriggerProps {}

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

// function Trigger({children, ...props}: TriggerProps) {
//   return (
//     <StyledTrigger {...props}>
//       {children}
//       <SelectPrimitive.Icon asChild>
//         <CaretSortIcon />
//       </SelectPrimitive.Icon>
//     </StyledTrigger>
//   )
// }


// const Content = React.forwardRef<
//   React.ElementRef<typeof SelectPrimitive.Content>,
//   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
// >(({ className, children, position = "popper", ...props }, ref) => (
//   <SelectPrimitive.Portal>
//     <SelectPrimitive.Content
//       ref={ref}
//       position={position}
//       // className={cn(
//       //   "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
//       //   position === "popper" &&
//       //     "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
//       //   className
//       // )}
//       {...props}
//     >
//       <StyledViewport
//         // className={cn(
//         //   "p-1",
//         //   position === "popper" &&
//         //     "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
//         // )}
//       >
//         {children}
//       </StyledViewport>
//     </SelectPrimitive.Content>
//   </SelectPrimitive.Portal>
// ))
// Content.displayName = SelectPrimitive.Content.displayName


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
