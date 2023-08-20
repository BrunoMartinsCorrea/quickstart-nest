import * as PrimitiveToast from '@radix-ui/react-toast';
import styles from './styles.module.css';
import { ReactNode } from 'react';
import { useToast } from '@/hooks/useToast';
import { Toast } from '.';

interface ToasterProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToasterProps) {
  const { toasts } = useToast();
  return (
    <PrimitiveToast.Provider>
      {children}
      {toasts.map((props) => (
        <Toast key={props.id} {...props} />
      ))}
      <PrimitiveToast.Viewport className={styles.viewport} />
    </PrimitiveToast.Provider>
  );
}
