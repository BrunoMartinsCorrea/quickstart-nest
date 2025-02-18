import { Box, Flex, Heading, Tabs, Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { RoleGroups } from '../components/RoleGroups';
import { Clients } from '../components/Clients';
import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export function AuthorizationPage() {
  const key = 'tab'
  const { t } = useTranslation('authorization');
  const [queryParams, setQueryParams] = useSearchParams(
    new URLSearchParams({
      tab: 'user-groups',
    })
  );

  const currentTab = queryParams.get(key)!;

  const setCurrentTab = useCallback((tab: string) => setQueryParams(prev => {
    prev.delete(key);
    prev.append(key, tab);
    prev.sort();
    return prev;
  }), [key]);

  return (
    <Flex direction="column" gap="3">
      <Flex my="4" direction="column" gap="1">
        <Heading>{t('title')}</Heading>
        <Text color="gray" size="2">
          {t('description')}
        </Text>
      </Flex>
      <Tabs.Root defaultValue={currentTab} onValueChange={setCurrentTab}>
        <Tabs.List size={{
          initial: '1',
          xs: '2',
        }}>
          <Tabs.Trigger value="user-groups">{t('userGroups.title')}</Tabs.Trigger>
          <Tabs.Trigger value="role-groups">{t('roleGroups.title')}</Tabs.Trigger>
          <Tabs.Trigger value="clients">{t('clients.title')}</Tabs.Trigger>
        </Tabs.List>
        <Box mt="3">
          <Tabs.Content value="role-groups">
            <RoleGroups />
          </Tabs.Content>
          <Tabs.Content value="user-groups">
            <Text>User groups</Text>
          </Tabs.Content>
          <Tabs.Content value="clients">
            <Clients />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Flex>
  );
}
