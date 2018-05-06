import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          //main  Page
          "language": "Language",
          "logOut": "Logout",
          "test":"test",
        }
      },
      ko: {
        translations: {
          //main  Page
          "language": "언어",
          "logOut": "로그아웃",
          "test":"테스트",
        }
      },
      'zh-CN': {
        translations: {
          //main  Page
          "language": "语言",
          "logOut": "注销",
          "test":"测试",
        }
      }
    },
    fallbackLng: 'en',

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ','
    },

    react: {
      wait: true
    }
  });

export default i18n;