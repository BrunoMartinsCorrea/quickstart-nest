import * as React from 'react';
import { Container, ContainerContent, ContainerFooter, ContainerHeader, ContainerProps } from './index.style';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

function Root({ children, ...props }: ContainerProps & React.HTMLAttributes<HTMLDivElement>) {
  return <Container {...props}>{children}</Container>;
}

function Header({children}) {
  return (
    <ContainerHeader>
      {children}
    </ContainerHeader>
  );
}

function Content({ children }: CardProps) {
  return <ContainerContent>{children}</ContainerContent>;
}

function Footer({ children }) {
  return <ContainerFooter>{children}</ContainerFooter>;
}

export { Root, Header, Content, Footer };
