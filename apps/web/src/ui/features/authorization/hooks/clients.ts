import { ClientDto, ClientService } from '@/domain/authorization';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from 'ui/App';

export const useClients = ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) =>
  useQuery(['clients', pageIndex, pageSize], () => ClientService.listAll({ page: pageIndex + 1, limit: pageSize }));

export const useCreateClient = () =>
  useMutation({
    mutationFn: ClientService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });

export const useUpdateClient = () =>
  useMutation({
    mutationFn: ({ id, data }:{ id: string, data: ClientDto }) => ClientService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });

export const useUpdateStatusClient = () => useMutation({
  mutationFn: ({ id, active }: { id: string, active: boolean }) => ClientService.updateStatus(id, active),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['clients'] });
  },
});

export const useDeleteClient = () => useMutation({
  mutationFn: (id: string) => ClientService.delete(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['clients'] });
  },
});
