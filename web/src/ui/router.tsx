import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Unlogged } from './pages/Unlogged';
import { Spinner } from './components/Spinner';
import { InternalLayout } from './layouts/internal';
import { Home } from '~/pages/Home';

const Users = React.lazy(() => import('~/pages/Users'));

export const router = createBrowserRouter([
  {
    path: '/sign-in',
    element: <Unlogged />,
  },
  {
    path: '/',
    element: <InternalLayout />,
    children: [
      {
        path: '/',
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
