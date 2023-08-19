import * as Toast from '@radix-ui/react-toast';
import styles from './styles.module.css';
import { ReactNode } from 'react';

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <Toast.Provider>
      {children}
      <Toast.Viewport className={styles.viewport} />
    </Toast.Provider>
  );
}
