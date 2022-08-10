import _forEach from 'lodash/forEach';

// each of these properties listed here (except for 'language') have a key and a value.
// The value refers to a corresponding key in the language files (see the 'lang' directory)
// The string in the language file is what is displayed in the app UI
const propertyMap = {
	'additional-info': {
		'at-capacity': 'resource-property.at-capacity',
		'geo-near-public-transit': 'resource-property.near-public-transportation',
		'geo-public-transit-description': 'resource-property.transit-details',
		'has-confidentiality-policy':
			'resource-property.has-confidentiality-policy',
		'time-walk-in': 'resource-property.walk-ins-welcome'
	},
	community: {
		'community-adults': 'resource-property.community-adult',
		'community-africa-immigrant':
			'resource-property.community-immigrants-from-africa',
		'community-african-american':
			'resource-property.community-african-american',
		'community-api': 'resource-property.community-asian-islander',
		'community-asia-immigrant':
			'resource-property.community-immigrants-from-asia',
		'community-asylee': 'resource-property.community-asylee',
		'community-asylum-seeker': 'resource-property.community-asylum-seeker',
		'community-daca-recipient-seeker':
			'resource-property.community-daca-seeker',
		'community-detained-immigrant':
			'resource-property.community-detained-immigrants',
		'community-disabled':
			'resource-property.community-people-with-disabilities',
		'community-hiv-aids': 'resource-property.community-individuals-with-hiv',
		'community-homeless': 'resource-property.community-homeless-individuals',
		'community-human-trafficking-survivor':
			'resource-property.community-human-trafficking-survivors',
		'community-latin-america-immigrant':
			'resource-property.community-latin-immigrants',
		'community-latino': 'resource-property.community-latino',
		'community-lgbtq-youth': 'resource-property.community-lgbtq-youth',
		'community-middle-east-immigrant':
			'resource-property.community-middle-east-immigrants',
		'community-muslim': 'resource-property.community-muslim',
		'community-native-american': 'resource-property.community-native-american',
		'community-refugee': 'resource-property.community-refugees',
		'community-russia-immigrant':
			'resource-property.community-russian-immigrants',
		'community-seniors': 'resource-property.community-seniors',
		'community-teens': 'resource-property.community-teenagers',
		'community-transgender': 'resource-property.community-transgender',
		'community-undocumented': 'resource-property.community-undocumented'
	},
	cost: {
		'cost-fees': 'resource-property.community-cost-heading',
		'cost-free': 'resource-property.free-of-cost'
	},
	eligibility: {
		'elig-age-or-over': 'resource-property.ages-over',
		'elig-age-or-under': 'resource-property.ages-under',
		'elig-age-range': 'resource-property.age',
		'elig-description': '[value]',
		'time-appointment-required': 'resource-property.appointment-required'
	},
	language: {
		'lang-american-sign-language': {name: 'American Sign Language'},
		'lang-all-languages-by-interpreter': '[value]',
		'lang-afrikaans': {code: 'aa'},
		'lang-albanian': {code: 'sq'},
		'lang-amharic': {code: 'am'},
		'lang-arabic': {code: 'ar'},
		'lang-armenian': {code: 'hy'},
		'lang-azerbaijani': {code: 'az'},
		'lang-bangali': {code: 'bn'},
		'lang-berber': {name: 'Berber'},
		'lang-bhutanese': {code: 'dz'},
		'lang-bosnian': {code: 'bs'},
		'lang-bulgarian': {code: 'bg'},
		'lang-burmese': {code: 'my'},
		'lang-cambodian': {code: 'km'},
		'lang-cantonese': {name: 'Cantonese'},
		'lang-catalan': {code: 'ca'},
		'lang-cebuano': {name: 'Cebuano'},
		'lang-chin': {name: 'Chin'},
		'lang-chiu-chow': {name: 'Chiuchow'},
		'lang-creole': {name: 'Creole'},
		'lang-croatian': {code: 'hr'},
		'lang-czech': {code: 'cs'},
		'lang-dari': {name: 'Dari'},
		'lang-dinka': {name: 'Dinka'},
		'lang-dutch': {code: 'nl'},
		'lang-english': {code: 'en'},
		'lang-eritrean': {code: 'aa'},
		'lang-farsi': {code: 'fa'},
		'lang-fiji': {code: 'fj'},
		'lang-flaams': {name: 'Flaams'},
		'lang-french': {code: 'fr'},
		'lang-fukienese': {name: 'Fukienese'},
		'lang-ga': {name: 'Ga'},
		'lang-german': {code: 'de'},
		'lang-greek': {code: 'el'},
		'lang-guarani': {code: 'gu'},
		'lang-gujarati': {name: 'Gujarati'},
		'lang-hebrew': {code: 'he'},
		'lang-hindi': {code: 'hi'},
		'lang-hmong': {name: 'Hmong'},
		'lang-hunan': {name: 'Hunan'},
		'lang-hungarian': {code: 'hu'},
		'lang-ilocano': {name: 'Iloko'},
		'lang-indonesian': {code: 'id'},
		'lang-italian': {code: 'it'},
		'lang-ixil': {name: 'Ixil'},
		'lang-japanese': {code: 'ja'},
		'lang-karen': {name: 'Karen'},
		'lang-karenni': {name: 'Karenni'},
		'lang-katchi': {name: 'Katchi'},
		'lang-khmer': {code: 'km'},
		'lang-kinyarwanda': {code: 'rw'},
		'lang-kirundi': {name: 'Kirundi'},
		'lang-kiswahili': {name: 'Kiswahili'},
		'lang-korean': {code: 'ko'},
		'lang-kurdish': {code: 'ku'},
		'lang-kurmanji': {name: 'Kurmanji'},
		'lang-ladino': {name: 'Ladino'},
		'lang-laotian': {code: 'lo'},
		'lang-lingala': {code: 'ln'},
		'lang-lithuanian': {code: 'lt'},
		'lang-malagasy': {code: 'mg'},
		'lang-malinke': {name: 'Malinke'},
		'lang-mam': {name: 'Mayan (Mam)'},
		'lang-mandarin': {name: 'Mandarin'},
		'lang-mandingo': {name: 'Mandingo'},
		'lang-marathi': {code: 'mr'},
		'lang-maya': {name: 'Maya'},
		'lang-mexican-sign-language': {name: 'Mexican Sign Language (MSL)'},
		'lang-mien': {name: 'Mien'},
		'lang-mixteco': {name: 'Mixteco'},
		'lang-mongolian': {code: 'mn'},
		'lang-nepali': {code: 'ne'},
		'lang-oromo': {code: 'om'},
		'lang-pashto': {code: 'ps'},
		'lang-polish': {code: 'pl'},
		'lang-portuguese': {code: 'pt'},
		'lang-pulaar': {name: 'Pulaar'},
		'lang-punjabi': {code: 'pa'},
		'lang-rohingya': {name: 'Rohingya'},
		'lang-quechua': {code: 'qu'},
		'lang-romanian': {code: 'ro'},
		'lang-russian': {code: 'ru'},
		'lang-samoan': {code: 'sm'},
		'lang-senufo': {name: 'Senufo'},
		'lang-serbian': {code: 'sr'},
		'lang-shona': {code: 'sn'},
		'lang-sinhala': {code: 'si'},
		'lang-somali': {code: 'so'},
		'lang-spanish': {code: 'es'},
		'lang-swedish': {code: 'sv'},
		'lang-tagalog': {code: 'tl'},
		'lang-taiwanese': {name: 'Taiwanese'},
		'lang-tajiki': {code: 'tg'},
		'lang-tamazight': {name: 'Tamazight'},
		'lang-tamil': {code: 'ta'},
		'lang-telugu': {code: 'te'},
		'lang-thai': {code: 'th'},
		'lang-tibetan': {code: 'bo'},
		'lang-tigrigna': {code: 'ti'},
		'lang-tigrinya': {code: 'ti'},
		'lang-toisanese': {name: 'Toisanese'},
		'lang-tongan': {code: 'to'},
		'lang-turkish': {code: 'tr'},
		'lang-twi': {code: 'tw'},
		'lang-ukrainian': {code: 'uk'},
		'lang-urdu': {code: 'ur'},
		'lang-vietnamese': {code: 'vi'},
		'lang-wolof': {code: 'wo'},
		'lang-yiddish': {code: 'yi'},
		'lang-yoruba': {code: 'yo'}
	},
	required: {
		'req-medical-insurance': 'resource-property.medical-insurance',
		'req-photo-id': 'resource-property.photo-id',
		'req-proof-of-age': 'resource-property.proof-of-age',
		'req-proof-of-income': 'resource-property.proof-of-income',
		'req-proof-of-residence': 'resource-property.proof-of-residence',
		'req-referral': 'resource-property.referral'
	}
};

export default propertyMap;

export const propertyMapKeys = Object.keys(propertyMap).reduce(
	(result, key, index) => {
		const properties = propertyMap[key];

		result[key] = Object.keys(properties);

		return result;
	},
	{}
);

/**
 * Combine a list of properties
 * @param  {Array[]} list list of properties
 * @return {Object} An object of all of the properties
 */
export const combineProperties = (list) => {
	return (
		list?.reduce((result, item) => {
			if (item?.properties) {
				return {...result, ...item.properties};
			}

			return result;
		}, {}) || {}
	);
};

/**
 * Seperate the properties by the corresponding type in the propertyMap
 * @param  {Object} properties List of properties
 * @return {} Properties seperated into their correct type
 */
export const seperatePropsByType = (properties) => {
	const result = {};

	_forEach(propertyMapKeys, (mapValues, mapKey) => {
		_forEach(properties, (propValue, propKey) => {
			if (mapValues.indexOf(propKey) !== -1) {
				if (!result[mapKey]) {
					result[mapKey] = [];
				}

				result[mapKey].push({
					key: propKey,
					slug: propKey,
					text: propertyMap[mapKey][propKey],
					value: propValue,
					defaultMessage: propKey.split('community-')[1],
					description: propKey.split('community-')[1] + ' community'
				});
			}
		});
	});

	return result;
};
