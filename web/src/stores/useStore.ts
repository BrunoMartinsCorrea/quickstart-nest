import { AuthenticationState, createAuthenticationSlice } from '@/stores/authenticationStoreSlice';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type StoreState = AuthenticationState;

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        ...createAuthenticationSlice(set),
      }),
      {
        name: '@quickstart:auth',
        version: 0,
        partialize: ({ access, refresh }) => ({ access, refresh }),
      },
    ),
    { enabled: true },
  ),
);
