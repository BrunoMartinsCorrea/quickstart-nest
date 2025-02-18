import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ToastProvider } from '~/components/Toast/ToastProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from './ThemeProvider';
import { LoadingOutlet } from './layouts/internal/loadingOutlet';

export const queryClient = new QueryClient();

export function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<LoadingOutlet />}>
        <ToastProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </ToastProvider>
      </Suspense>
    </ThemeProvider>
  );
}
