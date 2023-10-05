import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ToastProvider } from '~/components/Toast/ToastProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '~/styles/global.css';
import { ThemeProvider } from './ThemeProvider';

export const queryClient = new QueryClient();

export function App() {
  return (
    <ThemeProvider>
      <Suspense fallback="loading">
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
