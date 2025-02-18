import { TextFieldWithLabel } from '~/components/TextFieldWithLabel';
// import { useStore } from '@/stores/useGlobalStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Card, Flex, Text, TextField, IconButton, Button } from '@radix-ui/themes';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';

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
          <TextFieldWithLabel
            label={t('fields.email.label')}
            placeholder={t('fields.email.label')}
            errorText={t((errors.email?.message ?? '') as 'fields.email.label')}
            {...register('email')}
          />
          <TextFieldWithLabel
            label={t('fields.fullName.label')}
            placeholder={t('fields.fullName.label')}
            errorText={t((errors.fullName?.message ?? '') as 'fields.email.label')}
            {...register('fullName')}
          />
          <TextFieldWithLabel
            label={t('fields.password.label')}
            htmlFor={passwordId}
            errorText={t((errors.password?.message ?? '') as 'fields.email.label', { length: 6 })}
          >
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
          </TextFieldWithLabel>
          <TextFieldWithLabel
            label={t('fields.confirmPassword.label')}
            htmlFor={confirmPasswordId}
            errorText={t((errors.confirmPassword?.message ?? '') as 'fields.email.label')}
          >
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
          </TextFieldWithLabel>
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
