import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


import enTranslation from './locales/en.json';
import hiTranslation from './locales/hi.json';
import mrTranslation from './locales/mr.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      hi: { translation: hiTranslation },
      mr: { translation: mrTranslation },
    },
    lng: 'en', // Set the default language here
    fallbackLng: 'en', // Fallback language in case of missing translations
    interpolation: {
      escapeValue: false, // React already escapes string values
    },
  });

ReactDOM.render(<App />, document.getElementById('root'));
