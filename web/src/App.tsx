import { RouterProvider } from 'react-router-dom';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import { defaultTheme } from '@/styles/themes/default';
import { GlobalStyle } from '@/styles/global';
import { router } from '@/router';

function App() {
  return (
    <StyleSheetManager>
      <ThemeProvider theme={defaultTheme}>
        <RouterProvider router={router} />
        <GlobalStyle />
      </ThemeProvider>
    </StyleSheetManager>
  );
}

export default App;
