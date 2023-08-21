import { useStore } from '@/stores/useStore';
import { httpClient } from '../client';

httpClient.interceptors.request.use((request) => {
  const token = useStore.getState().access;
  request.headers.Authorization = token ? `Bearer ${token}` : '';
  return request;
}, undefined);
