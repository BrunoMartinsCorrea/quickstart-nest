import { ClientService } from '@/domain/authorization';
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
