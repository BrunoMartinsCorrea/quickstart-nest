import { Box, Flex, Heading, Tabs, Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';

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
          <Tabs.Trigger value="role_groups">Role Groups</Tabs.Trigger>
          <Tabs.Trigger value="user_groups">User Groups</Tabs.Trigger>
        </Tabs.List>
        <Box mt="3">
          <Tabs.Content value="role_groups">
            <Text>Role groups</Text>
          </Tabs.Content>
          <Tabs.Content value="user_groups">
            <Text>User groups</Text>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Flex>
  );
}
