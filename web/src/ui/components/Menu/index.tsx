import { Box, ScrollArea } from '@radix-ui/themes';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';

interface MenuProps {
  children: ReactNode;
}

export function Menu({ children }: MenuProps) {
  return (
    <Box className={styles.container}>
      <ScrollArea scrollbars="vertical">
        <Box p="4">{children}</Box>
      </ScrollArea>
    </Box>
  );
}

interface MenuButtonProps {
  children: ReactNode;
  to: string;
  onClick?: () => void;
}

export function MenuItem({ to, onClick, children }: MenuButtonProps) {
  return (
    <NavLink to={to} className={({ isActive }) => `${styles.button} ${isActive ? styles.buttonActive : ''}`}>
      {children}
    </NavLink>
  );
}
