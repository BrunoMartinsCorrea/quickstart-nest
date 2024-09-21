import styles from './styles.module.css';
interface SpinnerProps {
  size?: number;
  color?: 'accent' | 'gray';
}

export function Spinner({ size = 24, color = 'gray' }: SpinnerProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={styles[color]}>
      <g className={styles.spinner}>
        <rect x="11" y="1" width="2" height="5" opacity=".14" />
        <rect x="11" y="1" width="2" height="5" transform="rotate(30 12 12)" opacity=".29" />
        <rect x="11" y="1" width="2" height="5" transform="rotate(60 12 12)" opacity=".43" />
        <rect x="11" y="1" width="2" height="5" transform="rotate(90 12 12)" opacity=".57" />
        <rect x="11" y="1" width="2" height="5" transform="rotate(120 12 12)" opacity=".71" />
        <rect x="11" y="1" width="2" height="5" transform="rotate(150 12 12)" opacity=".86" />
        <rect x="11" y="1" width="2" height="5" transform="rotate(180 12 12)" />
      </g>
    </svg>
  );
}
