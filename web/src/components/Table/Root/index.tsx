import { Table as RadixTable } from '@radix-ui/themes';
import styles from './styles.module.css';

interface TableRootProps {
  variant?: 'ghost' | 'surface';
  children: React.ReactNode;
}

export function TableRoot({ children, ...props }: TableRootProps) {
  return (
    <RadixTable.Root className={styles.table} {...props}>
      {children}
    </RadixTable.Root>
  );
}
