import { useStore } from '@/stores/useStore';
import { Button } from '@/components/Button';
import { CopyIcon, TrashIcon } from '@radix-ui/react-icons';
import { Spinner } from '@/components/Spinner';
import { BodyText } from '@/components/Typography/BodyText';
import { Heading } from '@/components/Typography/Heading';
import * as Tabs from '@/components/Tabs';
import * as Card from '@/components/Card';
import { Avatar } from '@/components/Avatar';
import { Badge } from '@/components/Badge';
import * as Dialog from '@/components/Dialog';
import * as Popover from '@/components/Popover';
import { Container, Flex, Separator } from '@/components/layout';
import { Checkbox, Input, Label, Radio, Select, Switch, Textarea } from '@/components/Form';

import * as Dropdown from '@/components/Dropdown';
import React from 'react';

export default function SignInPage() {
  useStore((state) => state);
  const [showStatusBar, setShowStatusBar] = React.useState<boolean>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<boolean>(false);
  const [showPanel, setShowPanel] = React.useState<boolean>(false);
  const [position, setPosition] = React.useState('bottom');

  return (
    <Container>
      <Flex $dir="column" $gap={1} $align="start">
        <Flex $dir="row" $gap="1rem" $w="100%">
          <Flex $dir="column" $gap={1} $flex={1}>
            <Heading>Password</Heading>
            <BodyText>aisdjjidsa</BodyText>
            <Flex $gap={0.5}>
              <Badge>Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
            </Flex>
          </Flex>
          <Flex $dir="column" $gap="1rem">
            <Avatar src="https://github.com/gustavonogales.png" alt="@gustavonogales" fallback="GN" />
          </Flex>
        </Flex>
        <Card.Root $maxW="350px">
          <Card.Header>
            <Heading as="h3">Sign In</Heading>
            <BodyText>Welcome back. You've been missed!</BodyText>
          </Card.Header>
          <Card.Content>
            <Flex $dir="column" $gap="1rem" $align="stretch">
              <Flex $dir="column" $gap={'0.375rem'}>
                <Label htmlFor="email">Email</Label>
                <Input type="text" id="email" placeholder="E-mail" />
              </Flex>
              <Flex $gap="0.5rem" $align="center">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Airplane mode</Label>
              </Flex>
              <Select.Root>
                <Select.Trigger className="$w-[180px]">
                  <Select.Value placeholder="Select a fruit" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    <Select.Label>Fruits</Select.Label>
                    <Select.Item value="apple">Apple</Select.Item>
                    <Select.Item value="banana">Banana</Select.Item>
                    <Select.Item value="blueberry">Blueberry</Select.Item>
                    <Select.Item value="grapes">Grapes</Select.Item>
                    <Select.Item value="pineapple">Pineapple</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
              <Flex $align="center" $gap="0.5rem">
                <Checkbox id="terms" disabled />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </Flex>
            </Flex>
          </Card.Content>
          <Card.Footer>
            <Button>Sign In</Button>
            <Button variant="link">Forgot password</Button>
          </Card.Footer>
        </Card.Root>
        <Tabs.Root defaultValue="signIn" width="460px">
          <Tabs.List>
            <Tabs.Trigger value="signIn">Sign In</Tabs.Trigger>
            <Tabs.Trigger value="signUp">Sign Up</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="signIn">
            <Card.Root>
              <Card.Header>
                <Heading as="h3">Sign In</Heading>
                <BodyText>Welcome back. You've been missed!</BodyText>
              </Card.Header>
              <Card.Content>
                <Flex $dir="column" $gap={1} $align="stretch">
                  <Flex $dir="column" $gap={'0.375rem'} $flex={1}>
                    <Label htmlFor="email">Email</Label>
                    <Input type="text" id="email" placeholder="E-mail" />
                  </Flex>
                  <Flex $dir="column-reverse" $gap={'0.375rem'}>
                    <Textarea id="comment" placeholder="Comment" />
                    <Label htmlFor="comment">Comment</Label>
                  </Flex>
                </Flex>
              </Card.Content>
              <Card.Footer>
                <Button>Sign In</Button>
                <Button variant="link">Forgot password</Button>
              </Card.Footer>
            </Card.Root>
          </Tabs.Content>
          <Tabs.Content value="signUp">
            <Card.Root>
              <Card.Header>
                <Heading as="h3">Sign Up</Heading>
                <BodyText>Welcome back. You've been missed!</BodyText>
              </Card.Header>
              <Card.Content>
                <Flex $dir="column" $gap={'1rem'} $align="stretch">
                  <Flex $dir="column" $gap={'0.375rem'}>
                    <Label htmlFor="email">Email</Label>
                    <Input type="text" id="email" placeholder="E-mail" />
                  </Flex>
                  <Flex $dir="column" $gap={'0.375rem'}>
                    <Label htmlFor="fullname">Full me</Label>
                    <Input type="text" id="fullname" placeholder="Full name" />
                  </Flex>
                </Flex>
              </Card.Content>
              <Card.Footer>
                <Button>Sign Up</Button>
              </Card.Footer>
            </Card.Root>
          </Tabs.Content>
        </Tabs.Root>
        <Button disabled>
          <Spinner />
          Loading
        </Button>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">
          <TrashIcon />
          Destructive
        </Button>
        <Button variant="outline">
          <CopyIcon />
          Outline
        </Button>
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
        <Flex $gap={1}>
          <Dropdown.Root>
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
          <Dropdown.Root>
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
          <Dropdown.Root>
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
        </Flex>
        <Button variant="link" as="a">
          Link
        </Button>
        <Button variant="ghost">Ghost</Button>
        <Popover.Root>
          <Popover.Trigger asChild>
            <Button variant="outline">Open popover</Button>
          </Popover.Trigger>
          <Popover.Content w="380px">
            <Flex $dir="column" $gap={1} $p={1}>
              <div className="space-y-2">
                <Heading as="h4">Dimensions</Heading>
                <BodyText>Set the dimensions for the layer.</BodyText>
              </div>
              <Flex $dir="column" $gap={0.5}>
                <Flex $gap={1} $align="center" $justify="space-between">
                  <Label htmlFor="width">Width</Label>
                  <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
                </Flex>
                <Flex $gap={1}>
                  <Label htmlFor="maxWidth">Max. width</Label>
                  <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
                </Flex>
                <div className="grid grid-cols-3 items-center $gap-4">
                  <Label htmlFor="height">Height</Label>
                  <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
                </div>
                <div className="grid grid-cols-3 items-center $gap-4">
                  <Label htmlFor="maxHeight">Max. height</Label>
                  <Input id="maxHeight" defaultValue="none" className="col-span-2 h-8" />
                </div>
              </Flex>
            </Flex>
          </Popover.Content>
        </Popover.Root>
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
        <br />
        <Flex $dir="column-reverse" $gap={'0.375rem'}>
          <Input type="text" id="email" placeholder="E-mail" disabled />
          <Label htmlFor="email">Email</Label>
        </Flex>
        <Flex $dir="column" $gap={'0.375rem'}>
          <Label htmlFor="avatar">Choose file</Label>
          <Input id="avatar" type="file" placeholder="Avatar" />
        </Flex>
        <Separator />
        <br />
        <Input disabled placeholder="Full name" />
      </Flex>
    </Container>
  );
}
