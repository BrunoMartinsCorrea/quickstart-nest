import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Unlogged } from './pages/Unlogged';
import { Home } from './pages/Logged/Home';
import { LoggedLayout } from './pages/Logged/Layout';
import { Spinner } from './components/Spinner';

const Users = React.lazy(() => import('~/pages/Logged/Users'));

export const router = createBrowserRouter([
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
        element: (
          <Suspense fallback={<Spinner />}>
            <Users />
          </Suspense>
        ),
      },
    ],
  },
]);
