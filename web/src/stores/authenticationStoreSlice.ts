import { SetState } from 'zustand';
import { StoreState } from '@/stores/useStore';
import { AuthenticationService, CredentialsDto } from '@/services/authentication';
import { CreateUserDto, UserService } from '@/services/user';

export type AuthenticationState = {
  access?: string;
  refresh?: string;
  signOut: () => void;
  signIn: (payload: CredentialsDto) => Promise<void>;
  signUp: (payload: CreateUserDto) => Promise<void>;
};

export const createAuthenticationSlice = (set: SetState<StoreState>) => ({
  access: undefined,
  refresh: undefined,
  signOut: () => set({ access: undefined, refresh: undefined }),
  signIn: async (payload: CredentialsDto) => {
    const { access, refresh } = await AuthenticationService.token(payload);
    set({ access, refresh });
  },
  signUp: async (payload: CreateUserDto) => UserService.create(payload),
});
