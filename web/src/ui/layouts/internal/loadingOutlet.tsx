import { Flex } from '@radix-ui/themes';
import { Spinner } from '~/components/Spinner';

export function LoadingOutlet() {
  return (
    <Flex align="center" justify="center" width="100%" style={{ height: 'calc(100vh - 250px)' }}>
      <Spinner />
    </Flex>
  );
}
