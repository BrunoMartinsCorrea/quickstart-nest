import React, { useId } from 'react';
import { Flex, TextField, Text, } from '@radix-ui/themes';
import { Label } from '~/components/Label';

type TextFieldInputProps = Omit<TextField.RootProps, 'size'>;

type TextFieldWithLabelProps = TextFieldInputProps & {
  label: string;
  children?: React.ReactNode;
  htmlFor?: string;
  errorText?: string;
};

export const TextFieldWithLabel = React.forwardRef<React.ElementRef<typeof TextField.Root>, TextFieldWithLabelProps>(
  ({ label, children, htmlFor, errorText, ...props }, ref) => {
    let id: string | undefined;

    if (!htmlFor) {
      id = useId();
    }

    return (
      <Flex direction="column" gap="1">
        <Label htmlFor={htmlFor ?? id}>{label}</Label>
        {children ? children : <TextField.Root id={id} ref={ref} {...props} />}
        {errorText && (
          <Text color="tomato" size="2">
            {errorText}
          </Text>
        )}
      </Flex>
    );
  },
);
