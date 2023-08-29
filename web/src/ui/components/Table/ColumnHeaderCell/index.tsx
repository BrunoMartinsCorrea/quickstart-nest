import { CaretDownIcon, CaretSortIcon, CaretUpIcon } from '@radix-ui/react-icons';
import { Flex, Table } from '@radix-ui/themes';
import { HTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.css';

interface ColumnHeaderCellProps extends HTMLAttributes<HTMLTableHeaderCellElement> {
  onSort: ((event: unknown) => void) | undefined;
  children: ReactNode;
  sortDirection: string | null;
}

export function ColumnHeaderCell({ onSort, children, sortDirection, ...props }: ColumnHeaderCellProps) {
  if (onSort) {
    return (
      <Table.ColumnHeaderCell className={styles.sorting} {...props} onClick={onSort}>
        <Flex gap="2">
          {children}
          {sortDirection === 'asc' && <CaretUpIcon />}
          {sortDirection === 'desc' && <CaretDownIcon />}
          {!sortDirection && <CaretSortIcon />}
        </Flex>
      </Table.ColumnHeaderCell>
    );
  }

  return <Table.ColumnHeaderCell {...props}>{children}</Table.ColumnHeaderCell>;
}
