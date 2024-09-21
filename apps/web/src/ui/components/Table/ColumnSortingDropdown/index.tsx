import { MixerVerticalIcon } from '@radix-ui/react-icons';
import { Button, Flex, IconButton, Popover, RadioGroup, Separator, Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { Column, SortingState } from '@tanstack/react-table';
import styles from './styles.module.css';
import { useState } from 'react';

interface ColumnsSortingDropdownProps<T> {
  onSort: (id: string, desc: boolean) => void;
  onClearSort: () => void;
  columns: Column<T, unknown>[];
  sorting: SortingState;
}

export function ColumnsSortingDropdown<T>({ onSort, onClearSort, sorting, columns }: ColumnsSortingDropdownProps<T>) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string | undefined>(() => {
    if (sorting.length) return sorting[0].id;
  });
  const [desc, setDesc] = useState<string | undefined>(() => {
    if (sorting.length) return sorting[0].desc ? 'desc' : 'asc';
  });

  function handleApplySort() {
    onSort(id!, desc === 'desc');
    setOpen(false);
  }

  function handleClearSort() {
    setId('');
    setDesc(undefined);
    onClearSort();
    setOpen(false);
  }

  const canSort = !!id && !!desc;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <IconButton variant="ghost">
          <MixerVerticalIcon />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content>
        <Flex direction="column" gap="2">
          <Text weight="bold" size="2">
            {t('labels.sortBy')}
          </Text>
          <RadioGroup.Root onValueChange={setId} value={id}>
            <Flex gap="1" direction="column">
              {columns.map((column) => {
                if (column.getCanHide())
                  return (
                    <label key={column.id} className={styles.radioContainer}>
                      <RadioGroup.Item value={column.id} />
                      {column.columnDef.header as string}
                    </label>
                  );
              })}
            </Flex>
          </RadioGroup.Root>
          <Separator size="4" />
          <RadioGroup.Root onValueChange={setDesc} value={desc}>
            <Flex gap="4">
              <label className={styles.radioContainer}>
                <RadioGroup.Item value="asc" />
                {t('actions.asc')}
              </label>
              <label className={styles.radioContainer}>
                <RadioGroup.Item value="desc" />
                {t('actions.desc')}
              </label>
            </Flex>
          </RadioGroup.Root>
          <Flex gap="4" my="2">
            <Button type="button" variant="outline" onClick={handleClearSort}>
              {t('actions.clear')}
            </Button>
            <Button type="button" onClick={handleApplySort} disabled={!canSort}>
              {t('actions.apply')}
            </Button>
          </Flex>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
