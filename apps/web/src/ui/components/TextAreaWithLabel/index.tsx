import React, { useId } from 'react';
import { Flex, Text, TextArea, TextAreaProps } from '@radix-ui/themes';
import { Label } from '~/components/Label';

type TextAreaInputProps = Omit<TextAreaProps, 'size'>;

type TextAreaWithLabelProps = TextAreaInputProps & {
  label: string;
  children?: React.ReactNode;
  htmlFor?: string;
  errorText?: string;
};

export const TextAreaWithLabel = React.forwardRef<React.ElementRef<typeof TextArea>, TextAreaWithLabelProps>(
  ({ label, children, htmlFor, errorText, ...props }, ref) => {
    let id: string | undefined;

    if (!htmlFor) {
      id = useId();
    }

    return (
      <Flex direction="column" gap="1">
        <Label htmlFor={htmlFor ?? id}>{label}</Label>
        {children ? children : <TextArea id={id} ref={ref} {...props} />}
        {errorText && (
          <Text color="tomato" size="2">
            {errorText}
          </Text>
        )}
      </Flex>
    );
  }
);
