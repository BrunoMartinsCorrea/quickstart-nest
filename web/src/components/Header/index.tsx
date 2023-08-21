import { Flex, Separator } from '@radix-ui/themes';
import styles from './styles.module.css';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title?: ReactNode;
  children: ReactNode;
}

export function Header({ title, children }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Flex justify="between" align="center" width="100%" gap="4" p="4">
        {title && (
          <Link to="/home" className={styles.headerLink}>
            {title}
          </Link>
        )}
        {children}
      </Flex>
      <Separator size="4" />
    </header>
  );
}
