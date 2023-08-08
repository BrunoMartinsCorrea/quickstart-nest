import { AuthenticationState, createAuthenticationSlice } from "@/stores/authenticationStoreSlice";
import { create } from "zustand";

export type StoreState =  AuthenticationState;

export const useStore = create<StoreState>((set) => ({
  ...createAuthenticationSlice(set),
}))
