import { Container, Flex, Separator } from '@radix-ui/themes';
import { LocaleDropdown } from '../LocaleDropdown';
import styles from './styles.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <Container py="4">
        <Flex width="100%" align="center" justify="end">
          <LocaleDropdown />
        </Flex>
      </Container>
      <Separator size="4" />
    </header>
  );
}
