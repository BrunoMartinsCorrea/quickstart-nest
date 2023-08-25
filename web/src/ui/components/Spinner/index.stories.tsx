import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './index';

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    size: 16,
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};
