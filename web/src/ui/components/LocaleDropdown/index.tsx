import { supportedLanguages } from '@/config/i18n';
import { GlobeIcon } from '@radix-ui/react-icons';
import { IconButton, DropdownMenu, Tooltip } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

export function LocaleDropdown() {
  const { t } = useTranslation();
  return (
    <DropdownMenu.Root>
      <Tooltip content={t('actions.changeLanguage')}>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost">
            <GlobeIcon />
          </IconButton>
        </DropdownMenu.Trigger>
      </Tooltip>
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
