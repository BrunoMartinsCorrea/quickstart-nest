import { supportedLanguages } from '@/config/i18n';
import { GlobeIcon } from '@radix-ui/react-icons';
import { IconButton, DropdownMenu } from '@radix-ui/themes';
import i18n from 'i18next';

export function LocaleDropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost">
          <GlobeIcon />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content variant="soft">
        <DropdownMenu.RadioGroup value={i18n.language} onValueChange={i18n.changeLanguage}>
          {supportedLanguages.map((lang) => (
            <DropdownMenu.RadioItem key={lang.value} value={lang.value}>
              {lang.language}
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
