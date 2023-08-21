import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { Theme } from '@radix-ui/themes';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { ToastProvider } from '@/components/Toast/ToastProvider';
// import { Toast } from './components/Toast';

export function App() {
  return (
    <Suspense fallback="loading">
      <Theme appearance="light" accentColor="bronze" grayColor="mauve" panelBackground="solid">
        <ToastProvider>
          {/* <ThemePanel /> */}
          <RouterProvider router={router} />
        </ToastProvider>
      </Theme>
      <GlobalStyle />
    </Suspense>
  );
}
