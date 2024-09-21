import { useStore } from 'zustand';
import { useUsersContext } from '../contexts/userContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UserService } from '@/domain/user';
import { queryClient } from 'ui/App';

export const useDeleteDialog = () => useStore(useUsersContext()!, (state) => state.openDeleteDialog);
export const useCloseDeleteDialog = () => useStore(useUsersContext()!, (state) => state.closeDeleteDialog);
export const useIsDeleteDialogOpen = () => useStore(useUsersContext()!, (state) => state.deleteDialogOpen);
export const useSelectedUsers = () => useStore(useUsersContext()!, (state) => state.selectedUsers);

export const useUsers = ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) =>
  useQuery(['users', pageIndex, pageSize], () => UserService.listAll({ page: pageIndex + 1, limit: pageSize }));

export const useCreateUser = () =>
  useMutation({
    mutationFn: UserService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
