import { TextFieldWithLabel } from '@/components/TextFieldWithLabel';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Card, Flex, Text, TextField, IconButton, Button, Link } from '@radix-ui/themes';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useStore } from '@/stores/useStore';
import { useTranslation } from 'react-i18next';

const signInSchema = z.object({
  username: z.string().nonempty('fields.email.required'),
  password: z.string().nonempty('fields.password.required'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const { t } = useTranslation();
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
          <Text size="2">{t('unlogged.signIn.welcome')}</Text>
          <TextFieldWithLabel
            label={t('fields.email.label')}
            placeholder={t('fields.email.label')}
            errorText={t(errors.username?.message ?? '')}
            {...register('username')}
          />
          <TextFieldWithLabel
            label={t('fields.password.label')}
            htmlFor={passwordId}
            errorText={t(errors.password?.message ?? '')}
          >
            <TextField.Root>
              <TextField.Input
                id={passwordId}
                placeholder={t('fields.password.label')}
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
              {t('unlogged.signIn.signIn')}
            </Button>
            <Link size="2">{t('unlogged.signIn.forgotPassword')}</Link>
          </Flex>
        </form>
      </Flex>
    </Card>
  );
}
