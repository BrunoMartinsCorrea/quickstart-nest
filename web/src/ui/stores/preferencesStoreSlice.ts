import { GetState, SetState } from 'zustand';
import { StoreState } from './useStore';

type Appearance = 'light' | 'dark';

export type PreferencesState = {
  appearance: Appearance;
  changeAppearance: (appearance: Appearance) => void;
};

export const createPreferencesSlice = (set: SetState<StoreState>, get: GetState<StoreState>) => ({
  appearance: 'light' as const,
  changeAppearance: (value: Appearance) => {
    const html = document.querySelector('html');
    const current = get().appearance;
    html?.classList.remove(current);
    html?.classList.add(value);
    set({ appearance: value });
  },
});
