// import { useStore } from '@/stores/useGlobalStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Card, Flex, Text, TextField, IconButton, Button } from '@radix-ui/themes';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';
import { FormGroup } from '~/components/FormGroup';

const signUpFormSchema = z
  .object({
    email: z.string().nonempty('fields.email.required').email('fields.email.invalid'),
    fullName: z.string().nonempty('fields.fullName.required'),
    password: z.string().min(6, 'fields.password.min'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'fields.confirmPassword.notMatch',
    path: ['confirmPassword'],
  });

type SignUpFormData = z.infer<typeof signUpFormSchema>;

export function SignUpForm() {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const { t } = useTranslation();
  // const signUp = useStore((state) => state.signUp);
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
    // const { email, fullName, password } = data;
    // await signUp({
    //   username: email,
    //   email,
    //   fullName,
    //   password,
    // });
  }

  return (
    <Card>
      <Flex direction="column" gap="4" justify="center" p="1" asChild>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <Text size="2">{t('unlogged.signUp.welcome')}</Text>
          <FormGroup.Root>
            <FormGroup.Label>{t('fields.email.label')}</FormGroup.Label>
            <TextField.Root
              placeholder={t('fields.email.label')}
              {...register('email')}
            />
            {errors.email && (
              <FormGroup.ErrorText>
                {t(errors.email.message as 'fields.email.label')}
              </FormGroup.ErrorText>
            )}
          </FormGroup.Root>
          <FormGroup.Root>
            <FormGroup.Label>{t('fields.fullName.label')}</FormGroup.Label>
            <TextField.Root
              placeholder={t('fields.fullName.label')}
              {...register('fullName')}
            />
            {errors.fullName && (
              <FormGroup.ErrorText>
                {t(errors.fullName.message as 'fields.email.label')}
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
                {t(errors.password.message as 'fields.email.label', { length: 6 })}
              </FormGroup.ErrorText>
            )}
          </FormGroup.Root>
          <FormGroup.Root>
            <FormGroup.Label>{t('fields.confirmPassword.label')}</FormGroup.Label>
            <TextField.Root
              id={confirmPasswordId}
              placeholder={t('fields.confirmPassword.label')}
              type={visiblePassword ? 'text' : 'password'}
              {...register('confirmPassword')}
            >
              <TextField.Slot>
                <IconButton type="button" variant="ghost" onClick={togglePasswordVisibility}>
                  {visiblePassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </IconButton>
              </TextField.Slot>
            </TextField.Root>
            {errors.confirmPassword && (
              <FormGroup.ErrorText>
                {t(errors.confirmPassword.message as 'fields.email.label')}
              </FormGroup.ErrorText>
            )}
          </FormGroup.Root>
          <Flex>
            <Button type="submit" disabled={isLoading}>
              {t('unlogged.signUp.signUp')}
            </Button>
          </Flex>
        </form>
      </Flex>
    </Card>
  );
}
