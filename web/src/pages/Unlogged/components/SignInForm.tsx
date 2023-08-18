import { TextFieldWithLabel } from '@/components/TextFieldWithLabel';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Card, Flex, Text, TextField, IconButton, Button, Link } from '@radix-ui/themes';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useStore } from '@/stores/useStore';

const signInSchema = z.object({
  username: z.string().min(1, 'Email is required'),
  password: z.string().nonempty('Password is required'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const signIn = useStore((state) => state.signIn);
  const passwordId = useId();
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });
  const { errors, isLoading } = formState;

  function togglePasswordVisibility() {
    setVisiblePassword((state) => !state);
  }

  return (
    <Card>
      <Flex direction="column" gap="4" justify="center" p="1" asChild>
        <form onSubmit={handleSubmit(signIn)}>
          <Text size="2">Welcome back. You've been missed! {}</Text>
          <TextFieldWithLabel
            label="Email"
            placeholder="Email"
            errorText={errors.username?.message}
            {...register('username')}
          />
          <TextFieldWithLabel label="Password" htmlFor={passwordId} errorText={errors.password?.message}>
            <TextField.Root>
              <TextField.Input
                id={passwordId}
                placeholder="Password"
                type={visiblePassword ? 'text' : 'password'}
                {...register('password')}
              />
              <TextField.Slot>
                <IconButton type="button" variant="ghost" onClick={togglePasswordVisibility}>
                  {visiblePassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </IconButton>
              </TextField.Slot>
            </TextField.Root>
          </TextFieldWithLabel>
          <Flex justify="between" align="center">
            <Button type="submit" disabled={isLoading}>
              Sign In
            </Button>
            <Link size="2">Forgot Password</Link>
          </Flex>
        </form>
      </Flex>
    </Card>
  );
}
