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
	setLanguageCode: (langaugeCode) => {
		window.localStorage.setItem('langCode', langaugeCode);
	},
	getLanguageCode: () => {
		return window.localStorage.getItem('langCode') || 'en';
	},
	getLanguageProvider: () => {
		return window.localStorage.getItem('langProvider');
	},
	setLanguageProvider: (provider) => {
		window.localStorage.setItem('langProvider', provider);
	},
	removeLanguageProvider: () => {
		window.localStorage.removeItem('langProvider');
	}
};
