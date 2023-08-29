import { UserContextProvider } from './contexts/userContext';
import { UsersList } from './pages/list';

export default function Users() {
  return (
    <UserContextProvider>
      <UsersList />
    </UserContextProvider>
  );
}
