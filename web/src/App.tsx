import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { Theme, ThemePanel } from '@radix-ui/themes';
import { Suspense } from 'react';
import { GlobalStyle } from './styles/GlobalStyle';

export function App() {
  return (
    <Suspense fallback="loading">
      <Theme appearance="dark" accentColor="bronze" grayColor="mauve" panelBackground="solid">
        <ThemePanel />
        <RouterProvider router={router} />
      </Theme>
      <GlobalStyle />
    </Suspense>
  );
}
