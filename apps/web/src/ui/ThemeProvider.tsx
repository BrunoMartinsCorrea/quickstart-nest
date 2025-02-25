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
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (_) => {
      const theme = useGlobalStore.getState().theme;
      if (theme.followSystem) {
        changeTheme(
          produce(theme, (draft) => {
            draft.followSystem = true;
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
      scaling={theme.scaling}
      panelBackground="solid"
      id="main-theme"
      {...props}
    />
  );
}
