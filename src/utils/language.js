export default {
  isLanguageSet: () => {
    return window.localStorage.getItem('lang');
  },
  getLanguage: () => {
    return window.localStorage.getItem('lang') || 'English';
  },
  setLanguage: (langauge) => {
    window.localStorage.setItem('lang', langauge);
  },
  clearLanguage: () => {
    window.localStorage.removeItem('lang');
  },
};
