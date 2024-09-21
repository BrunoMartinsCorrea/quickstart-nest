import axios, { AxiosRequestConfig, isAxiosError } from 'axios';
import { TokenDto } from '@/domain/authentication';
import { useGlobalStore } from '~/stores/useGlobalStore';
import { httpClient } from '../client';

httpClient.interceptors.response.use(undefined, async (error) => {
  if (isAxiosError(error)) {
    const { access, refresh, updateAccess, signOut } = useGlobalStore.getState();
    if (access && error.response?.status === 401) {
      try {
        const response = await axios.post<TokenDto>('/api/authentication/refresh', {
          refresh,
        });

        updateAccess(response.data);

        const configWithNewToken: AxiosRequestConfig = {
          ...error.config,
          headers: {
            ...error.config?.headers,
            Authorization: `Bearer ${response.data.access}`,
          },
        };

        const retryResponse = await axios.request(configWithNewToken);
        return Promise.resolve(retryResponse);
      } catch (_) {
        signOut();
      }
    }
  }

  return Promise.reject(error);
});
