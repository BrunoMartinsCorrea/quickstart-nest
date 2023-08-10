import type { Meta, StoryObj } from '@storybook/react';
import * as Popover from './index';
import { Button } from '../Button';
import { Flex } from '../layout';
import { Heading } from '../Typography/Heading';

const meta: Meta<typeof Popover.Root> = {
  component: Popover.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    defaultOpen: false,
    modal: false,
    open: false,
    onOpenChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof Popover.Root>;

export const Options: Story = {
  render: () => {
    return (
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button variant="outline">Open popover</Button>
        </Popover.Trigger>
        <Popover.Content w="380px">
          <Flex $dir="column" $gap={1} $p={4}>
            <Heading as="h4">This is a popover</Heading>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    );
  },
};
