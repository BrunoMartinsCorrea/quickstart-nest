import { SetState } from 'zustand';
import { StoreState } from '@/stores/useStore';
import { AuthenticationService, CredentialsDto, TokenDto } from '@/services/authentication';
import { CreateUserDto, UserService } from '@/services/user';

export type AuthenticationState = {
  access?: string;
  refresh?: string;
  signOut: () => void;
  updateAccess: (payload: TokenDto) => void;
  signIn: (payload: CredentialsDto) => Promise<void>;
  signUp: (payload: CreateUserDto) => Promise<void>;
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
  signUp: async (payload: CreateUserDto) => UserService.create(payload),
});
