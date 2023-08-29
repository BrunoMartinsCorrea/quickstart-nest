import { useStore } from 'zustand';
import { useUsersContext } from '../contexts/userContext';

export const useGetUsers = () => useStore(useUsersContext()!, (state) => state.getUsers);
export const useDeleteDialog = () => useStore(useUsersContext()!, (state) => state.openDeleteDialog);
export const useCloseDeleteDialog = () => useStore(useUsersContext()!, (state) => state.closeDeleteDialog);
export const useIsDeleteDialogOpen = () => useStore(useUsersContext()!, (state) => state.deleteDialogOpen);
export const useSelectedUsers = () => useStore(useUsersContext()!, (state) => state.selectedUsers);
