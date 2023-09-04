import { ContextMenu } from '@radix-ui/themes';
import i18next from 'i18next';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface OptionsContextMenuProps {
  onDeleteUser: () => void;
  onDeleteManyUsers: () => void;
  hasSelection: boolean;
  children: ReactNode;
}

export function OptionsContextMenu({
  hasSelection,
  onDeleteUser,
  onDeleteManyUsers,
  children,
  ...props
}: OptionsContextMenuProps) {
  const { t } = useTranslation();
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
      <ContextMenu.Content variant="soft">
        <ContextMenu.Item>{t('actions.edit', { ns: 'translation' })}</ContextMenu.Item>
        <ContextMenu.Item>{t('actions.duplicate', { ns: 'translation' })}</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item color="red" onClick={onDeleteUser}>
          {t('actions.delete', { ns: 'translation' })}
        </ContextMenu.Item>
        {hasSelection && (
          <ContextMenu.Item color="red" onClick={onDeleteManyUsers}>
            {i18next.t('actions.deleteSelected')}
          </ContextMenu.Item>
        )}
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
