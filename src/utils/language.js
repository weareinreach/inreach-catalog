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
	resetLanguage: () => {
		window.localStorage.setItem('lang', 'English');
	}
};

export const isLanguageSet = () => {
	return window.localStorage.getItem('lang');
};

export const getLanguage = () => {
	return window.localStorage.getItem('lang') || 'English';
};

export const setLanguage = (langauge) => {
	window.localStorage.setItem('lang', langauge);
};

export const clearLanguage = () => {
	window.localStorage.removeItem('lang');
};

export const resetLanguage = () => {
	window.localStorage.setItem('lang', 'English');
};
