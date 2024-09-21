import { Card } from '@radix-ui/themes';
import { HTMLAttributes } from 'react';
import styles from './styles.module.css';

interface SelectionCardProps extends HTMLAttributes<HTMLDivElement> {
  isSelected: boolean;
}

export function SelectionCard({ isSelected, ...props }: SelectionCardProps) {
  return <Card {...props} className={`${isSelected ? styles.selected : ''}`} />;
}
