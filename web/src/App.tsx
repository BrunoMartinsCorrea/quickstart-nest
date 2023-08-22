import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { Theme } from '@radix-ui/themes';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { ToastProvider } from '@/components/Toast/ToastProvider';
import { useStore } from './stores/useStore';

export function App() {
  const appearance = useStore((state) => state.appearance);
  const changeAppearance = useStore((state) => state.changeAppearance);

  useEffect(() => {
    changeAppearance(appearance);
  }, []);

  return (
    <Suspense fallback="loading">
      <Theme appearance={appearance} accentColor="bronze" panelBackground="solid">
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </Theme>
      <GlobalStyle />
    </Suspense>
  );
}
