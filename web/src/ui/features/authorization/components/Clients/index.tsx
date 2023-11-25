import React, { useEffect, useState } from 'react';
import { Button, Flex, Heading, IconButton, Popover, Separator, Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { Pagination } from '~/components/Pagination';
import { useClients, useDeleteClient } from '../../hooks/clients';
import { Spinner } from '~/components/Spinner';
import { ClientDrawer } from './ClientDrawer';
import { ClientItem } from './ClientItem';
import { useSearchParams } from 'react-router-dom';
import { Hide } from '~/components/Hide';
import { InfoCircledIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { Client } from '@/domain/authorization';
import { DeleteDialog } from '~/components/DeleteDialog';
import { useToast } from '~/hooks/useToast';
import { ResponseError } from '~/types/ResponseError';
import { ClientStatusSwitch } from './ClientStatusSwitch';
import { CardListItem } from '~/components/CardListItem';
import _ from 'underscore';

export function Clients() {
  const { toast } = useToast();
  const { t } = useTranslation('authorization');
  const [queryParams, setQueryParams] = useSearchParams(
    new URLSearchParams({
      page: '1',
      size: '10',
    })
  );

  const [page, setPage] = useState(() => Number(queryParams.get('page')!));
  const [pageSize, setPageSize] = useState(() => Number(queryParams.get('size')!));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | undefined>();

  const { data, isFetching } = useClients({ pageIndex: page - 1, pageSize });

  const deleteMutation = useDeleteClient();
  const error = deleteMutation.error;

  useEffect(() => {
    setQueryParams(prev => {
      prev.delete('page');
      prev.delete('size');
      prev.append('page', `${page}`);
      prev.append('size', `${pageSize}`);
      prev.sort();
      return prev;
    })
  }, [page, pageSize]);

  function onEdit(client: Client) {
    setCurrentClient(client);
    setIsDrawerOpen(true);
  }

  function onNew() {
    setCurrentClient(undefined);
    setIsDrawerOpen(true);
  }

  function handleOpenDeleteDialog(client: Client) {
    setCurrentClient(client);
    setIsDeleteDialogOpen(true);
  }

  function onDelete(id: string) {
    deleteMutation.mutateAsync(id).then(() => {
      toast({
        title: t('clients.form.result.delete.success.title'),
        description: t('clients.form.result.delete.success.description'),
      });
    }).catch(() => {
      toast({
        title: (error as ResponseError).message,
      });
    });
  }

  return (
    <>
      <Flex direction="column" mt="5">
        <Flex gap="4" mb="5" justify="between" align="center">
          <Flex direction='column'>
            <Flex gap="4" align="center">
              <Flex gap="2" align="center">
                <Heading as="h3" size="3">
                  {t('clients.title')}
                </Heading>
                <Popover.Root>
                  <Popover.Trigger>
                    <IconButton variant='ghost' color='gray' size="1">
                      <InfoCircledIcon width="16" />
                    </IconButton>
                  </Popover.Trigger>
                  <Popover.Content>
                    <Flex wrap="wrap" style={{maxWidth: '200px'}}>
                      <Text style={{textOverflow: 'ellipsis'}} color='gray' size="2">
                        {t('clients.description')}
                      </Text>
                    </Flex>
                  </Popover.Content>
                </Popover.Root>
              </Flex>
              {isFetching && <Spinner size={20} color="accent" />}
            </Flex>
          </Flex>
          <Button onClick={onNew}>{t('actions.new', { ns: 'translation' })}</Button>
        </Flex>
        <Flex direction="column" gap="2">
          <Hide ltOrEq='sm'>
            <>
              {data?.results.map((client, i) => {
                return (
                  <React.Fragment key={client.id}>
                    <ClientItem
                      client={client}
                      onEdit={onEdit} onDelete={handleOpenDeleteDialog}/>
                    {i !== data.results.length - 1 && <Separator size="4" />}
                  </React.Fragment>
                );
              })}
            </>
          </Hide>
          <Hide gtOrEq='sm'>
            <>
              {data?.results.map(client => {
                return (
                  <CardListItem.Root data={[
                    { key: t('clients.schema.name'), value: client.name },
                    { key: t('clients.schema.description'), value: client.description },
                  ]}>
                    <CardListItem.Header>
                      <Flex justify="between" align="center">
                        <Flex gap="2">
                          <IconButton variant="soft" onClick={() => onEdit(client)} >
                            <Pencil1Icon width={16} />
                          </IconButton>
                          <IconButton variant="soft"  onClick={() => handleOpenDeleteDialog(client)}>
                            <TrashIcon />
                          </IconButton>
                        </Flex>
                          <ClientStatusSwitch client={client}/>

                          {/* <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                              <IconButton variant="ghost">
                                <DotsVerticalIcon />
                              </IconButton>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content variant="soft">
                              <DropdownMenu.Item onClick={() => onEdit(client)}>
                                  {t('actions.edit', { ns: 'translation' })}
                              </DropdownMenu.Item>
                              <DropdownMenu.Separator />
                              <DropdownMenu.Item color="red" onClick={() => handleOpenDeleteDialog(client)}>
                                {t('actions.delete', { ns: 'translation' })}
                              </DropdownMenu.Item>
                            </DropdownMenu.Content>
                          </DropdownMenu.Root> */}
                        </Flex>
                    </CardListItem.Header>
                  </CardListItem.Root>
                )
              })}
            </>
          </Hide>
        </Flex>
        {data && (
          <Flex justify="end" my="8">
            <Pagination
              currentPage={page}
              hasNextPage={data.totalCount > page * pageSize}
              hasPreviousPage={page > 1}
              defaultSize={pageSize.toString()}
              totalPages={Math.ceil(data.totalCount/pageSize)}
              onNext={() => setPage(value => value + 1)}
              onPrevious={() => setPage(value => value - 1)}
              onFirstPage={() => setPage(1)}
              onLastPage={() => setPage(data.totalCount)}
              onPageSizeChange={(size) => {
                setPageSize(Number(size));
                if (Number(size) >= data.totalCount) {
                  setPage(1);
                }
              }}
            />
          </Flex>
        )}
      </Flex>
      <ClientDrawer
        client={currentClient}
        open={isDrawerOpen}
        onOpenChange={(open) => setIsDrawerOpen(open)}
      />
      <DeleteDialog.Root
        open={isDeleteDialogOpen}
        onOpenChange={(open) => setIsDeleteDialogOpen(open)}
        title={t('clients.deleteDialog.title')}
        description={t('clients.deleteDialog.description')}
        headers={[
          t('clients.schema.name'),
          t('clients.schema.description')
        ]}
        data={currentClient && [_.pick(currentClient, 'id', 'name', 'description')] || []}
        onConfirm={() => onDelete(currentClient?.id ?? '')}
      />
    </>
  );
}
