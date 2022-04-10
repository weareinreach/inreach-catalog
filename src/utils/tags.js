import _forEach from 'lodash/forEach';
import _reduce from 'lodash/reduce';
import _uniq from 'lodash/uniq';

import {localeTagMap} from '../utils/locale';

// Master list of all tags in all locales
const resourceTypes = [
	/* AC Community support Category */
	{
		category: 'service-type.community-support',
		type: 'communitySupport',
		acTag: 'Community Support'
	},
	{
		category: 'service-type.community-support',
		type: 'communitySupport',
		acTag: 'Cultural centers',
		title: 'services.cultural-centers'
	},
	{
		category: 'service-type.community-support',
		type: 'communitySupport',
		acTag: 'Cultural centres',
		title: 'services.cultural-centres'
	},
	{
		category: 'service-type.community-support',
		type: 'communitySupport',
		acTag: 'LGBTQ centers',
		title: 'services.lgbtq-centers'
	},
	{
		category: 'service-type.community-support',
		type: 'communitySupport',
		acTag: 'Reception services',
		title: 'services.reception-services'
	},
	{
		category: 'service-type.community-support',
		type: 'communitySupport',
		acTag: 'LGBTQ centres',
		title: 'services.lgbtq-centres'
	},
	{
		category: 'service-type.community-support',
		type: 'communitySupport',
		acTag: 'Sponsors',
		title: 'services.sponsors'
	},
	{
		category: 'service-type.community-support',
		type: 'communitySupport',
		acTag: 'Spiritual Support',
		title: 'services.spiritual'
	},

	/* AC Computers and Internet Category */
	{
		category: 'service-type.computers-internet',
		type: 'computers',
		acTag: 'service-type.computers-internet'
	},

	/* AC Education and Employment Category */
	{
		category: 'service-type.education-employment',
		type: 'educationEmployment',
		acTag: 'service-type.education-employment'
	},
	{
		category: 'service-type.education-employment',
		type: 'educationEmployment',
		acTag: 'Career counselling',
		title: 'services.career-counselling'
	},
	{
		category: 'service-type.education-employment',
		type: 'educationEmployment',
		acTag: 'Career counseling',
		title: 'services.career-counseling'
	},
	{
		category: 'service-type.education-employment',
		type: 'educationEmployment',
		acTag: 'Educational support for LGBTQ youth',
		title: 'services.educational-support-lgbtq-youth'
	},
	{
		category: 'service-type.education-employment',
		type: 'educationEmployment',
		acTag: 'English classes',
		title: 'services.english-classes'
	},
	{
		category: 'service-type.education-employment',
		type: 'educationEmployment',
		acTag: 'Language classes',
		title: 'services.language-classes'
	},
	{
		category: 'service-type.education-employment',
		type: 'educationEmployment',
		acTag: 'Libraries',
		title: 'services.libraries'
	},
	{
		category: 'service-type.education-employment',
		type: 'educationEmployment',
		acTag: 'Scholarships',
		title: 'services.scholarships'
	},

	/* AC Food Category */
	{
		category: 'service-type.food',
		type: 'food',
		acTag: 'Food'
	},

	/* AC Housing Category */
	{category: 'service-type.housing', type: 'housing', acTag: 'Housing'},
	{
		category: 'service-type.housing',
		type: 'housing',
		acTag: 'Drop-in centers for LGBTQ youth',
		title: 'services.drop-in-centers-lgbtq-youth'
	},
	{
		category: 'service-type.housing',
		type: 'housing',
		acTag: 'Drop-in centres for LGBTQ youth',
		title: 'services.drop-in-centres-lgbtq-youth'
	},
	{
		category: 'service-type.housing',
		type: 'housing',
		acTag: 'Emergency housing',
		title: 'services.emergency-housing'
	},
	{
		category: 'service-type.housing',
		type: 'housing',
		acTag: 'Housing information and referrals',
		title: 'services.housing-information-referrals'
	},
	{
		category: 'service-type.housing',
		type: 'housing',
		acTag: 'Short-term housing',
		title: 'services.short-term-housing'
	},

	/* AC Hygiene and Clothing Category */
	{
		category: 'service-type.hygiene-clothing',
		type: 'hygiene',
		acTag: 'Hygiene and Clothing'
	},
	{
		category: 'service-type.hygiene-clothing',
		type: 'hygiene',
		acTag: 'Clothes',
		title: 'services.clothes'
	},
	{
		category: 'service-type.hygiene-clothing',
		type: 'hygiene',
		acTag: 'Gender-affirming items',
		title: 'services.gender-affirming-items'
	},
	{
		category: 'service-type.hygiene-clothing',
		type: 'hygiene',
		acTag: 'Gender-neutral bathrooms',
		title: 'services.gender-neutral-bathrooms'
	},
	{
		category: 'service-type.hygiene-clothing',
		type: 'hygiene',
		acTag: 'Gender-neutral restrooms',
		title: 'services.gender-neutral-restrooms'
	},
	{
		category: 'service-type.hygiene-clothing',
		type: 'hygiene',
		acTag: 'Gender-neutral washrooms',
		title: 'services.gender-neutral-washrooms'
	},
	{
		category: 'service-type.hygiene-clothing',
		type: 'hygiene',
		acTag: 'Hygiene',
		title: 'services.hygiene'
	},

	/* AC Legal Category */
	{category: 'service-type.legal', type: 'legal', acTag: 'Legal'},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Asylum application in Mexico',
		title: 'services.asylum-application-in-mexico'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Asylum application in the US from Mexico',
		title: 'services.asylum-application-in-united-states-from-mexico'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Asylum application',
		title: 'services.asylum-application'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Crime and discrimination',
		title: 'services.crime-discrimination'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Deferred Action for Childhood Arrivals (DACA)',
		title: 'services.deferred-action-childhood-arrivals'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Deportation or removal',
		title: 'services.deportation-or-removal'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Immigration detention',
		title: 'services.immigration-detention'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Legal hotlines',
		title: 'services.legal-hotlines'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Name and gender change',
		title: 'services.name-gender-change'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Refugee claim',
		title: 'services.refugee-claim'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Special Immigrant Juvenile Status (SIJS)',
		title: 'services.special-immigrant-juvenile-status'
	},

	/* AC Mail services Category */
	{category: 'service-type.mail', type: 'mail', acTag: 'Mail'},

	/* AC Medical Category */
	{category: 'service-type.medical', type: 'medical', acTag: 'Medical'},
	{
		category: 'service-type.medical',
		type: 'medical',
		acTag: 'COVID-19 services',
		title: 'services.covid-19'
	},
	{
		category: 'service-type.medical',
		type: 'medical',
		acTag: 'Dental care',
		title: 'services.dental-care'
	},
	{
		category: 'service-type.medical',
		type: 'medical',
		acTag: 'HIV and sexual health',
		title: 'services.hiv-sexual-health'
	},
	{
		category: 'service-type.medical',
		type: 'medical',
		acTag: 'Medical clinics',
		title: 'services.medical-clinics'
	},
	{
		category: 'service-type.medical',
		type: 'medical',
		acTag: 'OBGYN services',
		title: 'services.obgyn-services'
	},
	{
		category: 'service-type.medical',
		type: 'medical',
		acTag: 'Physical evaluations for asylum claim',
		title: 'services.physical-evaluations-for-asylum'
	},
	{
		category: 'service-type.medical',
		type: 'medical',
		acTag: 'Physical evaluations for refugee claim',
		title: 'services.physical-evaluations-for-refugee'
	},
	{
		category: 'service-type.medical',
		type: 'medical',
		acTag: 'Trans health',
		title: 'services.trans-health'
	},

	/* AC Mental Health Category */
	{
		category: 'service-type.mental-health',
		type: 'mentalHealth',
		acTag: 'Mental Health'
	},
	{
		category: 'service-type.mental-health',
		type: 'mentalHealth',
		acTag: 'Hotlines',
		title: 'services.hotlines'
	},
	{
		category: 'service-type.mental-health',
		type: 'mentalHealth',
		acTag: 'Private therapy and counseling',
		title: 'services.private-therapy-counseling'
	},
	{
		category: 'service-type.mental-health',
		type: 'mentalHealth',
		acTag: 'Private therapy and counselling',
		title: 'services.private-therapy-counselling'
	},
	{
		category: 'service-type.mental-health',
		type: 'mentalHealth',
		acTag: 'Psychological evaluations for asylum claim',
		title: 'services.psychological-evaluation-for-asylum'
	},
	{
		category: 'service-type.mental-health',
		type: 'mentalHealth',
		acTag: 'Psychological evaluations for refugee claim',
		title: 'services.psychological-evaluation-for-refugee'
	},
	{
		category: 'service-type.mental-health',
		type: 'mentalHealth',
		acTag: 'Substance use',
		title: 'services.substance-use'
	},
	{
		category: 'service-type.mental-health',
		type: 'mentalHealth',
		acTag: 'Support groups',
		title: 'services.support-groups'
	},
	{
		category: 'service-type.mental-health',
		type: 'mentalHealth',
		acTag: 'Trans support groups',
		title: 'services.trans-support-groups'
	},

	/* AC Sports and Entertainment Category */
	{
		category: 'service-type.sports-entertainment',
		type: 'sportsEntertainment',
		acTag: 'service-type.sports-entertainment'
	},

	/* AC Translation and interpretation Category */
	{
		category: 'service-type.translation-interpretation',
		type: 'speechBubble',
		acTag: 'service-type.translation-interpretation'
	},

	/* AC Transportation Category */
	{
		category: 'service-type.transportation',
		type: 'transportation',
		acTag: 'Transportation'
	},
	{
		category: 'service-type.transportation',
		type: 'transportation',
		acTag: 'Transit passes and discounts',
		title: 'services.transit-passes-and-discounts'
	},
	{
		category: 'service-type.transportation',
		type: 'transportation',
		acTag: 'Transportation assistance',
		title: 'services.transportation-assistance'
	}
];

//use this to exclude certain resource types from the list for certain locales
const localeExclusions = {
	en_US: [
		'services.asylum-application-in-mexico',
		'services.asylum-application-in-united-states-from-mexico',
		'services.career-counselling',
		'services.cultural-centres',
		'services.drop-in-centres-lgbtq-youth',
		'services.gender-neutral-restrooms',
		'services.gender-neutral-washrooms',
		'services.lgbtq-centres',
		'services.reception-services',
		'services.language-classes',
		'services.private-therapy-counselling',
		'services.physical-evaluations-for-refugee',
		'services.psychological-evaluation-for-refugee',
		'services.refugee-claim'
	],
	es_US: [
		'services.asylum-application-in-mexico',
		'services.asylum-application-in-united-states-from-mexico',
		'services.career-counselling',
		'services.cultural-centres',
		'services.drop-in-centres-lgbtq-youth',
		'services.gender-neutral-restrooms',
		'services.gender-neutral-washrooms',
		'services.lgbtq-centres',
		'services.reception-services',
		'services.language-classes',
		'services.private-therapy-counselling',
		'services.physical-evaluations-for-refugee',
		'services.psychological-evaluation-for-refugee',
		'services.refugee-claim'
	],
	en_CA: [
		'services.asylum-application',
		'services.asylum-application-in-mexico',
		'services.asylum-application-in-united-states-from-mexico',
		'services.career-counseling',
		'services.cultural-centers',
		'services.deferred-action-childhood-arrivals',
		'services.drop-in-centers-lgbtq-youth',
		'services.english-classes',
		'services.gender-neutral-bathrooms',
		'services.gender-neutral-restrooms',
		'services.lgbtq-centers',
		'services.physical-evaluations-for-asylum',
		'services.private-therapy-counseling',
		'services.psychological-evaluation-for-asylum',
		'services.special-immigrant-juvenile-status',
		'services.sponsors'
	],
	en_MX: [
		'services.asylum-application',
		'services.career-counselling',
		'services.cultural-centres',
		'services.deferred-action-childhood-arrivals',
		'services.drop-in-centres-lgbtq-youth',
		'services.english-classes',
		'services.gender-neutral-restrooms',
		'services.gender-neutral-washrooms',
		'services.legal-hotlines',
		'services.lgbtq-centres',
		'service-type.mail',
		'services.physical-evaluations-for-refugee',
		'services.private-therapy-counselling',
		'services.psychological-evaluation-for-refugee',
		'services.reception-services',
		'services.refugee-claim',
		'services.short-term-housing',
		'services.special-immigrant-juvenile-status',
		'services.sponsors'
	],
	es_MX: [
		'services.asylum-application',
		'services.career-counselling',
		'services.cultural-centres',
		'services.deferred-action-childhood-arrivals',
		'services.drop-in-centres-lgbtq-youth',
		'services.english-classes',
		'services.gender-neutral-restrooms',
		'services.gender-neutral-washrooms',
		'services.legal-hotlines',
		'services.lgbtq-centres',
		'service-type.mail',
		'services.physical-evaluations-for-refugee',
		'services.private-therapy-counselling',
		'services.psychological-evaluation-for-refugee',
		'services.reception-services',
		'services.refugee-claim',
		'services.short-term-housing',
		'services.special-immigrant-juvenile-status',
		'services.sponsors'
	]
};
const filterResourceType = function (item, locale) {
	if (typeof item.title !== 'undefined') {
		return (
			typeof localeExclusions[locale] === 'undefined' ||
			localeExclusions[locale].indexOf(item.title) === -1
		);
	} else {
		return (
			typeof localeExclusions[locale] === 'undefined' ||
			localeExclusions[locale].indexOf(item.category) === -1
		);
	}
};

const defaultLocale = 'en_US';

const getResourceTypes = (locale = defaultLocale) => {
	return resourceTypes.filter((item) => filterResourceType(item, locale));
};

const getResourceTypesByGroup = (locale = defaultLocale) => {
	let categorized = [],
		categoryIndex;
	resourceTypes
		.filter((item) => filterResourceType(item, locale))
		.forEach((item) => {
			// if parent category does not exist in array, create corresponding object
			if (
				categorized.findIndex(({category}) => category === item.category) === -1
			) {
				let category = {
					category: item.category,
					type: item.type
				};
				categorized.push(category);
			}
			// get array index for item category
			categoryIndex = categorized.findIndex(
				({category}) => category === item.category
			);
			// if resource type is subcategory then add it as child of parent category in
			// categorized list
			if (typeof item.title !== 'undefined') {
				if (!categorized[categoryIndex].children) {
					categorized[categoryIndex].children = [];
				}
				if (
					!categorized[categoryIndex].children.find(
						({title}) => title === item.title
					)
				) {
					categorized[categoryIndex].children.push({
						title: item.title,
						value: item.acTag
					});
				}
			} else {
				categorized[categoryIndex].value = item.acTag;
			}
		});
	return categorized;
};

const resourceTypesByGroup = getResourceTypesByGroup();

const getResourceIndex = (locale = defaultLocale) => {
	let index = {};
	resourceTypes
		.filter((item) => filterResourceType(item, locale))
		.forEach((item) => {
			index[item.acTag] = item;
		});
	return index;
};

const getResourceCategoryIndex = (locale = defaultLocale) => {
	let index = {};
	resourceTypes
		.filter((item) => filterResourceType(item, locale))
		.forEach((item) => {
			if (item.title) {
				index[item.title] = item;
			} else if (
				(typeof item.iconOnly === 'undefined' || !item.iconOnly) &&
				typeof index[item.category] === 'undefined'
			) {
				index[item.category] = item;
			}
		});

	return index;
};

const resourceCategoryIndex = getResourceCategoryIndex();

const getBadge = (tags, locale) => {
	const resourceIndex = getResourceIndex(locale);
	let badge = 'misc';
	tags.forEach((tag) => {
		if (typeof resourceIndex[tag] !== 'undefined' && badge === 'misc') {
			badge = resourceIndex[tag].type;
		}
	});
	return badge;
};

export const getTags = (item, locale) => {
	const tagList = item?.tags?.[localeTagMap?.[locale]];

	if (!tagList) {
		return [];
	}

	const tags = [];

	_forEach(tagList, (subCategory, category) => {
		if (typeof subCategory === 'object') {
			_forEach(subCategory, (value, tagName) => {
				tags.push(tagName);
			});
		} else {
			tags.push(category);
		}
	});

	return tags;
};

export const getOrgTags = (org, locale) => {
	const {services = []} = org || {};
	const orgTags = getTags(org, locale);

	return _uniq(
		_reduce(
			services,
			(result, service = {}) => {
				result = result.concat(getTags(service, locale));

				return result;
			},
			orgTags
		)
	);
};

export default {
	types: resourceTypes,
	getResourceTypes,
	resourceTypesByGroup,
	getResourceTypesByGroup,
	getResourceIndex,
	resourceCategoryIndex,
	getResourceCategoryIndex,
	getBadge
};
