import { ReactNode, useEffect, useState } from 'react';
import { Slot } from '@radix-ui/themes';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface HideProps {
  ltOrEq?: Size;
  gtOrEq?: Size;
  children: ReactNode;
}

const breakpoints = {
  xs: 520,
  sm: 768,
  md: 1024,
  lg: 1280,
};

export function Hide({ ltOrEq, gtOrEq, ...props }: HideProps) {
  const [windowSize, setWindowSize] = useState<number>(0);

  const handleResize = () => setWindowSize(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize]);

  if (ltOrEq && windowSize <= breakpoints[ltOrEq]) {
    return null;
  }

  if (gtOrEq && windowSize >= breakpoints[gtOrEq]) {
    return null;
  }

  return <Slot {...props} />;
}
