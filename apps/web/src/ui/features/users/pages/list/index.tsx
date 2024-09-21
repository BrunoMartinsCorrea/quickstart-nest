import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '@/domain/user';
import { Pagination } from '~/components/Pagination';
import { ColumnHeaderCell, ColumnsVisibilityDropdown, TableRoot, TableRow } from '~/components/Table';
import { Box, Button, Checkbox, Flex, Grid, Heading, Table, Text } from '@radix-ui/themes';
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
import { useDeleteDialog, useUsers } from '../../hooks';
import { produce } from 'immer';
import { Spinner } from '~/components/Spinner';
import { Hide } from '~/components/Hide';
import styles from './styles.module.css';
import { Label } from '~/components/Label';
import { SelectionCard } from '~/components/SelectionCard';
import { ColumnsSortingDropdown } from '~/components/Table/ColumnSortingDropdown';
import { OptionsContextMenu } from '../../components/OptionsContextMenu';
import { OptionsDropdown } from '../../components/OptionsDropdown';
import { DeleteDialog } from '../../components/DeleteDialog';
import React from 'react';
import { NewUserDrawer } from '../../components/NewUserDrawer';

const column = createColumnHelper<User>();

const defaultPagination: PaginationState = {
  pageIndex: 0,
  pageSize: 1,
};

export function UsersList() {
  const { t, i18n } = useTranslation('users');
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

  const { data, isFetching, refetch } = useUsers({ ...pagination });

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
        cell: ({ row }) => (
          <Checkbox
            key={row.id}
            onCheckedChange={row.getToggleSelectedHandler()}
            disabled={!row.getCanSelect()}
            checked={row.getIsSelected()}
          />
        ),
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
        header: () => <TableOptions />,
        cell: (info) => (
          <OptionsDropdown
            key={info.row.id}
            hasSelection={hasSelection}
            onDeleteUser={() => handleDeleteUser(info.row.original)}
            onDeleteManyUsers={handleDeleteMany}
          />
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

  const TableOptions = () => (
    <ColumnsVisibilityDropdown
      isAllColumnsVisible={table.getIsAllColumnsVisible()}
      onToggleAllColumnsVisibility={table.getToggleAllColumnsVisibilityHandler()}
      columns={table.getAllLeafColumns()}
    />
  );

  function handleSort(id: string, desc: boolean) {
    setSorting([{ id, desc }]);
  }

  function handleClearSort() {
    setSorting([]);
  }

  return (
    <>
      <Flex direction="column" gap="3">
        <Heading my="4">{t('title')}</Heading>
        <Flex justify="between" align="center" gap="4">
          {isFetching && <Spinner size={20} color="accent" />}
          <Flex justify="end" width="100%">
            <NewUserDrawer>
              <Button variant="solid">{t('actions.new', { ns: 'translation' })}</Button>
            </NewUserDrawer>
          </Flex>
        </Flex>
        <Hide gtOrEq="md">
          <Flex direction="column" gap="4" mt="4">
            <Flex justify="between" pl="2">
              <Label>
                <Checkbox checked={table.getIsAllRowsSelected()} onCheckedChange={toggleAllSelection} mr="2" />
                {t('actions.toggleAll', { ns: 'translation' })}
              </Label>
              <Flex gap="4">
                <ColumnsSortingDropdown
                  columns={table.getAllLeafColumns()}
                  onSort={handleSort}
                  onClearSort={handleClearSort}
                  sorting={sorting}
                />
                <TableOptions />
              </Flex>
            </Flex>
            {table.getRowModel().rows.map((row) => {
              const flatHeaders = table.getFlatHeaders();
              return (
                <OptionsContextMenu
                  key={row.id}
                  hasSelection={row.getIsSelected()}
                  onDeleteUser={() => handleDeleteUser(row.original)}
                  onDeleteManyUsers={handleDeleteMany}
                >
                  <SelectionCard key={row.id} isSelected={row.getIsSelected()}>
                    <Flex direction="column" gap="3">
                      <Flex gap="3" justify="between">
                        {flatHeaders.map((header, i) => {
                          if (!header.column.getCanHide()) {
                            const cell = row.getVisibleCells()[i];
                            return (
                              <React.Fragment key={header.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </React.Fragment>
                            );
                          }
                        })}
                      </Flex>
                      <Box className={styles.listCardContentContainer}>
                        {flatHeaders.map((header, i) => {
                          if (header.column.getCanHide()) {
                            const cell = row.getVisibleCells()[i];
                            return (
                              <Grid key={header.id}>
                                <Text size="2" weight="bold" className={styles.overflowAnywhere}>
                                  {flexRender(header.column.columnDef.header, header.getContext())}
                                </Text>
                                <Text size="2" className={styles.overflowAnywhere}>
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </Text>
                              </Grid>
                            );
                          }
                        })}
                      </Box>
                    </Flex>
                  </SelectionCard>
                </OptionsContextMenu>
              );
            })}
          </Flex>
        </Hide>
        <Hide ltOrEq="md">
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
                  <OptionsContextMenu
                    key={row.id}
                    hasSelection={row.getIsSelected()}
                    onDeleteUser={() => handleDeleteUser(row.original)}
                    onDeleteManyUsers={handleDeleteMany}
                  >
                    <TableRow isSelected={row.getIsSelected()}>
                      {row.getVisibleCells().map((cell) => (
                        <Table.Cell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Table.Cell>
                      ))}
                    </TableRow>
                  </OptionsContextMenu>
                ))}
              </Table.Body>
            </TableRoot>
          )}
        </Hide>
        <Flex
          justify={{
            initial: 'center',
            md: 'end',
          }}
        >
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
