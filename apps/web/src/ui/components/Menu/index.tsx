import { Box, ScrollArea } from '@radix-ui/themes';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import cn from 'classnames';

interface MenuProps {
  children: ReactNode;
  visible: boolean
}

export function Menu({ children, visible }: MenuProps) {
  return (
    <Box className={cn(styles.container, { [styles.visible]: visible })}>
      <aside className={styles.aside}>
        <ScrollArea>
          <ScrollArea scrollbars="vertical">
            <Box p="4">{children}</Box>
          </ScrollArea>
        </ScrollArea>
      </aside>
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
    <NavLink
      to={to}
      className={({ isActive }) => `${styles.button} ${isActive ? styles.buttonActive : ''}`}
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
}
