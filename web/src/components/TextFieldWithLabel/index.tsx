import { Flex, PropsWithoutRefOrColor, TextField, Text } from '@radix-ui/themes';
import { Label } from '../Label';
import { useId } from 'react';
import React from 'react';

type TextFieldInputProps = Omit<PropsWithoutRefOrColor<'input'>, 'size'>;

type TextFieldWithLabelProps = TextFieldInputProps & {
  label: string;
  children?: React.ReactNode;
  htmlFor?: string;
  errorText?: string;
};

export const TextFieldWithLabel = React.forwardRef<React.ElementRef<typeof TextField.Input>, TextFieldWithLabelProps>(
  ({ label, children, htmlFor, errorText, ...props }, ref) => {
    let id: string | undefined;

    if (!htmlFor) {
      id = useId();
    }

    return (
      <Flex direction="column" gap="1">
        <Label htmlFor={htmlFor ?? id}>{label}</Label>
        {children ? children : <TextField.Input id={id} ref={ref} {...props} />}
        {errorText && (
          <Text color="tomato" size="2">
            {errorText}
          </Text>
        )}
      </Flex>
    );
  },
);
