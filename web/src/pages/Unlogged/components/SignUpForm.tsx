import { TextFieldWithLabel } from '@/components/TextFieldWithLabel';
import { useStore } from '@/stores/useStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Card, Flex, Text, TextField, IconButton, Button } from '@radix-ui/themes';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const signUpFormSchema = z
  .object({
    email: z.string().nonempty('Email is required').email('Email not valid'),
    fullName: z.string().nonempty('Name is required'),
    password: z.string().min(6, 'Password must have at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords does not match',
    path: ['confirmPassword'],
  });

type SignUpFormData = z.infer<typeof signUpFormSchema>;

export function SignUpForm() {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const signUp = useStore((state) => state.signUp);
  const passwordId = useId();
  const confirmPasswordId = useId();
  const { register, handleSubmit, formState } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });
  const { errors, isLoading } = formState;

  function togglePasswordVisibility() {
    setVisiblePassword((state) => !state);
  }

  async function handleSignUp(data: SignUpFormData) {
    const { email, fullName, password } = data;
    await signUp({
      username: email,
      email,
      fullName,
      password,
    });
  }

  return (
    <Card>
      <Flex direction="column" gap="4" justify="center" p="1" asChild>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <Text size="2">Welcome. Sign up and discover a great amount of new features to scale your business</Text>
          <TextFieldWithLabel
            label="Email"
            placeholder="Email"
            errorText={errors.email?.message}
            {...register('email')}
          />
          <TextFieldWithLabel
            label="Full name"
            placeholder="Full name"
            errorText={errors.fullName?.message}
            {...register('fullName')}
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
          <TextFieldWithLabel label="Password" htmlFor={confirmPasswordId} errorText={errors.confirmPassword?.message}>
            <TextField.Root>
              <TextField.Input
                id={confirmPasswordId}
                placeholder="Confirm password"
                type={visiblePassword ? 'text' : 'password'}
                {...register('confirmPassword')}
              />
              <TextField.Slot>
                <IconButton type="button" variant="ghost" onClick={togglePasswordVisibility}>
                  {visiblePassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </IconButton>
              </TextField.Slot>
            </TextField.Root>
          </TextFieldWithLabel>
          <Flex>
            <Button type="submit" disabled={isLoading}>
              Sign Up
            </Button>
          </Flex>
        </form>
      </Flex>
    </Card>
  );
}
