import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Flex, IconButton } from '@radix-ui/themes';

interface PaginationProps {
  onFirstPage: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onLastPage: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function Pagination({
  onFirstPage,
  onPrevious,
  onNext,
  onLastPage,
  hasNextPage,
  hasPreviousPage,
}: PaginationProps) {
  return (
    <Flex gap="2">
      <IconButton variant="soft" onClick={onFirstPage} disabled={!hasPreviousPage}>
        <DoubleArrowLeftIcon width={16} />
      </IconButton>
      <IconButton variant="soft" onClick={onPrevious} disabled={!hasPreviousPage}>
        <ChevronLeftIcon width={16} />
      </IconButton>
      <IconButton variant="soft" onClick={onNext} disabled={!hasNextPage}>
        <ChevronRightIcon width={16} />
      </IconButton>
      <IconButton variant="soft" onClick={onLastPage} disabled={!hasNextPage}>
        <DoubleArrowRightIcon width={16} />
      </IconButton>
    </Flex>
  );
}
