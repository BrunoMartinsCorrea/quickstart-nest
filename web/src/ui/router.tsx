import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Unlogged } from './pages/Unlogged';
import { InternalLayout } from './layouts/internal';
import { Home } from '~/pages/Home';
import { LoadingOutlet } from './layouts/internal/loadingOutlet';

const Users = React.lazy(() => import('~/features/users'));
const Authorization = React.lazy(() => import('~/features/authorization'));

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
          <Suspense fallback={<LoadingOutlet />}>
            <Users />
          </Suspense>
        ),
      },
      {
        path: '/authorization',
        element: (
          <Suspense fallback={<LoadingOutlet />}>
            <Authorization />
          </Suspense>
        ),
      },
    ],
  },
]);
