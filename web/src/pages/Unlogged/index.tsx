import { Box, Tabs, Container, DropdownMenu, IconButton } from '@radix-ui/themes';
import { SignInForm } from './components/SignInForm';
import { SignUpForm } from './components/SignUpForm';
import { useTranslation } from 'react-i18next';
import { GlobeIcon } from '@radix-ui/react-icons';

const languages = [
  { language: 'Potuguês Brasileiro', value: 'pt-BR' },
  { language: 'English', value: 'en' },
];

export function Unlogged() {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'unlogged' });

  function handleLangChange(value: string) {
    i18n.changeLanguage(value);
  }

  return (
    <Container mt="9" size="1">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost">
            <GlobeIcon />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.RadioGroup value={i18n.language} onValueChange={handleLangChange}>
            {languages.map((lang) => (
              <DropdownMenu.RadioItem value={lang.value}>{lang.language}</DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
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
  );
}
