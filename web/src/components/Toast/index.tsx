import * as PrimitiveToast from '@radix-ui/react-toast';
import styles from './styles.module.css';
import { Button, Grid, Heading, Text } from '@radix-ui/themes';

interface ToastProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  variant?: 'default' | 'destructive';
  title?: string;
  description?: string;
}

export function Toast({ open, onOpenChange, variant = 'default', title, description }: ToastProps) {
  return (
    <PrimitiveToast.Root
      className={`${styles.root} ${variant === 'destructive' ? styles.rootDestructive : styles.rootDefault}`}
      open={open}
      onOpenChange={onOpenChange}
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
      <PrimitiveToast.Action className={styles.action} altText="try again" asChild>
        <Button size="1" variant={variant === 'destructive' ? 'ghost' : 'outline'}>
          Try again
        </Button>
      </PrimitiveToast.Action>
    </PrimitiveToast.Root>
  );
}
