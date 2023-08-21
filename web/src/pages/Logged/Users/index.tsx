import { Box, Button, Flex, Table } from '@radix-ui/themes';

export function Users() {
  return (
    <Flex direction="column" gap="3">
      <Flex justify="end">
        <Button variant="soft">Criar</Button>
      </Flex>
      <Box style={{ overflowX: 'auto' }}>
        <Table.Root variant="surface" style={{}}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
              <Table.Cell>danilo@example.com</Table.Cell>
              <Table.Cell>Developer</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
              <Table.Cell>zahra@example.com</Table.Cell>
              <Table.Cell>Admin</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
              <Table.Cell>jasper@example.com</Table.Cell>
              <Table.Cell>Developer</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Box>
    </Flex>
  );
}
