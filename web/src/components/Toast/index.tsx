import * as PrimitiveToast from '@radix-ui/react-toast';
import styles from './styles.module.css';
import { Button, Grid, Heading, Text } from '@radix-ui/themes';
import { Cross2Icon } from '@radix-ui/react-icons';
import React from 'react';
export interface ToastProps {
  variant?: 'default' | 'destructive';
  title?: string;
  description?: string;
  action?: {
    onClick: () => void;
    label: string;
  };
}

export const Toast = React.forwardRef<
  React.ElementRef<typeof PrimitiveToast.Root>,
  React.ComponentPropsWithoutRef<typeof PrimitiveToast.Root> & ToastProps
>(({ variant = 'default', title, description, action, ...props }, ref) => {
  return (
    <PrimitiveToast.Root
      ref={ref}
      {...props}
      className={`${styles.root} ${variant === 'destructive' ? styles.rootDestructive : styles.rootDefault}`}
    >
      <Grid>
        <PrimitiveToast.Title asChild>
          {title && (
            <Heading as="h6" size="2" mb="1">
              {title}
            </Heading>
          )}
        </PrimitiveToast.Title>
        <PrimitiveToast.Description asChild>
          {description && (
            <Text size="2" color="gray">
              {description}
            </Text>
          )}
        </PrimitiveToast.Description>
      </Grid>
      {action && (
        <PrimitiveToast.Action className={styles.action} altText="try again" asChild>
          <Button size="1" variant={variant === 'destructive' ? 'ghost' : 'outline'} onClick={action.onClick}>
            {action.label}
          </Button>
        </PrimitiveToast.Action>
      )}
      <PrimitiveToast.Close className={styles.close}>
        <Cross2Icon width={12} />
      </PrimitiveToast.Close>
    </PrimitiveToast.Root>
  );
});
