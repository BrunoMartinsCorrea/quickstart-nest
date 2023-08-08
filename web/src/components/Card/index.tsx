import * as React from "react"
import { Container, ContainerContent, ContainerFooter, ContainerHeader } from "./index.style"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
interface RootProps extends CardProps {
  width?: string
}

function Root({children, ...props}: RootProps) {
  return (
    <Container {...props}>
      {children}
    </Container>
  )
}

function Header({ children, ...props }: CardProps) {
  return (
    <ContainerHeader {...props}>
      {children}
    </ContainerHeader>
  )
}

function Content({children}: CardProps) {
  return (
    <ContainerContent>
      {children}
    </ContainerContent>
  )
}

function Footer({children}: CardProps) {
  return (
    <ContainerFooter>
      {children}
    </ContainerFooter>
  )
}

export { Root, Header, Content, Footer }
