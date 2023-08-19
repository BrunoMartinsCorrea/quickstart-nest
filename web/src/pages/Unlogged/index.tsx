import { Box, Tabs, Container, DropdownMenu, IconButton, Button } from '@radix-ui/themes';
import { SignInForm } from './components/SignInForm';
import { SignUpForm } from './components/SignUpForm';
import { useTranslation } from 'react-i18next';
import { GlobeIcon } from '@radix-ui/react-icons';
import { Toast } from '@/components/Toast';
import { useState } from 'react';

const languages = [
  { language: 'Potuguês Brasileiro', value: 'pt-BR' },
  { language: 'English', value: 'en' },
];

export function Unlogged() {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'unlogged' });

  function handleLangChange(value: string) {
    i18n.changeLanguage(value);
  }

  const [open, setOpen] = useState(false);

  return (
    <Container mt="9" size="1">
      <Button variant="outline" onClick={() => setOpen((value) => !value)}>
        Toast!
      </Button>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost">
            <GlobeIcon />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.RadioGroup value={i18n.language} onValueChange={handleLangChange}>
            {languages.map((lang) => (
              <DropdownMenu.RadioItem key={lang.value} value={lang.value}>
                {lang.language}
              </DropdownMenu.RadioItem>
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
      <Toast
        open={open}
        onOpenChange={setOpen}
        title="Ops! Something went wrong"
        description="An error occured with the request, try again"
        variant="destructive"
      />
    </Container>
  );
}
