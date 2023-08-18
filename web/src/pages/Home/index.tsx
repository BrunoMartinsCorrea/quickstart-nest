import { useStore } from '@/stores/useStore';
import { Button, Container, Flex, Heading } from '@radix-ui/themes';

export function Home() {
  const signOut = useStore((state) => state.signOut);

  return (
    <Container>
      <Flex direction="column" gap="3" align="start">
        <Heading>Home</Heading>
        <Button onClick={signOut}>Sign Out</Button>
      </Flex>
    </Container>
  );
}
