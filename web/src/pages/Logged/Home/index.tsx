import { useStore } from '@/stores/useStore';
import { Button, Flex, Heading } from '@radix-ui/themes';
import { httpClient } from '@/adapters/httpClient';
import { SignUpForm } from '@/pages/Unlogged/components/SignUpForm';

export function Home() {
  const signOut = useStore((state) => state.signOut);

  function handleRequest() {
    httpClient.get(`/user/ce8ea3d2-2fc0-4747-99c1-209f6cefb95f`).then((res) => {
      console.log(res);
    });
  }

  return (
    <Flex direction="column" gap="3" align="start">
      <Heading>Home</Heading>
      <SignUpForm />
      <Button onClick={signOut}>Sign Out</Button>
      <Button onClick={handleRequest}>REQUEST</Button>
    </Flex>
  );
}
