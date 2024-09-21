import { GetState, SetState } from 'zustand';
import { GlobalStoreState } from './useGlobalStore';
import { ThemeOptions } from '@radix-ui/themes';

export type Theme = ThemeOptions & {
  followSystem: boolean;
};

export type PreferencesState = {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
};

const getPreferredTheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

export const createPreferencesSlice = (set: SetState<GlobalStoreState>, get: GetState<GlobalStoreState>) => ({
  theme: {
    accentColor: 'mint',
    radius: 'medium',
    scaling: '100%',
    appearance: getPreferredTheme(),
    followSystem: true,
  } as Theme,
  changeTheme: (theme: Theme) => {
    const html = document.querySelector('html');
    html?.classList.remove('dark', 'light');
    html?.classList.add(theme.followSystem ? getPreferredTheme() : theme.appearance);
    set({ theme });
  },
});
