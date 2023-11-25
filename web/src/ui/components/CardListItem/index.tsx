import { Box, Card, Flex, Grid, Slot, Text } from "@radix-ui/themes";
import { SelectionCard } from "../SelectionCard";
import styles from './styles.module.css';
import { ReactElement } from "react";

interface KeyValue {
  key: string;
  value: string;
}

interface CardListItemProps {
  hasSelection?: boolean;
  isSelected?: boolean;
  data: KeyValue[];
  children?: ReactElement;
}

function Root({ hasSelection = false, isSelected = false, data, children }: CardListItemProps) {
  const Component = hasSelection ? SelectionCard : Card;

  return (
    <Component isSelected={isSelected}>
      <Flex direction="column" gap="3">
        {children}
        <Box className={styles.listCardContentContainer}>
          {data.map(keyValue => (
            <Grid>
              <Text size="2" weight="bold" className={styles.overflowAnywhere}>
                {keyValue.key}
              </Text>
              <Text size="2" className={styles.overflowAnywhere}>
                {keyValue.value}
              </Text>
            </Grid>
          ))}
        </Box>
      </Flex>
    </Component>
  )
}

interface HeaderProps {
  children: ReactElement;
}

function Header(props: HeaderProps) {
  return <Slot {...props}/>
}

export const CardListItem = {
  Root,
  Header
}
