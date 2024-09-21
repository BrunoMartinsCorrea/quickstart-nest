import { ReactNode } from 'react';
import { Flex, Separator } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

interface HeaderProps {
  title?: ReactNode;
  children: ReactNode;
}

export function Header({ title, children }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Flex justify="between" align="center" width="100%" gap="4" p="4">
        {title && (
          <Link to="/" className={styles.headerLink}>
            {title}
          </Link>
        )}
        {children}
      </Flex>
      <Separator size="4" />
    </header>
  );
}
