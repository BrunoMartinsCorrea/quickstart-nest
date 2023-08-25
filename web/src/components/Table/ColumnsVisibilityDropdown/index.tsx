import { GearIcon } from '@radix-ui/react-icons';
import { Flex, IconButton, Popover, Separator } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';
import { Column } from '@tanstack/react-table';

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
            <input
              className={styles.input}
              type="checkbox"
              {...{
                checked: isAllColumnsVisible,
                onChange: onToggleAllColumnsVisibility,
              }}
            />
            {t('actions.toggleAll')}
          </label>
          <Separator my="2" size="4" />
          <Flex gap="1" direction="column">
            {columns.map((column) => {
              if (column.getCanHide())
                return (
                  <label key={column.id} className={styles.checkboxContainer}>
                    <input
                      className={styles.input}
                      {...{
                        type: 'checkbox',
                        checked: column.getIsVisible(),
                        onChange: column.getToggleVisibilityHandler(),
                      }}
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
