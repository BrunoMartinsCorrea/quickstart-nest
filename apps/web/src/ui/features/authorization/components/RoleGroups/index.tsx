import { Box, Button, Flex, Heading, IconButton, Separator, Switch, Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { Pagination } from '~/components/Pagination';
import { Label } from '~/components/Label';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import React from 'react';

const permissionGroups = Array.from({ length: 5 });

export function RoleGroups() {
  const { t } = useTranslation();

  return (
    <Flex direction="column" mt="5">
      <Flex gap="4" mb="5" justify="between" align="center">
        <Heading as="h3" size="3">
          {t('roleGroups.title', { ns: 'authorization' })}
        </Heading>
        <Button>{t('actions.new')}</Button>
      </Flex>
      <Flex direction="column" gap="2">
        {permissionGroups.map((_, i) => {
          return (
            <React.Fragment>
              <Box my="4">
                <Flex gap="3" p="1" align="center">
                  <Flex gap="1" direction="column" style={{ width: '30%' }}>
                    <Text as="span" weight="bold" size="2">
                      Group
                    </Text>
                    <Text as="span" weight="medium" size="2" color="gray">
                      User Management
                    </Text>
                  </Flex>
                  <Flex gap="1" direction="column" flexGrow="1" width="100%">
                    <Text as="span" weight="bold" size="2">
                      Description
                    </Text>
                    <Text as="span" weight="medium" size="2" color="gray">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla neque quis, aliquam necessitatibus
                      enim corporis tempore, similique ipsum molestiae saepe, eaque id accusantium!
                    </Text>
                  </Flex>
                  <Flex justify="end" ml="4">
                    <Label style={{ display: 'flex', gap: '0.5rem' }}>
                      <span>Active</span>
                      <Switch />
                    </Label>
                  </Flex>
                  <Flex justify="end" ml="4" gap="2">
                    <IconButton variant="soft">
                      <Pencil1Icon />
                    </IconButton>
                    <IconButton variant="soft">
                      <TrashIcon />
                    </IconButton>
                  </Flex>
                </Flex>
              </Box>
              {i !== permissionGroups.length - 1 && <Separator size="4" />}
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
          onNext={() => { }}
          onPrevious={() => { }}
          onFirstPage={() => { }}
          onLastPage={() => { }}
          onPageSizeChange={() => { }}
        />
      </Flex>
    </Flex>
  );
}
