import { Box, Tabs, Container, Grid, Flex } from '@radix-ui/themes';
import { SignInForm } from './components/SignInForm';
import { SignUpForm } from './components/SignUpForm';
import { useTranslation } from 'react-i18next';
import { Header } from '~/components/Header';
import { LocaleDropdown } from '~/components/LocaleDropdown';
import { useNavigate } from 'react-router-dom';
import { useStore } from '~/stores/useStore';
import { useEffect } from 'react';

export function Unlogged() {
  const navigate = useNavigate();
  const access = useStore((state) => state.access);
  const { t } = useTranslation('translation', { keyPrefix: 'unlogged' });

  useEffect(() => {
    if (access) navigate('/home');
  }, [access]);

  return (
    <Grid>
      <Header>
        <Flex width="100%" align="center" justify="end">
          <LocaleDropdown />
        </Flex>
      </Header>
      <Container mt="9" size="1">
        <Tabs.Root defaultValue="signin">
          <Tabs.List>
            <Tabs.Trigger value="signin">{t('signIn.signIn')}</Tabs.Trigger>
            <Tabs.Trigger value="signup">{t('signUp.signUp')}</Tabs.Trigger>
          </Tabs.List>
          <Box mt="3">
            <Tabs.Content value="signin">
              <SignInForm />
            </Tabs.Content>
            <Tabs.Content value="signup">
              <SignUpForm />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Container>
    </Grid>
  );
}
