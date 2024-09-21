import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { User } from '@/domain/user';

type State = {
  selectedUsers: User[];
  deleteDialogOpen: boolean;
};

type Actions = {
  openDeleteDialog: (users: User[]) => void;
  closeDeleteDialog: () => void;
};

export const createUserStore = () =>
  create(
    immer<State & Actions>((set) => ({
      deleteDialogOpen: false,
      selectedUsers: [],
      openDeleteDialog: (selectedUsers: User[]) => set({ selectedUsers, deleteDialogOpen: true }),
      closeDeleteDialog: () => set({ selectedUsers: [], deleteDialogOpen: false }),
    }))
  );
