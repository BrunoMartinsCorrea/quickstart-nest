import { Box, Button, Flex, Heading, IconButton, Separator, Switch, Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { Pagination } from '~/components/Pagination';
import { Label } from '~/components/Label';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import React from 'react';
import { useClients } from '../../hooks';
import { Spinner } from '~/components/Spinner';
import { ClientDrawer } from './ClientDrawer';

export function Clients() {
  const { t } = useTranslation();

  const { data, isFetching, refetch } = useClients({ pageIndex: 0, pageSize: 10 });

  return (
    <Flex direction="column" mt="5">
      <Flex gap="4" mb="5" justify="between" align="center">
        <Flex gap="4" align="center">
          <Heading as="h3" size="3">
            {t('clients.title', { ns: 'authorization' })}
          </Heading>
          {isFetching && <Spinner size={20} color="accent" />}
        </Flex>
        <ClientDrawer>
          <Button>{t('actions.new')}</Button>
        </ClientDrawer>
      </Flex>
      <Flex direction="column" gap="2">
        {data?.results.map((client, i) => {
          return (
            <React.Fragment key={client.id}>
              <Box my="4">
                <Flex gap="3" p="1" align="center">
                  <Flex gap="1" direction="column" style={{ width: '30%' }}>
                    <Text as="span" weight="bold" size="2">
                      {t('clients.schema.name', { ns: 'authorization' })}
                    </Text>
                    <Text as="span" weight="medium" size="2" color="gray">
                      {client.name}
                    </Text>
                  </Flex>
                  <Flex gap="1" direction="column" grow="1" width="100%">
                    <Text as="span" weight="bold" size="2">
                      {t('clients.schema.description', { ns: 'authorization' })}
                    </Text>
                    <Text as="span" weight="medium" size="2" color="gray">
                      {client.description}
                    </Text>
                  </Flex>
                  <Flex justify="end" ml="4">
                    <Label style={{ display: 'flex', gap: '0.5rem' }}>
                      <span>{client.active ? 'Active' : 'Inactive'}</span>
                      <Switch checked={client.active} />
                    </Label>
                  </Flex>
                  <Flex justify="end" ml="4" gap="2">
                    <ClientDrawer isNew={false} client={client}>
                      <IconButton variant="soft">
                        <Pencil1Icon width={16} />
                      </IconButton>
                    </ClientDrawer>
                    <IconButton variant="soft">
                      <TrashIcon />
                    </IconButton>
                  </Flex>
                </Flex>
              </Box>
              {i !== data.results.length - 1 && <Separator size="4" />}
            </React.Fragment>
          );
        })}
      </Flex>
      <Flex justify="end" my="8">
        <Pagination
          currentPage={0}
          hasNextPage={true}
          hasPreviousPage={false}
          totalPages={2}
          onNext={() => {}}
          onPrevious={() => {}}
          onFirstPage={() => {}}
          onLastPage={() => {}}
          onPageSizeChange={() => {}}
        />
      </Flex>
    </Flex>
  );
}
