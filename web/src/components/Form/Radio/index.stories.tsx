import type { Meta, StoryObj } from '@storybook/react';
import * as Radio from './index';
import { Flex } from '@/components/layout';
import { Label } from '../Label';

const meta: Meta<typeof Radio.Group> = {
  component: Radio.Group,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Radio.Group>;

export const Default: Story = {
  render: () => (
    <Radio.Group defaultValue="item2">
      <Flex $align="center" $gap={0.5}>
        <Radio.Item value="item1" id="item1" />
        <Label htmlFor="item1">Item 1</Label>
      </Flex>
      <Flex $align="center" $gap={0.5}>
        <Radio.Item value="item2" id="item2" />
        <Label htmlFor="item2">Item 2</Label>
      </Flex>
      <Flex $align="center" $gap={0.5}>
        <Radio.Item value="item3" id="item3" />
        <Label htmlFor="item3">Item 3</Label>
      </Flex>
      <Flex $align="center" $gap={0.5}>
        <Radio.Item value="item4" id="item4" />
        <Label htmlFor="item4">Item 4</Label>
      </Flex>
    </Radio.Group>
  ),
};
