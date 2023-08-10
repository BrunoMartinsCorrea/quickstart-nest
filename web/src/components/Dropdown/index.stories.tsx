


import type { Meta, StoryObj } from '@storybook/react';
import * as Dropdown from './index';
import { Button } from '../Button';
import { useState } from 'react';

const meta: Meta<typeof Dropdown.Root> = {
  component: Dropdown.Root,
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
type Story = StoryObj<typeof Dropdown.Root>;

export const Options: Story = {
  render: () => {
    const [open,setOpen]  = useState(false);
    return (
      <Dropdown.Root open={open} defaultOpen={false} onOpenChange={() => setOpen(prev => !prev)}>
        <Dropdown.Trigger asChild>
          <Button variant="outline">Dropdown</Button>
        </Dropdown.Trigger>
        <Dropdown.Content w="250px">
          <Dropdown.Label>My Account</Dropdown.Label>
          <Dropdown.Separator />
          <Dropdown.Group>
            <Dropdown.Item>
              Profile
              <Dropdown.Shortcut>⇧⌘P</Dropdown.Shortcut>
            </Dropdown.Item>
            <Dropdown.Item>
              Billing
              <Dropdown.Shortcut>⌘B</Dropdown.Shortcut>
            </Dropdown.Item>
            <Dropdown.Item>
              Settings
              <Dropdown.Shortcut>⌘S</Dropdown.Shortcut>
            </Dropdown.Item>
            <Dropdown.Item>
              Keyboard shortcuts
              <Dropdown.Shortcut>⌘K</Dropdown.Shortcut>
            </Dropdown.Item>
          </Dropdown.Group>
          <Dropdown.Separator />
          <Dropdown.Group>
            <Dropdown.Item>Team</Dropdown.Item>
            <Dropdown.Sub>
              <Dropdown.SubTrigger>Invite users</Dropdown.SubTrigger>
              <Dropdown.Portal>
                <Dropdown.SubContent>
                  <Dropdown.Item>Email</Dropdown.Item>
                  <Dropdown.Item>Message</Dropdown.Item>
                  <Dropdown.Separator />
                  <Dropdown.Item>More...</Dropdown.Item>
                </Dropdown.SubContent>
              </Dropdown.Portal>
            </Dropdown.Sub>
            <Dropdown.Item>
              New Team
              <Dropdown.Shortcut>⌘+T</Dropdown.Shortcut>
            </Dropdown.Item>
          </Dropdown.Group>
          <Dropdown.Separator />
          <Dropdown.Item>GitHub</Dropdown.Item>
          <Dropdown.Item>Support</Dropdown.Item>
          <Dropdown.Item disabled>API</Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item>
            Log out
            <Dropdown.Shortcut>⇧⌘Q</Dropdown.Shortcut>
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    )
  }
}


export const WithRadioButtons: Story = {
  render: () => {
    const [open,setOpen]  = useState(false);
    const [position,setPosition]  = useState("top");
    return (
      <Dropdown.Root open={open} defaultOpen={false} onOpenChange={() => setOpen(prev => !prev)}>
        <Dropdown.Trigger asChild>
          <Button variant="outline">Dropdown Radio</Button>
        </Dropdown.Trigger>
        <Dropdown.Content className="$w-56">
          <Dropdown.Label>Panel Position</Dropdown.Label>
          <Dropdown.Separator />
          <Dropdown.RadioGroup value={position} onValueChange={setPosition}>
            <Dropdown.RadioItem value="top">Top</Dropdown.RadioItem>
            <Dropdown.RadioItem value="bottom">Bottom</Dropdown.RadioItem>
            <Dropdown.RadioItem value="right">Right</Dropdown.RadioItem>
          </Dropdown.RadioGroup>
        </Dropdown.Content>
      </Dropdown.Root>
    )
  }
}

export const WithCheckBoxes: Story = {
  render: () => {
    const [open,setOpen]  = useState(false);
    const [showStatusBar, setShowStatusBar] = useState<boolean>(true);
    const [showActivityBar, setShowActivityBar] = useState<boolean>(false);
    const [showPanel, setShowPanel] = useState<boolean>(false);

    return (
      <Dropdown.Root open={open} defaultOpen={false} onOpenChange={() => setOpen(prev => !prev)}>
        <Dropdown.Trigger asChild>
          <Button variant="outline">Dropdown Checkbox</Button>
        </Dropdown.Trigger>
        <Dropdown.Content className="$w-56">
          <Dropdown.Label>Appearance</Dropdown.Label>
          <Dropdown.Separator />
          <Dropdown.CheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
            Status Bar
          </Dropdown.CheckboxItem>
          <Dropdown.CheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar} disabled>
            Activity Bar
          </Dropdown.CheckboxItem>
          <Dropdown.CheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
            Panel
          </Dropdown.CheckboxItem>
        </Dropdown.Content>
      </Dropdown.Root>
    )
  }
}
