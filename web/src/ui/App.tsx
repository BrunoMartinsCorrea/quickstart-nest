import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Theme } from '@radix-ui/themes';
import { ToastProvider } from '~/components/Toast/ToastProvider';
import { useStore } from '~/stores/useStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '~/styles/global.css';

const queryClient = new QueryClient();

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
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </ToastProvider>
      </Theme>
    </Suspense>
  );
}
