import { useGlobalStore } from '~/stores/useGlobalStore';
import { httpClient } from '../client';
import i18next from 'i18next';

httpClient.interceptors.request.use((request) => {
  const token = useGlobalStore.getState().access;
  request.headers.Authorization = token ? `Bearer ${token}` : '';
  request.headers['Accept-Language'] = i18next.language;
  return request;
}, undefined);
