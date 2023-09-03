import { Header } from '~/components/Header';
import { LocaleDropdown } from '~/components/LocaleDropdown';
import { Menu, MenuItem } from '~/components/Menu';
import { useGlobalStore } from '~/stores/useGlobalStore';
import { Avatar, Box, Container, DropdownMenu, Flex, Grid, Heading, IconButton } from '@radix-ui/themes';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import { ThemePanel } from '~/components/ThemePanel';
import styles from './styles.module.css';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Hide } from '~/components/Hide';

export function InternalLayout() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const signOut = useGlobalStore((state) => state.signOut);
  const access = useGlobalStore((state) => state.access);
  const mainLayout = useRef<HTMLDivElement>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (!access) navigate('/sign-in');
  }, [access]);

  return (
    <Grid ref={mainLayout}>
      <Box className={`${styles.menuContainer} ${menuVisible ? styles.toggleVisibility : ''}`}>
        <Menu>
          <Flex gap="1" direction="column">
            <MenuItem to="/">{t('menu.home')}</MenuItem>
            <MenuItem to="/users">{t('menu.users')}</MenuItem>
          </Flex>
        </Menu>
      </Box>
      <Header title={<Heading size="2">Backoffice</Heading>}>
        <Flex gap="4" align="center">
          <ThemePanel />
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
              <DropdownMenu.Item onClick={signOut}>{t('actions.signOut')}</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <Hide gtOrEq="sm">
            <IconButton variant="ghost" onClick={() => setMenuVisible((value) => !value)}>
              <HamburgerMenuIcon />
            </IconButton>
          </Hide>
        </Flex>
      </Header>
      <Box className={styles.mainContainer}>
        <Container px="4">
          <Outlet />
        </Container>
      </Box>
    </Grid>
  );
}
