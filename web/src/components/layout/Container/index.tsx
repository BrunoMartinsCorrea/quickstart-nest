import { HTMLAttributes } from 'react';
import { ContainerComponent } from './index.style';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export function Container(props: ContainerProps) {
  return <ContainerComponent {...props} />;
}
