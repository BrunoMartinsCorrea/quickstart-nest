import type { Meta, StoryObj } from '@storybook/react';
import * as Tabs from './index';

const meta: Meta<typeof Tabs.Root> = {
  component: Tabs.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs.Root>;

export const Default: Story = {
  render: () => (
    <Tabs.Root defaultValue="signIn" width="460px">
      <Tabs.List>
        <Tabs.Trigger value="signIn">Sign In</Tabs.Trigger>
        <Tabs.Trigger value="signUp">Sign Up</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="signIn">
        <p>Sign In content</p>
      </Tabs.Content>
      <Tabs.Content value="signUp">
        <p>Sign Up Content</p>
      </Tabs.Content>
    </Tabs.Root>
  ),
};
