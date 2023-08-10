import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './index';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Comment',
  },
};
