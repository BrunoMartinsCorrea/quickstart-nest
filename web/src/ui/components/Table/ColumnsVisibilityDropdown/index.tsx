import { GearIcon } from '@radix-ui/react-icons';
import { Checkbox, Flex, IconButton, Popover, Separator } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { Column } from '@tanstack/react-table';
import styles from './styles.module.css';

interface ColumnsVisibilityDropdownProps<T> {
  isAllColumnsVisible: boolean;
  onToggleAllColumnsVisibility: (event: unknown) => void;
  columns: Column<T, unknown>[];
}

export function ColumnsVisibilityDropdown<T>({
  isAllColumnsVisible,
  onToggleAllColumnsVisibility,
  columns,
}: ColumnsVisibilityDropdownProps<T>) {
  const { t } = useTranslation();

  function toggleColumnVisibility(column: Column<T, unknown>, checked: string | boolean) {
    column.toggleVisibility(!!checked);
  }

  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton variant="ghost">
          <GearIcon />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content>
        <Flex direction="column">
          <label className={styles.checkboxContainer}>
            <Checkbox
              className={styles.input}
              checked={isAllColumnsVisible}
              onCheckedChange={onToggleAllColumnsVisibility}
            />
            {t('actions.toggleAll')}
          </label>
          <Separator my="2" size="4" />
          <Flex gap="1" direction="column">
            {columns.map((column) => {
              if (column.getCanHide())
                return (
                  <label key={column.id} className={styles.checkboxContainer}>
                    <Checkbox
                      className={styles.input}
                      checked={column.getIsVisible()}
                      onCheckedChange={(checked) => toggleColumnVisibility(column, checked)}
                    />
                    {column.columnDef.header as string}
                  </label>
                );
            })}
          </Flex>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
