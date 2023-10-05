import { ReactNode, useEffect } from 'react';
import { useGlobalStore } from './stores/useGlobalStore';
import { produce } from 'immer';
import { Theme } from '@radix-ui/themes';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const theme = useGlobalStore((state) => state.theme);
  const changeTheme = useGlobalStore((state) => state.changeTheme);

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      const theme = useGlobalStore.getState().theme;
      if (theme.followSystem) {
        changeTheme(
          produce(theme, (draft) => {
            draft.followSystem = true;
            draft.appearance = event.matches ? 'dark' : 'light';
          })
        );
      }
    });
    changeTheme(theme);
  }, []);

  return (
    <Theme
      appearance={theme.appearance}
      accentColor={theme.accentColor}
      radius={theme.radius}
      panelBackground="solid"
      id="main-theme"
      {...props}
    />
  );
}
