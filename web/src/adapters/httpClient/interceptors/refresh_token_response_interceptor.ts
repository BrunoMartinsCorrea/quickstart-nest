import { httpClient } from '../client';
import axios, { AxiosRequestConfig, isAxiosError } from 'axios';
import { TokenDto } from 'ui/services/authentication';
import { useStore } from '~/stores/useStore';

httpClient.interceptors.response.use(undefined, async (error) => {
  if (isAxiosError(error)) {
    const { access, refresh, updateAccess, signOut } = useStore.getState();
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
