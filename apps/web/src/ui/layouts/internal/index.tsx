import { Header } from '~/components/Header';
import { LocaleDropdown } from '~/components/LocaleDropdown';
import { Menu, MenuItem } from '~/components/Menu';
import { useGlobalStore } from '~/stores/useGlobalStore';
import { Avatar, Box, Container, DropdownMenu, Flex, Heading, IconButton } from '@radix-ui/themes';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Hide } from '~/components/Hide';
import cn from 'classnames';
import styles from './styles.module.css'
import '~/styles/global.css';

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

  function onMenuItemClick() {
    setMenuVisible(false);
  }

  return (
    <>
      <Header title={<Heading size="2">Backoffice</Heading>}>
        <Flex gap="4" align="center">
          <LocaleDropdown />
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                style={{ cursor: 'pointer' }}
                role='button'
                fallback="BC"
                src="https://github.com/brunomartinscorrea.png"
                size="1"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content variant="soft">
              <DropdownMenu.Item>{t('profile.title')}</DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => navigate('/appearance')}>{t('appearance.title')}</DropdownMenu.Item>
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
      <Flex ref={mainLayout} >
        <Menu visible={menuVisible}>
          <Flex gap="1" direction="column">
            <MenuItem to="/" onClick={onMenuItemClick}>{t('menu.home')}</MenuItem>
            <MenuItem to="/users" onClick={onMenuItemClick}>{t('menu.users')}</MenuItem>
            <MenuItem to="/authorization" onClick={onMenuItemClick}>{t('menu.authorization')}</MenuItem>
            <MenuItem to="/authorization" onClick={onMenuItemClick}>{t('menu.authorization')}</MenuItem>
            <MenuItem to="/authorization" onClick={onMenuItemClick}>{t('menu.authorization')}</MenuItem>
            <MenuItem to="/authorization" onClick={onMenuItemClick}>{t('menu.authorization')}</MenuItem>
            <MenuItem to="/authorization" onClick={onMenuItemClick}>{t('menu.authorization')}</MenuItem>
            <MenuItem to="/authorization" onClick={onMenuItemClick}>{t('menu.authorization')}</MenuItem>
            <MenuItem to="/authorization" onClick={onMenuItemClick}>{t('menu.authorization')}</MenuItem>
            <MenuItem to="/authorization" onClick={onMenuItemClick}>{t('menu.authorization')}</MenuItem>
            <MenuItem to="/authorization" onClick={onMenuItemClick}>{t('menu.authorization')}</MenuItem>
            <MenuItem to="/authorization" onClick={onMenuItemClick}>{t('menu.authorization')}</MenuItem>
            <MenuItem to="/authorization" onClick={onMenuItemClick}>{t('menu.authorization')}</MenuItem>
            <MenuItem to="/authorization" onClick={onMenuItemClick}>{t('menu.authorization')}</MenuItem>
            <MenuItem to="/authorization" onClick={onMenuItemClick}>{t('menu.authorization')}</MenuItem>
            <MenuItem to="/authorization" onClick={onMenuItemClick}>{t('menu.authorization')}</MenuItem>
            <MenuItem to="/authorization" onClick={onMenuItemClick}>{t('menu.authorization')}</MenuItem>
            <MenuItem to="/authorization" onClick={onMenuItemClick}>{t('menu.authorization')}</MenuItem>
            <MenuItem to="/authorization" onClick={onMenuItemClick}>{t('menu.authorization')}</MenuItem>
          </Flex>
        </Menu>
        <Box px="4" flexGrow="1" className={cn({ [styles.hidden]: menuVisible })}>
          <Container>
            <Outlet />
          </Container>
        </Box>
      </Flex>
    </>
  );
}
