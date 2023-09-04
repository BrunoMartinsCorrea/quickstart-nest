import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { PaginatedResponseDto, PaginationDto } from '@/domain/common';
import { User, UserService } from '@/domain/user';

type State = {
  selectedUsers: User[];
  deleteDialogOpen: boolean;
};

type Actions = {
  getUsers: (pagination: PaginationDto) => Promise<PaginatedResponseDto<User>>;
  openDeleteDialog: (users: User[]) => void;
  closeDeleteDialog: () => void;
};

export const createUserStore = () =>
  create(
    immer<State & Actions>((set) => ({
      deleteDialogOpen: false,
      selectedUsers: [],
      getUsers: async ({ page, limit }: PaginationDto) => {
        const response = await UserService.listAll({ page: page + 1, limit });
        return response;
      },
      openDeleteDialog: (selectedUsers: User[]) => set({ selectedUsers, deleteDialogOpen: true }),
      closeDeleteDialog: () => set({ selectedUsers: [], deleteDialogOpen: false }),
    })),
  );
