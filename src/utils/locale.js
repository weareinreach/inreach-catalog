const enUS = {};

const enCA = {
	'Start typing county, city or state in the US…':
		'Start typing city, province or territory in Canada…',
	'Download Legal Guides on LGBTQ Asylum in the U.S.':
		'Download Legal Guides on LGBTQ Asylum in Canada',
	'English classes': 'Language classes',
	'LGBTQ centers': 'LGBTQ centres',
	'Cultural centers': 'Cultural centres',
	'Drop-in centers for LGBTQ youth': 'Drop-in centres for LGBTQ youth',
	'Welcome to the United States AsylumConnect Catalog!':
		'Welcome to the Canada AsylumConnect Catalog!',
	'Show me national organizations who can help anyone located in the United States':
		'Show me national organizations who can help anyone located in the Canada',
	'Physical evaluations for asylum claim':
		'Physical evaluations for refugee claim',
	'Asylum application': 'Refugee claim',
	'Psychological evaluations for asylum claim':
		'Psychological evaluations for refugee claim',
	'Career counseling': 'Career counselling',
	'Private therapy and counseling': 'Private therapy and counselling',
	39.8333333: '60.8545463',
	'-98.585522': '-98.585522'
};

const enMX = {
	'Start typing county, city or state in the US…':
		'Start typing city or state in Mexico…',
	'Download Legal Guides on LGBTQ Asylum in the U.S.':
		'Download Legal Guides on LGBTQ Asylum in Mexico',
	'English classes': 'Language classes',
	'LGBTQ centers': 'LGBTQ centres',
	'Cultural centers': 'Cultural centres',
	'Drop-in centers for LGBTQ youth': 'Drop-in centres for LGBTQ youth',
	'Welcome to the United States AsylumConnect Catalog!':
		'Welcome to the Mexico AsylumConnect Catalog!',
	'Show me national organizations who can help anyone located in the United States':
		'Show me national organizations who can help anyone located in Mexico',
	'Physical evaluations for asylum claim':
		'Physical evaluations for refugee claim',
	'Asylum application': 'Refugee claim',
	'Psychological evaluations for asylum claim':
		'Psychological evaluations for refugee claim',
	'Career counseling': 'Career counselling',
	'Private therapy and counseling': 'Private therapy and counselling',
	39.8333333: '23.634501',
	'-98.585522': '-102.552784'
};

//will need this once the catalog is fully translated to Spanish (also need to translate this section)
const esMX = {
	'Start typing county, city or state in the US…':
		'Start typing city or state in Mexico…',
	'Download Legal Guides on LGBTQ Asylum in the U.S.':
		'Download Legal Guides on LGBTQ Asylum in Mexico',
	'English classes': 'Language classes',
	'LGBTQ centers': 'LGBTQ centres',
	'Cultural centers': 'Cultural centres',
	'Drop-in centers for LGBTQ youth': 'Drop-in centres for LGBTQ youth',
	'Welcome to the United States AsylumConnect Catalog!':
		'Welcome to the Mexico AsylumConnect Catalog!',
	'Show me national organizations who can help anyone located in the United States':
		'Show me national organizations who can help anyone located in Mexico',
	'Physical evaluations for asylum claim':
		'Physical evaluations for refugee claim',
	'Asylum application': 'Refugee claim',
	'Psychological evaluations for asylum claim':
		'Psychological evaluations for refugee claim',
	'Career counseling': 'Career counselling',
	'Private therapy and counseling': 'Private therapy and counselling',
	39.8333333: '23.634501',
	'-98.585522': '-102.552784'
};

export const fetchLocale = (locale) => {
	switch (locale) {
		case 'en_CA':
			return enCA;
		case 'en_MX':
			return enMX;
		case 'es_MX':
			return esMX;
		case 'en_US':
		default:
			return enUS;
	}
};

export const validLocales = ['en_US', 'en_CA', 'en_MX', 'es_MX'];

export const resetLocale = () => {
	window.localStorage.setItem('locale', 'en_US');
};

export const isLocaleSet = () => {
	return window.localStorage.getItem('locale');
};

export const getLocale = () => {
	return window.localStorage.getItem('locale') || 'en_US';
};

export const setLocale = (locale) => {
	window.localStorage.setItem('locale', locale);
};

export const localeTagMap = {
	en_CA: 'canada',
	en_MX: 'mexico',
	en_US: 'united_states',
	es_MX: 'mexico'
};

const supportedLocales = [
	{name: '🇨🇦 Canada', code: 'en_CA'},
	{name: '🇲🇽 Mexico', code: 'en_MX'},
	{name: '🇺🇸 United States', code: 'en_US'},
	{name: '🌎 Other / Travel Support', code: 'intl'}
];

export const fetchLocaleName = (locale) => {
	for (var locale1 of supportedLocales) {
		if (locale1['code'] === locale) {
			return locale1['name'];
		}
	}
};
