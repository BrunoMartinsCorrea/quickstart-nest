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
  const hasMany = users.length > 1;

  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Content style={{ maxWidth: 500 }}>
        <AlertDialog.Title>{t(`users.deleteDialog.title.${hasMany ? 'plural' : 'singular'}`)}</AlertDialog.Title>
        <AlertDialog.Description size="2">
          {t(`users.deleteDialog.description.${hasMany ? 'plural' : 'singular'}`)}
        </AlertDialog.Description>
        <Table.Root variant="ghost" my="4">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>{t('users.schema.fullName')}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>{t('users.schema.email')}</Table.ColumnHeaderCell>
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
