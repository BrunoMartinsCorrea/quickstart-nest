import { useStore } from '@/stores/useStore';
import { Button, Container, Flex, Heading } from '@radix-ui/themes';
import { SignUpForm } from '../Unlogged/components/SignUpForm';
import { httpClient } from '@/adapters/httpClient';

export function Home() {
  const signOut = useStore((state) => state.signOut);

  function handleRequest() {
    httpClient.get(`/user/ce8ea3d2-2fc0-4747-99c1-209f6cefb95f`).then((res) => {
      console.log(res);
    });
  }

  return (
    <Container>
      <Flex direction="column" gap="3" align="start">
        <Heading>Home</Heading>
        <SignUpForm />
        <Button onClick={signOut}>Sign Out</Button>
        <Button onClick={handleRequest}>REQUEST</Button>
      </Flex>
    </Container>
  );
}
