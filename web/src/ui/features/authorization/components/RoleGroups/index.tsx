import { Button, Card, Flex, Heading, Switch, Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';

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
        <Card>
          <Flex justify="between" align="center">
            <Text as="span" weight="medium" size="2">
              iajsd
            </Text>
            <div>
              <Text size="2" mr="2" as="span">
                Active
              </Text>
              <Switch radius="full" />
            </div>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
}
