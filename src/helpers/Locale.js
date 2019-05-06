export default {
  isLocaleSet: () => {
    return window.localStorage.getItem('locale');
  },
  getLocale: () => {
    return window.localStorage.getItem('locale') || 'en_US'
  },
  setLocale: (locale) => {
    window.localStorage.setItem('locale', locale);
  },
  clearLocale: () => {
    window.localStorage.removeItem('locale');
  }
};