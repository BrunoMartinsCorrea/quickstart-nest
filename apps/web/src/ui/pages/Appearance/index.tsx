import { Box, Flex, Heading, Text, Theme } from '@radix-ui/themes';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';
import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useGlobalStore } from '~/stores/useGlobalStore';
import { useForm } from 'react-hook-form';
import { ThemeExample } from './components/ThemeExample';
import { produce } from 'immer';
import * as z from 'zod';

const themeAccentColorsOrdered = ["gray", "gold", "bronze", "brown", "yellow", "amber", "orange", "tomato", "red", "ruby", "crimson", "pink", "plum", "purple", "violet", "iris", "indigo", "blue", "cyan", "teal", "jade", "green", "grass", "lime", "mint", "sky"] as const
const themeRadiusOrdered = ["none", "small", "medium", "large", "full"] as const
const themeScaling = ["90%", "95%", "100%", "105%", "110%"] as const

const themeFormSchema = z.object({
  accentColor: z.string(),
  scaling: z.string(),
  radius: z.string(),
  appearance: z.string(),
});

type ThemeFormData = z.infer<typeof themeFormSchema>;

export function Appearance() {
  const { t } = useTranslation();
  const themeColorId = useId();
  const changeTheme = useGlobalStore((state) => state.changeTheme);
  const theme = useGlobalStore((state) => state.theme);
  const { register, handleSubmit } = useForm<ThemeFormData>({
    defaultValues: {
      accentColor: theme.accentColor,
      radius: theme.radius,
      appearance: theme.appearance,
      scaling: theme.scaling,
    },
  });

  const appearances = [
    {
      label: 'light',
      icon: <SunIcon />,
    },
    {
      label: 'dark',
      icon: <MoonIcon />,
    },
    {
      label: 'inherit',
      icon: <DesktopIcon />,
    },
  ] as const;

  function saveTheme(data: ThemeFormData) {
    console.log(data);
  }

  return (
    <Theme>
      <form onSubmit={handleSubmit(saveTheme)}>
        <Flex direction="column" gap="3" mb="8">
          <Flex my="4" direction="column" gap="1">
            <Heading>{t('appearance.title')}</Heading>
            <Text color="gray" size="2">
              {t('appearance.description')}
            </Text>
          </Flex>
          <Heading as="h2" size="5" id={themeColorId}>
            {t('appearance.theme')}
          </Heading>
          <Flex gap="2" role="group" aria-labelledby={themeColorId} width="100%" wrap="wrap">
            {themeAccentColorsOrdered.map((color) => (
              <label
                key={color}
                className={styles.colorSwatch}
                style={{ backgroundColor: `var(--${color}-9)`, color: `var(--${color}-9-contrast)` }}
              >
                {t(`appearance.colors.${color}`)}
                <input
                  className={styles.colorSwatchInput}
                  type="radio"
                  value={color}
                  {...register('accentColor')}
                  onChange={(e) => {
                    changeTheme({
                      ...theme,
                      accentColor: e.target.value as typeof theme.accentColor,
                    });
                  }}
                />
              </label>
            ))}
          </Flex>
          <Heading as="h2" size="5" id={themeColorId} mt="4">
            {t('appearance.roundedBorders.title')}
          </Heading>
          <Flex gap="2" role="group" aria-labelledby={themeColorId} width="100%" wrap="wrap">
            {themeRadiusOrdered.map((value) => (
              <Flex key={value} direction="column" align="center">
                <label className={styles.card}>
                  <input
                    className={styles.radioInput}
                    type="radio"
                    id={`theme-panel-radius-${value}`}
                    value={value}
                    {...register('radius')}
                    onChange={(e) => {
                      changeTheme({
                        ...theme,
                        radius: e.target.value as typeof theme.radius,
                      });
                    }}
                  />
                  <Theme asChild radius={value}>
                    <Box
                      m="3"
                      width="32px"
                      height="32px"
                      style={{
                        borderTopLeftRadius: value === 'full' ? '80%' : 'var(--radius-5)',
                        backgroundImage:
                          'linear-gradient(to bottom right, var(--accent-3), var(--accent-4))',
                        borderTop: '2px solid var(--accent-a8)',
                        borderLeft: '2px solid var(--accent-a8)',
                      }}
                    />
                  </Theme>
                </label>
                <Box asChild pt="2">
                  <Text asChild size="2" color="gray">
                    <label htmlFor={`theme-panel-radius-${value}`}>
                      {t(`appearance.roundedBorders.values.${value}`)}
                    </label>
                  </Text>
                </Box>
              </Flex>
            ))}
          </Flex>
          <Heading as="h2" size="5" id={themeColorId} mt="4">
            {t('appearance.scaling')}
          </Heading>
          <Flex gap="2">
            {themeScaling.map((value) => (
              <label key={value} className="rt-ThemePanelRadioCard">
                <input
                  className="rt-ThemePanelRadioCardInput"
                  type="radio"
                  value={value}
                  {...register('scaling')}
                  onChange={(e) => {
                    changeTheme({
                      ...theme,
                      scaling: e.target.value as typeof theme.scaling,
                    });
                  }}
                />

                <Flex align="center" justify="center" height="32px">
                  <Theme asChild scaling={value}>
                    <Flex align="center" justify="center" p="3">
                      <Text size="1" weight="medium">
                        {value}
                      </Text>
                    </Flex>
                  </Theme>
                </Flex>
              </label>
            ))}
          </Flex>
          <Heading as="h2" size="5" id={themeColorId} mt="4">
            {t('appearance.LighDarkMode.title')}
          </Heading>
          <Flex gap="2" role="group" aria-labelledby={themeColorId} width="100%" wrap="wrap">
            {appearances.map((value) => (
              <Flex key={value.label} direction="column" align="center">
                <label className={styles.card}>
                  <input
                    className={styles.radioInput}
                    type="radio"
                    id={`theme-panel-radius-${value}`}
                    value={value.label}
                    {...register('appearance')}
                    onChange={(e) => {
                      const newTheme = produce(theme, (draft) => {
                        const appearance = e.target.value as typeof theme.appearance;
                        draft.followSystem = appearance === 'inherit';
                        draft.appearance = appearance;
                      });
                      console.log('newTheme', newTheme);
                      changeTheme(newTheme);
                    }}
                  />
                  <Flex gap="2" p="3" align="center">
                    {value.icon}
                    <Text size="2" color="gray">
                      {t(`appearance.LighDarkMode.values.${value.label}`)}
                    </Text>
                  </Flex>
                </label>
              </Flex>
            ))}
          </Flex>
          <ThemeExample />
        </Flex>
      </form>
    </Theme>
  );
}
