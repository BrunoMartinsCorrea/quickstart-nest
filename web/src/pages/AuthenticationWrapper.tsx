import { useStore } from '@/stores/useStore';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export function AuthenticationWrapper() {
  const access = useStore((state) => state.access);
  const navigate = useNavigate();

  useEffect(() => {
    if (access) {
      navigate('/home');
    } else {
      navigate('/sign-in');
    }
  }, [access]);

  return (
    <>
      <Outlet />
    </>
  );
}
