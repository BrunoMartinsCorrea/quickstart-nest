import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { User } from '@/domain/user';
import { Pagination } from '~/components/Pagination';
import { ColumnHeaderCell, ColumnsVisibilityDropdown, TableRoot, TableRow } from '~/components/Table';
import { Button, Checkbox, ContextMenu, DropdownMenu, Flex, Heading, IconButton, Table } from '@radix-ui/themes';
import {
  PaginationState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import { DeleteDialog } from '../components/DeleteDialog';
import i18next from 'i18next';
import { useDeleteDialog, useGetUsers } from '../hooks';
import { produce } from 'immer';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '~/components/Spinner';

const column = createColumnHelper<User>();

const defaultPagination: PaginationState = {
  pageIndex: 0,
  pageSize: 1,
};

export function UsersList() {
  const { t, i18n } = useTranslation('users');
  const getUsers = useGetUsers();
  const deleteDialog = useDeleteDialog();
  const [pagination, setPagination] = useState<PaginationState>(() => defaultPagination);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const dateFormatter = useMemo(() => new Intl.DateTimeFormat(i18n.language), [i18n.language]);

  const hasSelection = JSON.stringify(rowSelection) !== '{}';

  function toggleAllSelection(checked: boolean) {
    table.getRowModel().rows.forEach((row) => {
      row.toggleSelected(checked);
    });
  }

  const { data, isFetching, refetch } = useQuery(
    ['users', pagination.pageIndex, pagination.pageSize],
    () => getUsers({ page: pagination.pageIndex, limit: pagination.pageSize }),
    {
      staleTime: 15000,
    }
  );

  const pageCount = useMemo(() => {
    const calc = data?.limit ? Math.ceil(data.totalCount / data.limit) : 1;
    return calc < 1 ? 1 : calc;
  }, [data]);

  const columns = useMemo(
    () => [
      column.display({
        id: 'select',
        enableHiding: false,
        enableSorting: false,
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
        header: t('schema.fullName'),
        cell: (info) => info.getValue(),
      }),
      column.accessor('email', {
        header: t('schema.email'),
        cell: (info) => info.getValue(),
      }),
      column.accessor('createdAt', {
        header: t('schema.createdAt'),
        cell: (info) => dateFormatter.format(info.getValue()),
      }),
      column.accessor('updatedAt', {
        header: t('schema.updatedAt'),
        cell: (info) => dateFormatter.format(info.getValue()),
      }),
      column.accessor('username', {
        header: t('schema.username'),
        cell: (info) => info.getValue(),
      }),
      column.accessor('id', {
        header: t('schema.id'),
        cell: (info) => info.getValue(),
      }),
      column.display({
        id: 'action',
        enableHiding: false,
        enableSorting: false,
        header: () => (
          <ColumnsVisibilityDropdown
            isAllColumnsVisible={table.getIsAllColumnsVisible()}
            onToggleAllColumnsVisibility={table.getToggleAllColumnsVisibilityHandler()}
            columns={table.getAllLeafColumns()}
          />
        ),
        cell: (info) => (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton variant="ghost">
                <DotsVerticalIcon />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content variant="soft">
              <DropdownMenu.Item>{t('actions.edit', { ns: 'translation' })}</DropdownMenu.Item>
              <DropdownMenu.Item>{t('actions.duplicate', { ns: 'translation' })}</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item color="red" onClick={() => handleDeleteUser(info.row.original)}>
                {t('actions.delete', { ns: 'translation' })}
              </DropdownMenu.Item>
              {hasSelection && (
                <DropdownMenu.Item color="red" onClick={handleDeleteMany}>
                  {i18next.t('actions.deleteSelected')}
                </DropdownMenu.Item>
              )}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        ),
      }),
    ],
    [i18n.language, hasSelection]
  );

  const table = useReactTable({
    data: data?.results ?? [],
    columns,
    manualPagination: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    pageCount,
    state: {
      pagination,
      rowSelection,
      sorting,
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
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  function handlePageSizeChange(size: string) {
    setPagination(
      produce((draft) => {
        draft.pageSize = Number(size);
      })
    );
    refetch();
  }

  function handleDeleteUser(user: User) {
    deleteDialog([user]);
  }

  function handleDeleteMany() {
    deleteDialog(table.getSelectedRowModel().rows.map((row) => row.original));
  }

  return (
    <>
      <Flex direction="column" gap="3">
        <Heading my="4">{t('title')}</Heading>
        <Flex justify="between" align="center" gap="4">
          {isFetching && <Spinner size={20} color="accent" />}
          <Flex justify="end" width="100%">
            <Button variant="solid">{t('actions.new', { ns: 'translation' })}</Button>
          </Flex>
        </Flex>
        {!!data?.results.length && (
          <TableRoot variant="surface">
            <Table.Header>
              {table.getHeaderGroups().map((headerGroup) => (
                <Table.Row key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <ColumnHeaderCell
                      key={header.id}
                      onSort={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                      sortDirection={header.column.getIsSorted() as string}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </ColumnHeaderCell>
                  ))}
                </Table.Row>
              ))}
            </Table.Header>
            <Table.Body>
              {table.getRowModel().rows.map((row) => (
                <ContextMenu.Root key={row.id}>
                  <ContextMenu.Trigger>
                    <TableRow isSelected={row.getIsSelected()}>
                      {row.getVisibleCells().map((cell) => (
                        <Table.Cell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Table.Cell>
                      ))}
                    </TableRow>
                  </ContextMenu.Trigger>
                  <ContextMenu.Content variant="soft">
                    <ContextMenu.Item>{t('actions.edit', { ns: 'translation' })}</ContextMenu.Item>
                    <ContextMenu.Item>{t('actions.duplicate', { ns: 'translation' })}</ContextMenu.Item>
                    <ContextMenu.Separator />
                    <ContextMenu.Item color="red" onClick={() => handleDeleteUser(row.original)}>
                      {t('actions.delete', { ns: 'translation' })}
                    </ContextMenu.Item>
                    {hasSelection && (
                      <ContextMenu.Item color="red" onClick={handleDeleteMany}>
                        {i18next.t('actions.deleteSelected')}
                      </ContextMenu.Item>
                    )}
                  </ContextMenu.Content>
                </ContextMenu.Root>
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
            defaultSize={defaultPagination.pageSize.toString()}
          />
        </Flex>
      </Flex>
      <DeleteDialog />
    </>
  );
}
