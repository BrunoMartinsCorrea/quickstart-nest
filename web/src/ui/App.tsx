import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Theme } from '@radix-ui/themes';
import { ToastProvider } from '~/components/Toast/ToastProvider';
import { useGlobalStore } from '~/stores/useGlobalStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '~/styles/global.css';

const queryClient = new QueryClient();

export function App() {
  const appearance = useGlobalStore((state) => state.appearance);
  const changeAppearance = useGlobalStore((state) => state.changeAppearance);

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
