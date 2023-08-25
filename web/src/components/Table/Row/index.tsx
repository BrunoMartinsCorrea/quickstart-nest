import { Table } from '@radix-ui/themes';
import { HTMLAttributes } from 'react';
import styles from './styles.module.css';

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  isSelected: boolean;
}
export function TableRow({ isSelected, ...props }: TableRowProps) {
  return <Table.Row className={`${styles.row} ${isSelected ? styles.selected : ''}`} {...props} />;
}
