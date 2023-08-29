import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { PreferencesState, createPreferencesSlice } from './preferencesStoreSlice';
import { AuthenticationState, createAuthenticationSlice } from './authenticationStoreSlice';

export type StoreState = AuthenticationState & PreferencesState;

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        ...createPreferencesSlice(set, get),
        ...createAuthenticationSlice(set),
      }),
      {
        name: '@quickstart:auth',
        version: 0,
        partialize: ({ access, refresh, appearance }) => ({ access, refresh, appearance }),
      }
    ),
    { enabled: true }
  )
);
