import { Box, Flex, Heading, Tabs, Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { RoleGroups } from '../components/RoleGroups';
import { Clients } from '../components/Clients';

export function AuthorizationPage() {
  const { t } = useTranslation('authorization');
  return (
    <Flex direction="column" gap="3">
      <Flex my="4" direction="column" gap="1">
        <Heading>{t('title')}</Heading>
        <Text color="gray" size="2">
          {t('description')}
        </Text>
      </Flex>
      <Tabs.Root defaultValue="role_groups">
        <Tabs.List>
          <Tabs.Trigger value="user_groups">{t('userGroups.title')}</Tabs.Trigger>
          <Tabs.Trigger value="role_groups">{t('roleGroups.title')}</Tabs.Trigger>
          <Tabs.Trigger value="clients">{t('clients.title')}</Tabs.Trigger>
        </Tabs.List>
        <Box mt="3">
          <Tabs.Content value="role_groups">
            <RoleGroups />
          </Tabs.Content>
          <Tabs.Content value="user_groups">
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
