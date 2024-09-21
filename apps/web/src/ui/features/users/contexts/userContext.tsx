import { createContext, useContext, useRef } from 'react';
import { createUserStore } from '../stores/userStore';

const UserContext = createContext<ReturnType<typeof createUserStore> | null>(null);

export const useUsersContext = () => useContext(UserContext);

export function UserContextProvider(props) {
  const store = useRef(createUserStore());

  return <UserContext.Provider value={store.current} {...props} />;
}
