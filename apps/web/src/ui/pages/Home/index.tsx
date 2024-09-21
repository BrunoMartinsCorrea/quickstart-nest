import { Flex } from '@radix-ui/themes';
import { ThemeExample } from '../Appearance/components/ThemeExample';

export function Home() {
  return (
    <Flex direction="column" gap="3" align="start">
      <ThemeExample />
    </Flex>
  );
}
