import * as React from 'react';
import {
  CardContainer,
  CardContainerContent,
  CardContainerFooter,
  CardContainerHeader,
  CardContainerProps,
} from './index.style';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

function Root({ children, ...props }: CardContainerProps & React.HTMLAttributes<HTMLDivElement>) {
  return <CardContainer {...props}>{children}</CardContainer>;
}

function Header({ children }) {
  return <CardContainerHeader>{children}</CardContainerHeader>;
}

function Content({ children }: CardProps) {
  return <CardContainerContent>{children}</CardContainerContent>;
}

function Footer({ children }) {
  return <CardContainerFooter>{children}</CardContainerFooter>;
}

export { Root, Header, Content, Footer };
