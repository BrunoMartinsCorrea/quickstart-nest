import { Pagination } from '@/components/Pagination';
import { ColumnsVisibilityDropdown, TableRoot, TableRow } from '@/components/Table';
import { User } from '@/domain/user';
import { useStore } from '@/stores/useStore';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { Button, Checkbox, Flex, Heading, IconButton, Table } from '@radix-ui/themes';
import { PaginationState, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const column = createColumnHelper<User>();

export function Users() {
  const { t, i18n } = useTranslation();
  const users = useStore((state) => state.users);
  const getUsers = useStore((state) => state.getUsers);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 1,
  });
  const [rowSelection, setRowSelection] = useState({});

  const dateFormatter = useMemo(() => {
    return new Intl.DateTimeFormat(i18n.language);
  }, [i18n.language]);

  function toggleAllSelection(checked: boolean) {
    table.getRowModel().rows.forEach((row) => {
      row.toggleSelected(checked);
    });
  }

  const columns = useMemo(
    () => [
      column.display({
        id: 'select',
        enableHiding: false,
        header: ({ table }) => <Checkbox checked={table.getIsAllRowsSelected()} onCheckedChange={toggleAllSelection} />,
        cell: ({ row }) => {
          return (
            <Checkbox
              onCheckedChange={row.getToggleSelectedHandler()}
              disabled={!row.getCanSelect()}
              checked={row.getIsSelected()}
            />
          );
        },
      }),
      column.accessor('fullName', {
        header: t('users.schema.fullName'),
        cell: (info) => info.getValue(),
      }),
      column.accessor('email', {
        header: t('users.schema.email'),
        cell: (info) => info.getValue(),
      }),
      column.accessor('createdAt', {
        header: t('users.schema.createdAt'),
        cell: (info) => dateFormatter.format(info.getValue()),
      }),
      column.accessor('updatedAt', {
        header: t('users.schema.updatedAt'),
        cell: (info) => dateFormatter.format(info.getValue()),
      }),
      column.accessor('username', {
        header: t('users.schema.username'),
        cell: (info) => info.getValue(),
      }),
      column.accessor('id', {
        header: t('users.schema.id'),
        cell: (info) => info.getValue(),
      }),
      column.display({
        id: 'action',
        enableHiding: false,
        header: () => (
          <ColumnsVisibilityDropdown
            isAllColumnsVisible={table.getIsAllColumnsVisible()}
            onToggleAllColumnsVisibility={table.getToggleAllColumnsVisibilityHandler()}
            columns={table.getAllLeafColumns()}
          />
        ),
        cell: (info) => (
          <IconButton variant="ghost">
            <DotsVerticalIcon />
          </IconButton>
        ),
      }),
    ],
    [i18n.language]
  );

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const pageCount = useCallback(() => {
    const calc = users.limit ? users.totalCount / users.limit : 1;
    return calc < 1 ? 1 : calc;
  }, [users]);

  const table = useReactTable({
    data: users.results ?? [],
    columns,
    manualPagination: true,
    onPaginationChange: setPagination,
    pageCount: pageCount(),
    state: {
      pagination,
      rowSelection,
    },
    initialState: {
      columnVisibility: {
        username: false,
        updatedAt: false,
        id: false,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  function handlePageSizeChange(size: string) {
    setPagination((value) => ({ ...value, pageSize: Number(size) }));
  }

  useEffect(() => {
    getUsers({ page: pagination.pageIndex + 1, limit: pagination.pageSize });
  }, [pagination]);

  return (
    <Flex direction="column" gap="3">
      <Heading my="4">{t('users.title')}</Heading>
      <Flex justify="end" align="center" gap="4">
        <Button variant="solid">{t('actions.new')}</Button>
      </Flex>
      {!!users.results.length && (
        <TableRoot variant="surface">
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.ColumnHeaderCell key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </Table.ColumnHeaderCell>
                ))}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} isSelected={row.getIsSelected()}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Table.Cell>
                ))}
              </TableRow>
            ))}
          </Table.Body>
        </TableRoot>
      )}
      <Flex justify="end">
        <Pagination
          onFirstPage={() => table.setPageIndex(0)}
          onPrevious={() => table.previousPage()}
          onNext={() => table.nextPage()}
          onLastPage={() => table.setPageIndex(table.getPageCount() - 1)}
          hasPreviousPage={table.getCanPreviousPage()}
          hasNextPage={table.getCanNextPage()}
          onPageSizeChange={handlePageSizeChange}
          currentPage={table.getState().pagination.pageIndex + 1}
          totalPages={table.getPageCount()}
        />
      </Flex>
    </Flex>
  );
}
