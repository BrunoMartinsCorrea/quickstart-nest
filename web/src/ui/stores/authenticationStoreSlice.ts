import { SetState } from 'zustand';
import { StoreState } from './useStore';
import { AuthenticationService, CredentialsDto, TokenDto } from '@/domain/authentication';

export type AuthenticationState = {
  access?: string;
  refresh?: string;
  signOut: () => void;
  updateAccess: (payload: TokenDto) => void;
  signIn: (payload: CredentialsDto) => Promise<void>;
};

export const createAuthenticationSlice = (set: SetState<StoreState>) => ({
  access: undefined,
  refresh: undefined,
  signOut: () => set({ access: undefined, refresh: undefined }),
  updateAccess: ({ access, refresh }: TokenDto) => set({ access, refresh }),
  signIn: async (payload: CredentialsDto) => {
    const { access, refresh } = await AuthenticationService.token(payload);
    set({ access, refresh });
  },
});
