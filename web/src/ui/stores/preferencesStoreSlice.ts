import { GetState, SetState } from 'zustand';
import { GlobalStoreState } from './useGlobalStore';

type Appearance = 'light' | 'dark';

export type PreferencesState = {
  appearance: Appearance;
  changeAppearance: (appearance: Appearance) => void;
};

export const createPreferencesSlice = (set: SetState<GlobalStoreState>, get: GetState<GlobalStoreState>) => ({
  appearance: 'light' as const,
  changeAppearance: (value: Appearance) => {
    const html = document.querySelector('html');
    const current = get().appearance;
    html?.classList.remove(current);
    html?.classList.add(value);
    set({ appearance: value });
  },
});
