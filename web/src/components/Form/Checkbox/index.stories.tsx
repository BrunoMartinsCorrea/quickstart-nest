import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './index';
import { Flex } from '@/components/layout';
import { Label } from '../Label';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    disabled: false,
  }
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {}

export const WithLabel: Story = {
  render: () => (
    <Flex $align="center" $gap="0.5rem">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </Flex>
  )
}
