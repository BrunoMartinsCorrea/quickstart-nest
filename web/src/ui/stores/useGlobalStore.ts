import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { PreferencesState, createPreferencesSlice } from './preferencesStoreSlice';
import { AuthenticationState, createAuthenticationSlice } from './authenticationStoreSlice';

export type GlobalStoreState = AuthenticationState & PreferencesState;

export const useGlobalStore = create<GlobalStoreState>()(
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
