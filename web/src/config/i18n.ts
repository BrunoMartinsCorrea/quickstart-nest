import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { Language } from '@/models/Language';

export const supportedLanguages: Language[] = [
  { language: 'Potuguês Brasileiro', value: 'pt-BR' },
  { language: 'English', value: 'en' },
];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt-BR',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    load: 'all',
    supportedLngs: supportedLanguages.map((lng) => lng.value),
  });

export default i18n;
