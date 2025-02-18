import { Box, Flex, IconButton, Text } from "@radix-ui/themes";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
import { Client } from "@/domain/authorization";
import _ from 'underscore';
import { ClientStatusSwitch } from "./ClientStatusSwitch";

interface ClientItemProps {
  client: Client;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
}

export function ClientItem({ client, onEdit, onDelete }: ClientItemProps) {
  const { t } = useTranslation('authorization', { keyPrefix: 'clients' });

  return (
    <Box my="4">
      <Flex gap="3" p="1" align="center">
        <Flex gap="1" direction="column" style={{ width: '30%' }}>
          <Text as="span" weight="bold" size="2">
            {t('schema.name')}
          </Text>
          <Text as="span" weight="medium" size="2" color="gray">
            {client.name}
          </Text>
        </Flex>
        <Flex gap="1" direction="column" flexGrow="1" width="100%">
          <Text as="span" weight="bold" size="2">
            {t('schema.description')}
          </Text>
          <Text as="span" weight="medium" size="2" color="gray">
            {client.description}
          </Text>
        </Flex>
        <Flex justify="end" ml="4">
          <ClientStatusSwitch client={client} />
        </Flex>
        <Flex justify="end" ml="4" gap="2">
          <IconButton variant="soft" onClick={() => onEdit(client)}>
            <Pencil1Icon width={16} />
          </IconButton>
          <IconButton variant="soft" onClick={() => onDelete(client)}>
            <TrashIcon />
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  )
}
