import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Card, Flex, Text, TextField, IconButton, Button, Link } from '@radix-ui/themes';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useGlobalStore } from '~/stores/useGlobalStore';
import { useTranslation } from 'react-i18next';
import { useToast } from '~/hooks/useToast';
import { ResponseError } from '~/types/ResponseError';
import { FormGroup } from '~/components/FormGroup';

const signInSchema = z.object({
  username: z.string().nonempty('fields.email.required'),
  password: z.string().nonempty('fields.password.required'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const { t } = useTranslation();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const signIn = useGlobalStore((state) => state.signIn);
  const passwordId = useId();
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });
  const { errors, isLoading } = formState;
  const { toast } = useToast();

  function togglePasswordVisibility() {
    setVisiblePassword((state) => !state);
  }

  async function handleSignIn(data: SignInFormData) {
    try {
      await signIn(data);
    } catch (e) {
      if (e instanceof ResponseError && e.statusCode === 401) {
        toast({
          title: t('errors.signIn.title'),
          description: t('errors.signIn.description'),
        });
      }
    }
  }

  return (
    <Card>
      <Flex direction="column" gap="4" justify="center" p="1" asChild>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <Text size="2">{t('unlogged.signIn.welcome')}</Text>
          <FormGroup.Root>
            <FormGroup.Label>{t('fields.email.label')}</FormGroup.Label>
            <TextField.Root
              placeholder={t('fields.email.label')}
              {...register('username')}
            />
            {errors.username && (
              <FormGroup.ErrorText>
                {t(errors.username.message as 'fields.email.label')}
              </FormGroup.ErrorText>
            )}
          </FormGroup.Root>
          <FormGroup.Root>
            <FormGroup.Label>{t('fields.password.label')}</FormGroup.Label>
            <TextField.Root
              id={passwordId}
              placeholder={t('fields.password.label')}
              type={visiblePassword ? 'text' : 'password'}
              {...register('password')}
            >
              <TextField.Slot>
                <IconButton type="button" variant="ghost" onClick={togglePasswordVisibility}>
                  {visiblePassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </IconButton>
              </TextField.Slot>
            </TextField.Root>
            {errors.password && (
              <FormGroup.ErrorText>
                {t(errors.password.message as 'fields.email.label')}
              </FormGroup.ErrorText>
            )}
          </FormGroup.Root>
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
