import { ResponseError } from '@/types/ResponseError';
import { httpClient } from '../client';
import { toast } from '@/hooks/useToast';
import { isAxiosError } from 'axios';
import i18n from 'i18next';

httpClient.interceptors.response.use(undefined, (error) => {
  const defaultError = new ResponseError({
    statusCode: 500,
    message: 'Unexpected Error',
    errorCode: 'UNEXPECTED_ERROR',
    timestamp: new Date().toISOString(),
  });

  if (isAxiosError(error)) {
    if (error.response) {
      if (error.response.data.errorCode) {
        const response = new ResponseError(error.response.data);
        if (response.statusCode === 500) {
          toast({
            title: i18n.t('errors.generic.title'),
            description: i18n.t('errors.generic.description'),
          });
        }
        return Promise.reject(response);
      }
      return Promise.reject(defaultError);
    } else if (error.code === 'ERR_NETWORK') {
      toast({
        title: i18n.t('errors.network.title'),
        description: i18n.t('errors.network.description'),
      });
      return Promise.reject(
        new ResponseError({
          ...defaultError,
          errorCode: 'NETWORK_ERROR',
        })
      );
    }
    return Promise.reject(defaultError);
  }
  return Promise.reject(defaultError);
});
