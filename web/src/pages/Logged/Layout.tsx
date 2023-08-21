import { Header } from '@/components/Header';
import { LocaleDropdown } from '@/components/LocaleDropdown';
import { Menu, MenuItem } from '@/components/Menu';
import { useStore } from '@/stores/useStore';
import { Avatar, Container, DropdownMenu, Flex, Grid, Heading } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

export function LoggedLayout() {
  const { t } = useTranslation();
  const signOut = useStore((state) => state.signOut);

  return (
    <Grid>
      <Header title={<Heading size="2">Backoffice</Heading>}>
        <Flex gap="4" align="center">
          <LocaleDropdown />
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                fallback="BC"
                src="https://github.com/brunomartinscorrea.png"
                radius="full"
                size="1"
                style={{ cursor: 'pointer' }}
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content variant="soft">
              <DropdownMenu.Item>{t('logged.profile.profile')}</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item onClick={signOut}>{t('logged.signOut.signOut')}</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
      </Header>
      <Flex>
        <Menu>
          <Flex gap="4" direction="column">
            <MenuItem to="/users">Usuários</MenuItem>
          </Flex>
        </Menu>
        <Flex mt="4" width="100%">
          <Container>
            <Outlet />
          </Container>
        </Flex>
      </Flex>
    </Grid>
  );
}
