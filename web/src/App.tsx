import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { Theme, ThemePanel } from '@radix-ui/themes';

export function App() {
  return (
    <Theme appearance="dark" accentColor="bronze" grayColor="mauve" panelBackground="solid">
      {import.meta.env.DEV && <ThemePanel />}
      <RouterProvider router={router} />
    </Theme>
  );
}
