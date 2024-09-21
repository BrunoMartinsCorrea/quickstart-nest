import { AlertDialog, Button, Flex, Table } from '@radix-ui/themes';
import { AlertDialogRootProps } from '@radix-ui/themes/dist/cjs/components/alert-dialog';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import _ from 'underscore';

type Item<T> = T & { id: string };

interface RootProps<T> extends AlertDialogRootProps {
  title: string;
  description: string;
  headers: string[];
  data: Array<Item<Object>>;
  children?: ReactElement;
  onConfirm: () => void;
}

function Root<T extends { id: string }[]>({
  title,
  description,
  headers,
  data,
  onConfirm,
  children,
  ...props
}: RootProps<T>) {
  const { t } = useTranslation();

  return (
    <AlertDialog.Root {...props}>
      {children}
      <AlertDialog.Content style={{ maxWidth: 500 }}>
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="2">
          {description}
        </AlertDialog.Description>
        <Table.Root variant="ghost" my="4">
          <Table.Header>
            <Table.Row>
              {headers.map(header => (
                <Table.ColumnHeaderCell key={header}>{header}</Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(item => (
              <Table.Row key={item.id}>
                {_.keys(_.omit(item, 'id')).map(key => (
                  <Table.Cell key={key}>{item[key]}</Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Flex gap="3" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              {t('actions.cancel')}
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red" onClick={onConfirm}>{t('actions.delete')}</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

function Trigger(props: { children: ReactElement }) {
  return (
    <AlertDialog.Trigger {...props} />
  );
}

export const DeleteDialog = {
  Root,
  Trigger,
}
