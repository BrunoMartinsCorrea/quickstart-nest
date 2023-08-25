import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Flex, IconButton, Text, Select, Tooltip } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
  onFirstPage: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onLastPage: () => void;
  onPageSizeChange: (size: string) => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentPage: number;
  totalPages: number;
}

export function Pagination({
  onFirstPage,
  onPrevious,
  onNext,
  onLastPage,
  hasNextPage,
  hasPreviousPage,
  onPageSizeChange,
  currentPage,
  totalPages,
}: PaginationProps) {
  const { t } = useTranslation();

  return (
    <Flex align="center" gap="4">
      <Flex gap="2" align="center">
        <Text weight="bold" size="2">
          {t('labels.rowsPerPage')}
        </Text>
        <Select.Root onValueChange={onPageSizeChange} defaultValue="10">
          <Select.Trigger />
          <Select.Content variant="soft">
            <Select.Group>
              <Select.Item value="1">1</Select.Item>
              <Select.Item value="10">10</Select.Item>
              <Select.Item value="20">20</Select.Item>
              <Select.Item value="30">30</Select.Item>
              <Select.Item value="40">40</Select.Item>
              <Select.Item value="50">50</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>
      <Text weight="bold" size="2">
        {t('labels.pagination', {
          page: currentPage,
          totalPages,
        })}
      </Text>
      <Flex gap="2">
        <Tooltip content={t('actions.firstPage')}>
          <IconButton variant="soft" onClick={onFirstPage} disabled={!hasPreviousPage}>
            <DoubleArrowLeftIcon width={16} />
          </IconButton>
        </Tooltip>
        <Tooltip content={t('actions.previousPage')}>
          <IconButton variant="soft" onClick={onPrevious} disabled={!hasPreviousPage}>
            <ChevronLeftIcon width={16} />
          </IconButton>
        </Tooltip>
        <Tooltip content={t('actions.nextPage')}>
          <IconButton variant="soft" onClick={onNext} disabled={!hasNextPage}>
            <ChevronRightIcon width={16} />
          </IconButton>
        </Tooltip>
        <Tooltip content={t('actions.lastPage')}>
          <IconButton variant="soft" onClick={onLastPage} disabled={!hasNextPage}>
            <DoubleArrowRightIcon width={16} />
          </IconButton>
        </Tooltip>
      </Flex>
    </Flex>
  );
}
