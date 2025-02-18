import { zodResolver } from '@hookform/resolvers/zod';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Flex, TextField, IconButton, Button } from '@radix-ui/themes';
import { ReactElement, useEffect, useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';
import * as Drawer from '~/components/Drawer';
import { useCreateUser } from '../hooks';
import { useToast } from '~/hooks/useToast';
import { ResponseError } from '~/types/ResponseError';
import { FormGroup } from '~/components/FormGroup';

const signUpFormSchema = z
  .object({
    email: z.string().nonempty('form.fields.email.required').email('form.fields.email.invalid'),
    fullName: z.string().nonempty('form.fields.fullName.required'),
    password: z.string().min(6, 'form.fields.password.min'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'form.fields.confirmPassword.notMatch',
    path: ['confirmPassword'],
  });

type SignUpFormData = z.infer<typeof signUpFormSchema>;

interface NewUserDrawerProps {
  children: ReactElement;
  isNew?: boolean;
}

export function NewUserDrawer({ isNew = true, children }: NewUserDrawerProps) {
  const { toast } = useToast();
  const { t } = useTranslation('users');
  const passwordId = useId();
  const confirmPasswordId = useId();
  const [open, setOpen] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });
  const { errors } = formState;
  const { mutate, isSuccess, isLoading, error, isError: isMutateError } = useCreateUser();
  const translationKey = isNew ? 'new' : 'edit';

  function togglePasswordVisibility() {
    setVisiblePassword((state) => !state);
  }

  function onDrawerOpenChange(open: boolean) {
    setOpen(open);
    open && reset();
  }

  async function handleCreate(data: SignUpFormData) {
    const { email, fullName, password } = data;
    mutate({ email, fullName, password, username: data.email });
  }

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      toast({
        title: t('form.result.success.title'),
        description: t('form.result.success.description'),
      });
    } else if (isMutateError) {
      toast({
        title: (error as ResponseError).message,
      });
    }
  }, [isSuccess, error, isMutateError]);

  return (
    <Drawer.Root trigger={children} open={open} onOpenChange={onDrawerOpenChange}>
      <form onSubmit={handleSubmit(handleCreate)}>
        <Flex direction="column">
          <Drawer.Header
            title={t(`form.title.${translationKey}`)}
            description={t(`form.description.${translationKey}`)}
          />
          <Drawer.Content>
            <Flex direction="column" gap="4" justify="center">
              <FormGroup.Root>
                <FormGroup.Label>{t('form.fields.fullName.label')}</FormGroup.Label>
                <TextField.Root
                  placeholder={t('form.fields.fullName.label')}
                  {...register('fullName')}
                />
                {errors.fullName?.message && (
                  <FormGroup.ErrorText>
                    {t(errors.fullName?.message as 'form.fields.email.label')}
                  </FormGroup.ErrorText>
                )}
              </FormGroup.Root>
              <FormGroup.Root>
                <FormGroup.Label>{t('form.fields.email.label')}</FormGroup.Label>
                <TextField.Root
                  placeholder={t('form.fields.email.label')}
                  {...register('email')}
                />
                {errors.email?.message && (
                  <FormGroup.ErrorText>
                    {t(errors.email?.message as 'form.fields.email.label')}
                  </FormGroup.ErrorText>
                )}
              </FormGroup.Root>
              <FormGroup.Root>
                <FormGroup.Label>{t('form.fields.password.label')}</FormGroup.Label>
                <TextField.Root
                  id={passwordId}
                  placeholder={t('form.fields.password.label')}
                  type={visiblePassword ? 'text' : 'password'}
                  {...register('password')}
                >
                  <TextField.Slot>
                    <IconButton type="button" variant="ghost" onClick={togglePasswordVisibility}>
                      {visiblePassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                    </IconButton>
                  </TextField.Slot>
                </TextField.Root>
                {errors.password?.message && (
                  <FormGroup.ErrorText>
                    {t(errors.password?.message as 'form.fields.email.label', { length: 6 })}
                  </FormGroup.ErrorText>
                )}
              </FormGroup.Root>
              <FormGroup.Root>
                <FormGroup.Label>{t('form.fields.confirmPassword.label')}</FormGroup.Label>
                <TextField.Root
                  id={confirmPasswordId}
                  placeholder={t('form.fields.confirmPassword.label')}
                  type={visiblePassword ? 'text' : 'password'}
                  {...register('confirmPassword')}
                >
                  <TextField.Slot>
                    <IconButton type="button" variant="ghost" onClick={togglePasswordVisibility}>
                      {visiblePassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                    </IconButton>
                  </TextField.Slot>
                </TextField.Root>
                {errors.confirmPassword?.message && (
                  <FormGroup.ErrorText>
                    {t(errors.confirmPassword?.message as 'form.fields.email.label')}
                  </FormGroup.ErrorText>
                )}
              </FormGroup.Root>
            </Flex>
          </Drawer.Content>
        </Flex>
        <Drawer.Footer>
          <Flex justify="end">
            <Button type="submit" disabled={isLoading}>
              {t(`form.action.${translationKey}`)}
            </Button>
          </Flex>
        </Drawer.Footer>
      </form>
    </Drawer.Root>
  );
}
