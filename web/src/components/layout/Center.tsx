import { Flex } from '@/components/layout';
import { FlexProps } from './Flex';

export function Center({ children, ...props }: FlexProps) {
  return (
    <Flex $align="center" $justify="center" {...props}>
      {children}
    </Flex>
  );
}
