import { SetState } from 'zustand';
import { StoreState } from '@/stores/useStore';

export type AuthenticationState = {
  token?: string;
  signOut: () => void;
};

export const createAuthenticationSlice = (set: SetState<StoreState>) => ({
  token: 'xyz',
  signOut: () => set({ token: undefined }),
});
