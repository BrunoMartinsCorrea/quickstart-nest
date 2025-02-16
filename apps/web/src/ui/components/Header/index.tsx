import { ReactNode } from 'react';
import { Box, Flex, Separator } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

interface HeaderProps {
  title?: ReactNode;
  children: ReactNode;
}

export function Header({ title, children }: HeaderProps) {
  return (
    <Box height="40px">
      <header className={styles.header}>
        <Flex justify="between" align="center" width="100%" gap="4" py="2" px="4">
          {title && (
            <Link to="/" className={styles.headerLink}>
              {title}
            </Link>
          )}
          {children}
        </Flex>
        <Separator size="4" />
      </header>
    </Box>
  );
}
