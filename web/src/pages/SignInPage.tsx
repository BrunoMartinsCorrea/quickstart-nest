import { useStore } from "@/stores/useStore"
import {  Button } from '@/components/Button';
import { CopyIcon, TrashIcon } from "@radix-ui/react-icons";
import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import { Flex } from "@/components/Flex";
import { Separator } from "@/components/Separator";
import { Spinner } from "@/components/Spinner";
import { BodyText } from "@/components/Typography/BodyText";
import { Heading } from "@/components/Typography/Heading";
import * as Tabs from '@/components/Tabs';
import * as Card from "@/components/Card";
import * as Select from "@/components/Select";
import { Switch } from "@/components/Switch";
import { Checkbox } from "@/components/Checkbox";
import { Label } from "@/components/Label";
import { Avatar } from "@/components/Avatar/index.";

export default function SignInPage() {
  const store = useStore(state => state);

  return (
    <Container>
        <Flex direction="column" gap={1}>
        <Flex direction="row" gap="1rem" width="100%">
          <Flex direction="column" gap={1} flex={1}>
            <Heading>Password</Heading>
            <BodyText>
              aisdjjidsa
            </BodyText>
          </Flex>
          <Flex direction="column" gap="1rem">
            <Avatar src="https://github.com/gustavonogales.png" alt="@gustavonogales" fallback="GN"/>
          </Flex>
        </Flex>
        <Select.Root>
          <Select.Trigger className="w-[180px]">
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
            <Select.Separator />
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
        <Card.Root width="350px">
          <Card.Header>
            <Heading as="h3">Sign In</Heading>
            <BodyText>Welcome back. You've been missed!</BodyText>
          </Card.Header>
          <Card.Content>
            <Flex direction="column" gap="1rem" align="stretch">
              <Flex direction="column" gap={"0.375rem"}>
                <Label htmlFor="email">Email</Label>
                <Input type="text" id="email" placeholder="E-mail"/>
              </Flex>
              <Flex gap="0.5rem" align="center">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Airplane mode</Label>
              </Flex>
              <Select.Root>
                <Select.Trigger className="w-[180px]">
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
              <Flex align="center" gap="0.5rem">
                <Checkbox id="terms" disabled/>
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </Flex>
            </Flex>
          </Card.Content>
          <Card.Footer>
            <Button>Sign In</Button>
            <Button variant="link">Forgot password</Button>
          </Card.Footer>
        </Card.Root>
        <Tabs.Root defaultValue="signIn" width="1200px">
          <Tabs.List>
            <Tabs.Trigger value="signIn">Sign In</Tabs.Trigger>
            <Tabs.Trigger value="signUp">Sign Up</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="signIn">
            <Card.Root >
              <Card.Header>
                <Heading as="h3">Sign In</Heading>
                <BodyText>Welcome back. You've been missed!</BodyText>
              </Card.Header>
              <Card.Content>
                <Flex direction="column" gap={"0.375rem"}>
                  <Label htmlFor="email">Email</Label>
                  <Input type="text" id="email" placeholder="E-mail"/>
                </Flex>
              </Card.Content>
              <Card.Footer>
                <Button>Sign In</Button>
                <Button variant="link">Forgot password</Button>
              </Card.Footer>
            </Card.Root>
          </Tabs.Content>
          <Tabs.Content value="signUp">
            <Card.Root >
              <Card.Header>
                <Heading as="h3">Sign Up</Heading>
                <BodyText>Welcome back. You've been missed!</BodyText>
              </Card.Header>
              <Card.Content>
                <Flex direction="column" gap={"1rem"} align="stretch">
                  <Flex direction="column" gap={"0.375rem"}>
                    <Label htmlFor="email">Email</Label>
                    <Input type="text" id="email" placeholder="E-mail"/>
                  </Flex>
                  <Flex direction="column" gap={"0.375rem"}>
                    <Label htmlFor="fullname">Full me</Label>
                    <Input type="text" id="fullname" placeholder="Full name"/>
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
      <Button variant="secondary">
        Secondary
      </Button>
      <Button variant="destructive">
        <TrashIcon />
        Destructive
      </Button>
      <Button variant="outline">
        <CopyIcon />
        Outline
      </Button>
      <Button variant="link" as="a">
        Link
      </Button>
      <Button variant="ghost">
        Ghost
      </Button>
      <br />
      <Flex direction="column-reverse" gap={"0.375rem"}>
        <Input type="text" id="email" placeholder="E-mail" disabled/>
        <Label htmlFor="email">Email</Label>
      </Flex>
      <Flex direction="column" gap={"0.375rem"}>
        <Label htmlFor="avatar">Choose file</Label>
        <Input id="avatar"type="file" placeholder="Avatar"/>
      </Flex>
      <Separator />
      <br/>
      <Input disabled placeholder="Full name"/>
      </Flex>
    </Container>
  )

}
