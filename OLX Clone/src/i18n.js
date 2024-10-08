 i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      language: 'ENGLISH',
      sell: 'SELL',
      login: 'Login',
      logout: 'Logout',
      searchPlaceholder: 'Search specific product...',
    },
  },
  hi: {
    translation: {
      language: 'हिन्दी',
      sell: 'बेचें',
      login: 'लॉग इन करें',
      logout: 'लॉगआउट',
      searchPlaceholder: 'विशिष्ट उत्पाद खोजें...',
    },
  },
  ml: {
    translation: {
      language: 'മലയാളം',
      sell: 'വിൽപ്പന',
      login: 'ലോഗിൻ',
      logout: 'ലോഗൗട്ട്',
      searchPlaceholder: 'പ്രത്യേക ഉത്പന്നം തിരയുക...',
    },
  },
  te: {
    translation: {
      language: 'తెలుగు',
      sell: 'అమ్ముకొను',
      login: 'లాగిన్',
      logout: 'లాగౌట్',
      searchPlaceholder: 'ప్రత్యేక ఉత్పన్నం వెతకండి...',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
