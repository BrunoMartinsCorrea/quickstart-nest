import { GetState, SetState } from 'zustand';
import { StoreState } from '@/stores/useStore';
import { PaginatedResponseDto, PaginationDto } from '@/domain/common';
import { User, UserService } from '@/domain/user';

export type UserState = {
  users: PaginatedResponseDto<User>;
  getUsers: (pagination: PaginationDto) => Promise<void>;
};

export const createUserSlice = (set: SetState<StoreState>, get: GetState<StoreState>) => ({
  users: {
    totalCount: 0,
    limit: 10,
    page: 1,
    results: [],
  } as PaginatedResponseDto<User>,
  getUsers: async (pagination: PaginationDto) => {
    const response = await UserService.listAll(pagination);
    set({ users: response });
  },
});
