import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Theme } from '@radix-ui/themes';
import { ToastProvider } from '~/components/Toast/ToastProvider';
import { useGlobalStore } from '~/stores/useGlobalStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import '~/styles/global.css';

export const queryClient = new QueryClient();

export function App() {
  const theme = useGlobalStore((state) => state.theme);
  const changeTheme = useGlobalStore((state) => state.changeTheme);

  useEffect(() => {
    changeTheme(theme);
  }, []);

  return (
    <ThemeProvider attribute="class" enableSystem={true}>
      <Theme accentColor={theme.accentColor} radius={theme.radius} panelBackground="solid" id="main-theme">
        <Suspense fallback="loading">
          <ToastProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
              <ReactQueryDevtools />
            </QueryClientProvider>
          </ToastProvider>
        </Suspense>
      </Theme>
    </ThemeProvider>
  );
}
