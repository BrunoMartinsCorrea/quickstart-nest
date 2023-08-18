import { useStore } from '@/stores/useStore';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export function AuthenticationWrapper() {
  const isSignedIn = useStore((state) => !!state.access);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate('/home');
    } else {
      navigate('/');
    }
  }, [isSignedIn]);

  return (
    <>
      <Outlet />
    </>
  );
}
