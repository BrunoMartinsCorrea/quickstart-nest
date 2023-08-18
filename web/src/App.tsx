import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { Theme, ThemePanel } from '@radix-ui/themes';
import { Suspense } from 'react';

export function App() {
  return (
    <Suspense fallback="loading">
      <Theme appearance="dark" accentColor="bronze" grayColor="mauve" panelBackground="solid">
        {import.meta.env.DEV && <ThemePanel />}
        <RouterProvider router={router} />
      </Theme>
    </Suspense>
  );
}
