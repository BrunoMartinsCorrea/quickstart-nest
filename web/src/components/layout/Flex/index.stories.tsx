import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './index';

const meta: Meta<typeof Flex> = {
  component: Flex,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Flex>;

export const Default: Story = {
  render: (props) => (
    <Flex {...props}>
      <button>Button 1</button>
      <button>Button 2</button>
    </Flex>
  )
};
