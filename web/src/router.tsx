import { createBrowserRouter } from 'react-router-dom';
import SignInPage from '@/pages/SignInPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignInPage />,
  },
]);
