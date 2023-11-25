import * as Dialog from '@radix-ui/react-dialog';
import { Box, Flex, ScrollArea, Text } from '@radix-ui/themes';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ReactElement, ReactNode } from 'react';
import styles from './styles.module.css';

interface HeaderProps {
  title: string;
  description?: string;
}

function Header({ title, description }: HeaderProps) {
  return (
    <>
      <Dialog.Title className={styles.title}>{title}</Dialog.Title>
      {description && (
        <Dialog.Description asChild>
          <Text className={styles.description} color="gray" size="2">
            {description}
          </Text>
        </Dialog.Description>
      )}
    </>
  );
}

interface FooterProps {
  children: ReactNode;
}

const Footer = (props: FooterProps) => <div className={styles.footer} {...props} />;

interface ContentProps {
  children: ReactNode;
}

const Content = (props: ContentProps) => <Box mb="9" {...props} />;

interface RootProps extends Dialog.DialogProps {
  trigger?: ReactElement;
  children: ReactNode;
}

function Root({ trigger, children, ...props }: RootProps) {
  const container = document.getElementById('main-theme');

  return (
    <Dialog.Root {...props}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal container={container}>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <ScrollArea>
            <Flex direction="column" px="4" pb="4">
              <Dialog.Close className={styles.close}>
                <Cross2Icon />
              </Dialog.Close>
              {children}
            </Flex>
          </ScrollArea>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export { Root, Header, Content, Footer };
