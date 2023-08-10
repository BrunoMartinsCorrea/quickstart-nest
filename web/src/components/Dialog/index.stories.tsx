import type { Meta, StoryObj } from '@storybook/react';
import * as Dialog from './index';
import { Flex } from '../layout';
import { Input, Label } from '../Form';
import { Button } from '../Button';

const meta: Meta<typeof Dialog.Root> = {
  component: Dialog.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    defaultOpen: false,
    modal: false,
    open: false,
    onOpenChange: () => {},
  }
};

export default meta;
type Story = StoryObj<typeof Dialog.Root>;

export const Default: Story = {
  render: () => {
    return (
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Edit Profile</Dialog.Title>
            <Dialog.Description>Make changes to your profile here. Click save when you're done.</Dialog.Description>
          </Dialog.Header>
          <Flex $dir="column" $gap={1}>
            <Flex $dir="column" $gap={'0.375rem'} $w="100%">
              <Label htmlFor="fullname">Full name</Label>
              <Input type="text" id="fullname" placeholder="Full name" />
            </Flex>
            <Flex $dir="column" $gap={'0.375rem'} $w="100%">
              <Label htmlFor="fullname">Full name</Label>
              <Input type="text" id="fullname" placeholder="Full name" />
            </Flex>
          </Flex>
          <Dialog.Footer>
            <Button variant="secondary">Cancel</Button>
            <Button>Save changes</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    )
  }
}

