import { LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  size?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
}

export function Label({ size = '2', ...props }: LabelProps) {
  return (
    <label
      {...props}
      style={{
        fontSize: `var(--font-size-${size})`,
        lineHeight: `var(--line-height-${size})`,
        letterSpacing: `var(--letter-spacing-${size})`,
        fontWeight: 'var(--font-weight-medium)',
        userSelect: 'none',
      }}
    />
  );
}
