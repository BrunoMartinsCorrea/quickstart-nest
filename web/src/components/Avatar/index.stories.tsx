import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './index';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    src: 'https://github.com/brunomartinscorrea.png',
    alt: 'Profile Pic',
    fallback: 'BC',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};

export const Fallback: Story = {
  args: {
    src: 'https://github.com/brunomartinscorrea.pn',
  },
};
