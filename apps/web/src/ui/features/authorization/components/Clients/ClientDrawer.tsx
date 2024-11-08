import { TextFieldWithLabel } from '~/components/TextFieldWithLabel';
import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Button, Text } from '@radix-ui/themes';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';
import * as Drawer from '~/components/Drawer';
import { useCreateClient, useUpdateClient } from '../../hooks/clients';
import { useToast } from '~/hooks/useToast';
import { ResponseError } from '~/types/ResponseError';
import { TextAreaWithLabel } from '~/components/TextAreaWithLabel';
import { Client } from '@/domain/authorization';

const clientSchema = z.object({
  name: z.string().nonempty('form.fields.name.required'),
  description: z.string().nonempty('form.fields.description.required'),
});

type ClientFormData = z.infer<typeof clientSchema>;

interface ClientDrawerProps {
  client?: Client;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClientDrawer({ client, open, onOpenChange }: ClientDrawerProps) {
  const { toast } = useToast();
  const { t, i18n } = useTranslation('authorization', { keyPrefix: 'clients' });
  const { register, handleSubmit, formState, reset } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });
  const { errors, isDirty } = formState;

  const createMutation = useCreateClient();
  const updateMutation = useUpdateClient();

  const isSuccess = createMutation.isSuccess || updateMutation.isSuccess;
  const isLoading = createMutation.isLoading || updateMutation.isLoading;
  const isMutateError = createMutation.isError || updateMutation.isError;
  const error = createMutation.error || updateMutation.error;

  const isNew = !client;
  const translationKey = isNew ? 'new' : 'edit';

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(i18n.language, {
        dateStyle: 'long',
        timeStyle: 'medium',
      }),
    [i18n.language]
  );

  const isActionsDisabled = isLoading || !isDirty;

  async function handleSave(data: ClientFormData) {
    if (isNew) {
      createMutation.mutate(data);
    } else {
      updateMutation.mutate({
        id: client!.id,
        data,
      })
    }

    onOpenChange(false);
  }

  useEffect(() => {
    reset({
      name: client?.name,
      description: client?.description,
    });
  }, [open]);

  useEffect(() => {
    if (isSuccess) {
      onOpenChange(false);
      toast({
        title: t(`form.result.${translationKey}.success.title`),
        description: t(`form.result.${translationKey}.success.description`),
      });
    } else if (isMutateError) {
      toast({
        title: (error as ResponseError).message,
      });
    }
  }, [isSuccess, error, isMutateError]);

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <form onSubmit={handleSubmit(handleSave)}>
        <Flex direction="column">
          <Drawer.Header
            title={t(`form.title.${translationKey}`)}
            description={t(`form.description.${translationKey}`)}
          />
          <Drawer.Content>
            <Flex direction="column" gap="4" justify="center">
              <TextFieldWithLabel
                label={t('form.fields.name.label')}
                placeholder={t('form.fields.name.label')}
                errorText={errors.name?.message ? t(errors.name?.message as 'form.fields.name.label') : ''}
                {...register('name')}
              />
              <TextAreaWithLabel
                label={t('form.fields.description.label')}
                placeholder={t('form.fields.description.label')}
                errorText={
                  errors.description?.message ? t(errors.description?.message as 'form.fields.name.label') : ''
                }
                {...register('description')}
              />
              {client && (
                <>
                  <Flex direction="column" gap="4">
                    <Flex direction="column" gap="1">
                      <Text size="2">{t('schema.createdAt')}</Text>
                      <Text size="2" mt="0" as="span" color="gray">
                        {dateFormatter.format(client.createdAt)}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex direction="column" gap="4">
                    <Flex direction="column" gap="1">
                      <Text size="2">{t('schema.updatedAt')}</Text>
                      <Text size="2" mt="0" as="span" color="gray">
                        {dateFormatter.format(client.updatedAt)}
                      </Text>
                    </Flex>
                  </Flex>
                </>
              )}
            </Flex>
          </Drawer.Content>
        </Flex>
        <Drawer.Footer>
          <Flex justify="end">
            <Button type="submit" disabled={isActionsDisabled}>
              {t(`form.action.${translationKey}`)}
            </Button>
          </Flex>
        </Drawer.Footer>
      </form>
    </Drawer.Root>
  );
}
