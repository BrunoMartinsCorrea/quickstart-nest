import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { DropdownMenu, IconButton } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

interface OptionsDropdownProps {
  onDeleteUser: () => void;
  onDeleteManyUsers: () => void;
  hasSelection: boolean;
}

export function OptionsDropdown({ onDeleteUser, onDeleteManyUsers, hasSelection }: OptionsDropdownProps) {
  const { t } = useTranslation();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost">
          <DotsVerticalIcon />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content variant="soft">
        <DropdownMenu.Item>{t('actions.edit', { ns: 'translation' })}</DropdownMenu.Item>
        <DropdownMenu.Item>{t('actions.duplicate', { ns: 'translation' })}</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item color="red" onClick={onDeleteUser}>
          {t('actions.delete', { ns: 'translation' })}
        </DropdownMenu.Item>
        {hasSelection && (
          <DropdownMenu.Item color="red" onClick={onDeleteManyUsers}>
            {i18next.t('actions.deleteSelected')}
          </DropdownMenu.Item>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
