import { Box, Tabs, Container } from '@radix-ui/themes';
import { SignInForm } from './components/SignInForm';
import { SignUpForm } from './components/SignUpForm';

export function Unlogged() {
  return (
    <Container mt="9" size="1">
      <Tabs.Root defaultValue="signin">
        <Tabs.List>
          <Tabs.Trigger value="signin">Sign In</Tabs.Trigger>
          <Tabs.Trigger value="signup">Sign Up</Tabs.Trigger>
        </Tabs.List>
        <Box mt="3">
          <Tabs.Content value="signin">
            <SignInForm />
          </Tabs.Content>
          <Tabs.Content value="signup">
            <SignUpForm />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Container>
  );
}
