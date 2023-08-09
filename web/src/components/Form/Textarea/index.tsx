import * as React from "react"
import { Container } from "./index.style"


export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea(props: TextareaProps) {
  return (
    <Container {...props} />
  )
}
