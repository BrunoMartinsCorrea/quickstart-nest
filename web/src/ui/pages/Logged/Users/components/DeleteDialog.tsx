import { User } from '@/domain/user';
import { AlertDialog, Button, Flex, Table } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';

interface DeleteDialogProps {
  open: boolean;
  users: User[];
  onOpenChange: (open: boolean) => void;
}

export function DeleteDialog({ open, users, onOpenChange }: DeleteDialogProps) {
  const { t } = useTranslation();
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Content style={{ maxWidth: 500 }}>
        <AlertDialog.Title>{t('deleteDialog.title', { count: users.length, ns: 'users' })}</AlertDialog.Title>
        <AlertDialog.Description size="2">
          {t('deleteDialog.description', { count: users.length, ns: 'users' })}
        </AlertDialog.Description>
        <Table.Root variant="ghost" my="4">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>{t('schema.fullName', { ns: 'users' })}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>{t('schema.email', { ns: 'users' })}</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map((user) => {
              return (
                <Table.Row key={user.id}>
                  <Table.RowHeaderCell>{user.fullName}</Table.RowHeaderCell>
                  <Table.Cell>{user.email}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
        <Flex gap="3" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              {t('actions.cancel')}
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red">{t('actions.delete')}</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
