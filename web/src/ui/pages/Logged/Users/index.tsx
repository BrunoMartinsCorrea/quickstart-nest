import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DotsVerticalIcon, UpdateIcon } from '@radix-ui/react-icons';
import { User } from '@/domain/user';
import { useStore } from '~/stores/useStore';
import { Pagination } from '~/components/Pagination';
import { ColumnsVisibilityDropdown, TableRoot, TableRow } from '~/components/Table';
import {
  Button,
  Checkbox,
  ContextMenu,
  DropdownMenu,
  Flex,
  Heading,
  IconButton,
  Table,
  Tooltip,
} from '@radix-ui/themes';
import {
  PaginationState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { DeleteDialog } from './components/DeleteDialog';
import i18next from 'i18next';

const column = createColumnHelper<User>();

const defaultPagination: PaginationState = {
  pageIndex: 0,
  pageSize: 1,
};

type DeleteDialogState = {
  open: boolean;
  users: User[];
};

export default function Users() {
  const { t, i18n } = useTranslation();
  const users = useStore((state) => state.users);
  const getUsers = useStore((state) => state.getUsers);
  const [pagination, setPagination] = useState<PaginationState>(() => defaultPagination);
  const [rowSelection, setRowSelection] = useState({});
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>(() => ({
    open: false,
    users: [],
  }));

  const hasSelection = JSON.stringify(rowSelection) !== '{}';

  function toggleAllSelection(checked: boolean) {
    table.getRowModel().rows.forEach((row) => {
      row.toggleSelected(checked);
    });
  }

  function refresh() {
    setPagination((value) => ({
      pageIndex: 0,
      pageSize: value.pageSize,
    }));
  }

  const dateFormatter = useMemo(() => new Intl.DateTimeFormat(i18n.language), [i18n.language]);

  const pageCount = useCallback(() => {
    const calc = users.limit ? Math.ceil(users.totalCount / users.limit) : 1;
    return calc < 1 ? 1 : calc;
  }, [users]);

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
        header: t('schema.fullName', { ns: 'users' }),
        cell: (info) => info.getValue(),
      }),
      column.accessor('email', {
        header: t('schema.email', { ns: 'users' }),
        cell: (info) => info.getValue(),
      }),
      column.accessor('createdAt', {
        header: t('schema.createdAt', { ns: 'users' }),
        cell: (info) => dateFormatter.format(info.getValue()),
      }),
      column.accessor('updatedAt', {
        header: t('schema.updatedAt', { ns: 'users' }),
        cell: (info) => dateFormatter.format(info.getValue()),
      }),
      column.accessor('username', {
        header: t('schema.username', { ns: 'users' }),
        cell: (info) => info.getValue(),
      }),
      column.accessor('id', {
        header: t('schema.id', { ns: 'users' }),
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
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton variant="ghost">
                <DotsVerticalIcon />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content variant="soft">
              <DropdownMenu.Item>{t('actions.edit')}</DropdownMenu.Item>
              <DropdownMenu.Item>{t('actions.duplicate')}</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item color="red" onClick={() => handleDeleteUser(info.row.original)}>
                {t('actions.delete')}
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
    getFilteredRowModel: getFilteredRowModel(),
  });

  function handlePageSizeChange(size: string) {
    setPagination((value) => ({ ...value, pageSize: Number(size) }));
  }

  function handleDeleteUser(user: User) {
    setDeleteDialog({
      open: true,
      users: [user],
    });
  }

  function handleDeleteMany() {
    setDeleteDialog({
      open: true,
      users: table.getSelectedRowModel().rows.map((row) => row.original),
    });
  }

  useEffect(() => {
    getUsers({ page: pagination.pageIndex + 1, limit: pagination.pageSize });
  }, [pagination]);

  return (
    <>
      <Flex direction="column" gap="3">
        <Heading my="4">{t('title', { ns: 'users' })}</Heading>
        <Flex justify="between" align="center" gap="4">
          <Tooltip content={t('actions.refresh')}>
            <IconButton variant="soft" onClick={refresh}>
              <UpdateIcon />
            </IconButton>
          </Tooltip>
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
                    <ContextMenu.Item>{t('actions.edit')}</ContextMenu.Item>
                    <ContextMenu.Item>{t('actions.duplicate')}</ContextMenu.Item>
                    <ContextMenu.Separator />
                    <ContextMenu.Item color="red" onClick={() => handleDeleteUser(row.original)}>
                      {t('actions.delete')}
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
      <DeleteDialog
        open={deleteDialog.open}
        users={deleteDialog.users}
        onOpenChange={(value) =>
          setDeleteDialog({
            open: value,
            users: [],
          })
        }
      />
    </>
  );
}
