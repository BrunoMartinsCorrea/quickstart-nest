import { createBrowserRouter } from 'react-router-dom';
import { Unlogged } from '@/pages/Unlogged';
import { AuthenticationWrapper } from './pages/AuthenticationWrapper';
import { Home } from './pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthenticationWrapper />,
    children: [
      {
        path: '/',
        element: <Unlogged />,
      },
      {
        path: '/home',
        element: <Home />,
      },
    ],
  },
]);
