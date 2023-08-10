import { CopyIcon } from '@radix-ui/react-icons';
import { Button } from './index';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    disabled: false,
  },
  argTypes: {
    disabled: {
      type: 'boolean',
      defaultValue: 'false',
    },
    as: { table: { disable: true } },
    asChild: { table: { disable: true } },
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary',
    variant: 'primary',
  },
};
export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
};

export const Link: Story = {
  args: {
    children: 'Link',
    variant: 'link',
  },
};

export const WithIcon: Story = {
  render: (props) => {
    return <Button {...props}>
      <CopyIcon />
      Copy
    </Button>
  }
}
