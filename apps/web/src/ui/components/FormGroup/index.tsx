import React from 'react';
import { Flex, Text } from '@radix-ui/themes';
import { Label } from '~/components/Label';

type RootProps = {
  children: React.ReactNode;
}

const Root = (props: RootProps) => (
  <Flex direction="column" gap="1">
    {props.children}
  </Flex>
);

type ErrorTextProps = {
  children: React.ReactNode;
}

const ErrorText = (props: ErrorTextProps) => (
  <Text color="tomato" size="2">
    {props.children}
  </Text>
)

export const FormGroup = { Root, Label, ErrorText };
