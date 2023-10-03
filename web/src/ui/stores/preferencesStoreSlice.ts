import { GetState, SetState } from 'zustand';
import { GlobalStoreState } from './useGlobalStore';
import { ThemeOptions } from '@radix-ui/themes';

export type PreferencesState = {
  theme: ThemeOptions;
  changeTheme: (theme: ThemeOptions) => void;
};

export const createPreferencesSlice = (set: SetState<GlobalStoreState>, get: GetState<GlobalStoreState>) => ({
  theme: {
    accentColor: 'mint',
    radius: 'medium',
    scaling: '100%',
    appearance: 'light',
  } as ThemeOptions,
  changeTheme: (theme: ThemeOptions) => {
    const html = document.querySelector('html');
    const current = get().theme;
    html?.classList.remove(current.appearance);
    html?.classList.add(theme.appearance === 'inherit' ? 'system' : theme.appearance);
    set({ theme });
  },
});
