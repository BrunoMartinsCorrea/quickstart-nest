import type { Meta, StoryObj } from '@storybook/react';
import * as Card from './index';
import { Heading } from '../Typography/Heading';
import { BodyText } from '../Typography/BodyText';
import { Flex } from '../layout';
import { Input, Label } from '../Form';
import { Button } from '../Button';

const meta: Meta<typeof Card.Root> = {
  component: Card.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    $maxW: "480px"
  }
};

export default meta;
type Story = StoryObj<typeof Card.Root>;

export const Default: Story = {
  render: (props) => {
    return (
      <Card.Root {...props}>
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
            <Flex $dir="column" $gap={'0.375rem'}>
              <Label htmlFor="password">Email</Label>
              <Input type="password" id="password" placeholder="Password" />
            </Flex>
          </Flex>
        </Card.Content>
        <Card.Footer>
          <Button>Sign In</Button>
          <Button variant="link">Forgot password</Button>
        </Card.Footer>
      </Card.Root>
    )
  }
}

