import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './index';
import { Flex } from '@/components/layout';
import { Label } from '../Label';

const meta: Meta<typeof Switch> = {
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => (
    <Flex $align="center" $gap="0.5rem">
      <Switch id="airplane" />
      <Label htmlFor="airplane">Airplane mode</Label>
    </Flex>
  ),
};
