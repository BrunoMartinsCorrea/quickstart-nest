import { createBrowserRouter } from 'react-router-dom';
import { Unlogged } from '@/pages/Unlogged';
import { AuthenticationWrapper } from './pages/AuthenticationWrapper';
import { Home } from './pages/Logged/Home';
import { LoggedLayout } from './pages/Logged/Layout';
import { Users } from './pages/Logged/Users';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthenticationWrapper />,
    children: [
      {
        path: '/sign-in',
        element: <Unlogged />,
      },
      {
        path: '/',
        element: <LoggedLayout />,
        children: [
          {
            path: '/home',
            element: <Home />,
          },
          {
            path: '/users',
            element: <Users />,
          },
        ],
      },
    ],
  },
]);
