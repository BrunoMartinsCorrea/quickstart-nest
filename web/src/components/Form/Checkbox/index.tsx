import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { CheckIcon } from "@radix-ui/react-icons"
import { StyledIndicator, StyledRoot } from "./index.style"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <StyledRoot ref={ref} {...props}>
    <StyledIndicator>
      <CheckIcon width="1rem" height="1rem" />
    </StyledIndicator>
  </StyledRoot>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
