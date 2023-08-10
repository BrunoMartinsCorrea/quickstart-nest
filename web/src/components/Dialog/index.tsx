import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  StyledClose,
  StyledContent,
  StyledContentProps,
  StyledDescription,
  StyledFooter,
  StyledHeader,
  StyledOverlay,
  StyledTitle,
} from './index.style';
import { Cross1Icon } from '@radix-ui/react-icons';

const Root = DialogPrimitive.Root;
const Trigger = DialogPrimitive.Trigger;

interface ContentProps extends DialogPrimitive.DialogContentProps, StyledContentProps {}

function Content({ children, $maxW = '450px', ...props }: ContentProps) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>
        {children}
        <StyledClose>
          <Cross1Icon width="1rem" height="1rem" />
          <span>Close</span>
        </StyledClose>
      </StyledContent>
    </DialogPrimitive.Portal>
  );
}

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

function Header({ children, ...props }: HeaderProps) {
  return <StyledHeader {...props}>{children}</StyledHeader>;
}

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

function Footer({ children, ...props }: FooterProps) {
  return <StyledFooter {...props}>{children}</StyledFooter>;
}

interface TitleProps extends DialogPrimitive.DialogTitleProps {}

function Title({ children, ...props }: TitleProps) {
  return <StyledTitle {...props}>{children}</StyledTitle>;
}

interface DescriptionProps extends DialogPrimitive.DialogDescriptionProps {}

function Description({ children, ...props }: DescriptionProps) {
  return <StyledDescription {...props}>{children}</StyledDescription>;
}

export { Root, Trigger, Content, Header, Footer, Title, Description };
