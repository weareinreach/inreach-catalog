import _forEach from 'lodash/forEach';
import _reduce from 'lodash/reduce';
import _uniq from 'lodash/uniq';

import {localeTagMap} from '../utils/locale';

// Master list of all tags in all locales
const resourceTypes = [
	/* InReach Abortion Care Category */
	{
		category: 'service-type.abortion-care',
		type: 'abortionCare',
		acTag: 'Abortion Care'
	},
	{
		category: 'service-type.abortion-care',
		type: 'abortionCare',
		acTag: 'Abortion Providers',
		title: 'Abortion Providers',
		titleIntl: 'services.abortion-care-providers'
	},
	{
		category: 'service-type.abortion-care',
		type: 'abortionCare',
		acTag: 'Financial Assistance',
		title: 'Financial Assistance',
		titleIntl: 'services.abortion-care-financial'
	},
	{
		category: 'service-type.abortion-care',
		type: 'abortionCare',
		acTag: 'Lodging Assistance',
		title: 'Lodging Assistance',
		titleIntl: 'services.abortion-care-lodging'
	},
	{
		category: 'service-type.abortion-care',
		type: 'abortionCare',
		acTag: 'Mail Order Services',
		title: 'Mail Order Services',
		titleIntl: 'services.abortion-care-mail-order',
		info: 'services.abortion-care-mail-order-msg',
		link: 'https://safe2choose.org/safe-abortion/abortion-pills/'
	},
	{
		category: 'service-type.abortion-care',
		type: 'abortionCare',
		acTag: 'Mental Health Support',
		title: 'Mental Health Support',
		titleIntl: 'services.abortion-care-mental'
	},
	{
		category: 'service-type.abortion-care',
		type: 'abortionCare',
		acTag: 'Travel Assistance',
		title: 'Travel Assistance',
		titleIntl: 'services.abortion-care-travel'
	},

	/* InReach Community support Category */
	{
		category: 'service-type.community-support',
		type: 'communitySupport',
		acTag: 'Community Support'
	},
	{
		category: 'service-type.community-support',
		type: 'communitySupport',
		acTag: 'Cultural centers',
		title: 'Cultural centers',
		titleIntl: 'services.cultural-centers'
	},
	{
		category: 'service-type.community-support',
		type: 'communitySupport',
		acTag: 'Cultural centres',
		title: 'Cultural centres',
		titleIntl: 'services.cultural-centres'
	},
	{
		category: 'service-type.community-support',
		type: 'communitySupport',
		acTag: 'LGBTQ centers',
		title: 'LGBTQ centers',
		titleIntl: 'services.lgbtq-centers'
	},
	{
		category: 'service-type.community-support',
		type: 'communitySupport',
		acTag: 'Reception services',
		title: 'Reception services',
		titleIntl: 'services.reception-services'
	},
	{
		category: 'service-type.community-support',
		type: 'communitySupport',
		acTag: 'LGBTQ centres',
		title: 'LGBTQ centres',
		titleIntl: 'services.lgbtq-centres'
	},
	{
		category: 'service-type.community-support',
		type: 'communitySupport',
		acTag: 'Sponsors',
		title: 'Sponsors',
		titleIntl: 'services.sponsors'
	},
	{
		category: 'service-type.community-support',
		type: 'communitySupport',
		acTag: 'Spiritual Support',
		title: 'Spiritual Support',
		titleIntl: 'services.spiritual'
	},

	/* AC Computers and Internet Category */
	{
		category: 'service-type.computers-internet',
		type: 'computers',
		acTag: 'Computers and Internet'
	},

	/* AC Education and Employment Category */
	{
		category: 'service-type.education-employment',
		type: 'educationEmployment',
		acTag: 'Education and Employment'
	},
	{
		category: 'service-type.education-employment',
		type: 'educationEmployment',
		acTag: 'Career counselling',
		title: 'Career counselling',
		titleIntl: 'services.career-counselling'
	},
	{
		category: 'service-type.education-employment',
		type: 'educationEmployment',
		acTag: 'Career counseling',
		title: 'Career counseling',
		titleIntl: 'services.career-counseling'
	},
	{
		category: 'service-type.education-employment',
		type: 'educationEmployment',
		acTag: 'Educational support for LGBTQ youth',
		title: 'Educational support for LGBTQ youth',
		titleIntl: 'services.educational-support-lgbtq-youth'
	},
	{
		category: 'service-type.education-employment',
		type: 'educationEmployment',
		acTag: 'English classes',
		title: 'English classes',
		titleIntl: 'services.english-classes'
	},
	{
		category: 'service-type.education-employment',
		type: 'educationEmployment',
		acTag: 'Language classes',
		title: 'Language classes',
		titleIntl: 'services.language-classes'
	},
	{
		category: 'service-type.education-employment',
		type: 'educationEmployment',
		acTag: 'Leadership training and professional development',
		title: 'Leadership training and professional development',
		titleIntl: 'services.leadership'
	},
	{
		category: 'service-type.education-employment',
		type: 'educationEmployment',
		acTag: 'Libraries',
		title: 'Libraries',
		titleIntl: 'services.libraries'
	},
	{
		category: 'service-type.education-employment',
		type: 'educationEmployment',
		acTag: 'Scholarships',
		title: 'Scholarships',
		titleIntl: 'services.scholarships'
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
		title: 'Drop-in centers for LGBTQ youth',
		titleIntl: 'services.drop-in-centers-lgbtq-youth'
	},
	{
		category: 'service-type.housing',
		type: 'housing',
		acTag: 'Drop-in centres for LGBTQ youth',
		title: 'Drop-in centres for LGBTQ youth',
		titleIntl: 'services.drop-in-centres-lgbtq-youth'
	},
	{
		category: 'service-type.housing',
		type: 'housing',
		acTag: 'Emergency housing',
		title: 'Emergency housing',
		titleIntl: 'services.emergency-housing'
	},
	{
		category: 'service-type.housing',
		type: 'housing',
		acTag: 'Housing information and referrals',
		title: 'Housing information and referrals',
		titleIntl: 'services.housing-information-referrals'
	},
	{
		category: 'service-type.housing',
		type: 'housing',
		acTag: 'Short-term housing',
		title: 'Short-term housing',
		titleIntl: 'services.short-term-housing'
	},
	{
		category: 'service-type.housing',
		type: 'housing',
		acTag: 'Trans housing',
		title: 'Trans housing',
		titleIntl: 'services.trans-housing'
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
		title: 'Clothes',
		titleIntl: 'services.clothes'
	},
	{
		category: 'service-type.hygiene-clothing',
		type: 'hygiene',
		acTag: 'Gender-affirming items',
		title: 'Gender-affirming items',
		titleIntl: 'services.gender-affirming-items'
	},
	{
		category: 'service-type.hygiene-clothing',
		type: 'hygiene',
		acTag: 'Gender-neutral bathrooms',
		title: 'Gender-neutral bathrooms',
		titleIntl: 'services.gender-neutral-bathrooms'
	},
	{
		category: 'service-type.hygiene-clothing',
		type: 'hygiene',
		acTag: 'Gender-neutral restrooms',
		title: 'Gender-neutral restrooms',
		titleIntl: 'services.gender-neutral-restrooms'
	},
	{
		category: 'service-type.hygiene-clothing',
		type: 'hygiene',
		acTag: 'Gender-neutral washrooms',
		title: 'Gender-neutral washrooms',
		titleIntl: 'services.gender-neutral-washrooms'
	},
	{
		category: 'service-type.hygiene-clothing',
		type: 'hygiene',
		acTag: 'Hygiene',
		title: 'Hygiene',
		titleIntl: 'services.hygiene'
	},
	{
		category: 'service-type.hygiene-clothing',
		type: 'hygiene',
		acTag: 'Haircuts and stylists',
		title: 'Haircuts and stylists',
		titleIntl: 'services.haircuts-stylists'
	},

	/* AC Legal Category */
	{category: 'service-type.legal', type: 'legal', acTag: 'Legal'},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Asylum application in Mexico',
		title: 'Asylum application in Mexico (Affirmative Asylum)',
		titleIntl: 'services.asylum-application-in-mexico'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Asylum application in the US from Mexico',
		title: 'Asylum application in the US from Mexico (Affirmative Asylum)',
		titleIntl: 'services.asylum-application-in-united-states-from-mexico'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Asylum application',
		title: 'Asylum application (Affirmative Asylum)',
		titleIntl: 'services.asylum-application'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Citizenship',
		title: 'Citizenship',
		titleIntl: 'services.citizenship'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Crime and discrimination',
		title: 'Crime and discrimination',
		titleIntl: 'services.crime-discrimination'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Deferred Action for Childhood Arrivals (DACA)',
		title: 'Deferred Action for Childhood Arrivals (DACA)',
		titleIntl: 'services.deferred-action-childhood-arrivals'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Deportation or removal',
		title: 'Deportation or removal (Defensive Asylum)',
		titleIntl: 'services.deportation-or-removal'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Employment Authorization',
		title: 'Employment Authorization',
		titleIntl: 'services.employment-authorization'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Family Petitions',
		title: 'Family Petitions',
		titleIntl: 'services.family-petitions'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Immigration detention',
		title: 'Immigration detention',
		titleIntl: 'services.immigration-detention'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Legal hotlines',
		title: 'Legal hotlines',
		titleIntl: 'services.legal-hotlines'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Name and gender change',
		title: 'Name and gender change',
		titleIntl: 'services.name-gender-change'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Refugee claim',
		title: 'Refugee claim',
		titleIntl: 'services.refugee-claim'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Residency',
		title: 'Residency',
		titleIntl: 'services.residency'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'Special Immigrant Juvenile Status (SIJS)',
		title: 'Special Immigrant Juvenile Status (SIJS)',
		titleIntl: 'services.special-immigrant-juvenile-status'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'T Visa',
		title: 'T Visa',
		titleIntl: 'services.t-visa'
	},
	{
		category: 'service-type.legal',
		type: 'legal',
		acTag: 'U Visa',
		title: 'U Visa',
		titleIntl: 'services.u-visa'
	},

	/* AC Mail services Category */
	{category: 'service-type.mail', type: 'mail', acTag: 'Mail'},

	/* AC Medical Category */
	{category: 'service-type.medical', type: 'medical', acTag: 'Medical'},
	{
		category: 'service-type.medical',
		type: 'medical',
		acTag: 'COVID-19 services',
		title: 'COVID-19 services',
		titleIntl: 'services.covid-19'
	},
	{
		category: 'service-type.medical',
		type: 'medical',
		acTag: 'Dental care',
		title: 'Dental care',
		titleIntl: 'services.dental-care'
	},
	{
		category: 'service-type.medical',
		type: 'medical',
		acTag: 'Gender Affirming Surgery',
		title: 'Gender Affirming Surgery',
		titleIntl: 'services.trans-health-gender-affirming-surgery'
	},
	{
		category: 'service-type.medical',
		type: 'medical',
		acTag: 'HIV and sexual health',
		title: 'HIV and sexual health',
		titleIntl: 'services.hiv-sexual-health'
	},
	{
		category: 'service-type.medical',
		type: 'medical',
		acTag: 'Hormone and Surgery Letters',
		title: 'Hormone and Surgery Letters',
		titleIntl: 'services.trans-health-hormone-and-surgery-letters'
	},
	{
		category: 'service-type.medical',
		type: 'medical',
		acTag: 'Hormone Therapy',
		title: 'Hormone Therapy',
		titleIntl: 'services.trans-health-hormone-therapy'
	},
	{
		category: 'service-type.medical',
		type: 'medical',
		acTag: 'Medical clinics',
		title: 'Medical clinics',
		titleIntl: 'services.medical-clinics'
	},
	{
		category: 'service-type.medical',
		type: 'medical',
		acTag: 'OBGYN services',
		title: 'OBGYN services',
		titleIntl: 'services.obgyn-services'
	},
	{
		category: 'service-type.medical',
		type: 'medical',
		acTag: 'Physical evaluations for asylum claim',
		title: 'Physical evaluations for asylum claim',
		titleIntl: 'services.physical-evaluations-for-asylum'
	},
	{
		category: 'service-type.medical',
		type: 'medical',
		acTag: 'Physical evaluations for refugee claim',
		title: 'Physical evaluations for refugee claim',
		titleIntl: 'services.physical-evaluations-for-refugee'
	},
	{
		category: 'service-type.medical',
		type: 'medical',
		acTag: 'Primary Care',
		title: 'Primary Care',
		titleIntl: 'services.trans-health-primary-care'
	},
	{
		category: 'service-type.medical',
		type: 'medical',
		acTag: 'Speech Therapy',
		title: 'Speech Therapy',
		titleIntl: 'services.trans-health-speech-therapy'
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
		acTag: 'BIPOC support groups',
		title: 'BIPOC support groups',
		titleIntl: 'services.bipoc-support-groups'
	},
	{
		category: 'service-type.mental-health',
		type: 'mentalHealth',
		acTag: 'Hotlines',
		title: 'Hotlines',
		titleIntl: 'services.hotlines'
	},
	{
		category: 'service-type.mental-health',
		type: 'mentalHealth',
		acTag: 'Private therapy and counseling',
		title: 'Private therapy and counseling',
		titleIntl: 'services.private-therapy-counseling'
	},
	{
		category: 'service-type.mental-health',
		type: 'mentalHealth',
		acTag: 'Private therapy and counselling',
		title: 'Private therapy and counselling',
		titleIntl: 'services.private-therapy-counselling'
	},
	{
		category: 'service-type.mental-health',
		type: 'mentalHealth',
		acTag: 'Psychological evaluations for asylum claim',
		title: 'Psychological evaluations for asylum claim',
		titleIntl: 'services.psychological-evaluation-for-asylum'
	},
	{
		category: 'service-type.mental-health',
		type: 'mentalHealth',
		acTag: 'Psychological evaluations for refugee claim',
		title: 'Psychological evaluations for refugee claim',
		titleIntl: 'services.psychological-evaluation-for-refugee'
	},
	{
		category: 'service-type.mental-health',
		type: 'mentalHealth',
		acTag: 'Substance use',
		title: 'Substance use',
		titleIntl: 'services.substance-use'
	},
	{
		category: 'service-type.mental-health',
		type: 'mentalHealth',
		acTag: 'Support for conversion therapy survivors',
		title: 'Support for conversion therapy survivors',
		titleIntl: 'services.support-for-conversion-therapy-survivors'
	},
	{
		category: 'service-type.mental-health',
		type: 'mentalHealth',
		acTag: 'Support groups',
		title: 'Support groups',
		titleIntl: 'services.support-groups'
	},
	{
		category: 'service-type.mental-health',
		type: 'mentalHealth',
		acTag: 'Trans support groups',
		title: 'Trans support groups',
		titleIntl: 'services.trans-support-groups'
	},

	/* AC Sports and Entertainment Category */
	{
		category: 'service-type.sports-entertainment',
		type: 'sportsEntertainment',
		acTag: 'Sports and Entertainment'
	},

	/* AC Translation and interpretation Category */
	{
		category: 'service-type.translation-interpretation',
		type: 'speechBubble',
		acTag: 'Translation and Interpretation'
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
		title: 'Transit passes and discounts',
		titleIntl: 'services.transit-passes-and-discounts'
	},
	{
		category: 'service-type.transportation',
		type: 'transportation',
		acTag: 'Transportation assistance',
		title: 'Transportation assistance',
		titleIntl: 'services.transportation-assistance'
	}
];

//use this to exclude certain resource types from the list for certain locales
const localeExclusions = {
	en_US: [
		/*** title values ***/
		'Asylum application in Mexico (Affirmative Asylum)',
		'Asylum application in the US from Mexico (Affirmative Asylum)',
		'Career counselling',
		'Cultural centres',
		'Drop-in centres for LGBTQ youth',
		'Gender-neutral restrooms',
		'Gender-neutral washrooms',
		'LGBTQ centres',
		'Reception services',
		'Language classes',
		'Private therapy and counselling',
		'Physical evaluations for refugee claim',
		'Psychological evaluations for refugee claim',
		'Refugee claim',
		/*** Intl values ***/
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
		/*** title values ***/
		'Asylum application in Mexico (Affirmative Asylum)',
		'Asylum application in the US from Mexico (Affirmative Asylum)',
		'Career counselling',
		'Cultural centres',
		'Drop-in centres for LGBTQ youth',
		'Gender-neutral restrooms',
		'Gender-neutral washrooms',
		'LGBTQ centres',
		'Reception services',
		'Language classes',
		'Private therapy and counselling',
		'Physical evaluations for refugee claim',
		'Psychological evaluations for refugee claim',
		'Refugee claim',
		/*** Intl values ***/
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
		/*** title values ***/
		'Asylum application (Affirmative Asylum)',
		'Asylum application in Mexico (Affirmative Asylum)',
		'Asylum application in the US from Mexico (Affirmative Asylum)',
		'BIPOC support groups',
		'Career counseling',
		'Citizenship',
		'Cultural centers',
		'Deferred Action for Childhood Arrivals (DACA)',
		'Drop-in centers for LGBTQ youth',
		'Employment Authorization',
		'English classes',
		'Family Petitions',
		'Gender-neutral bathrooms',
		'Gender-neutral restrooms',
		'Leadership training and professional development',
		'LGBTQ centers',
		'Leadership training and professional development',
		'Physical evaluations for asylum claim',
		'Private therapy and counseling',
		'Psychological evaluations for asylum claim',
		'Residency',
		'Special Immigrant Juvenile Status (SIJS)',
		'Sponsors',
		'Support for conversion therapy survivors',
		'T Visa',
		'Trans housing',
		'U Visa',
		/*** Intl values ***/
		'services.asylum-application',
		'services.asylum-application-in-mexico',
		'services.asylum-application-in-united-states-from-mexico',
		'services.bipoc-support-groups',
		'services.career-counseling',
		'services.citizenship',
		'services.cultural-centers',
		'services.deferred-action-childhood-arrivals',
		'services.drop-in-centers-lgbtq-youth',
		'services.employment-authorization',
		'services.english-classes',
		'services.family-petition',
		'services.gender-neutral-bathrooms',
		'services.gender-neutral-restrooms',
		'services.leadership',
		'services.lgbtq-centers',
		'services.physical-evaluations-for-asylum',
		'services.private-therapy-counseling',
		'services.psychological-evaluation-for-asylum',
		'services.residency',
		'services.special-immigrant-juvenile-status',
		'services.sponsors',
		'services.support-for-conversion-therapy-survivors',
		'services.t-visa',
		'services.trans-housing',
		'services.u-visa'
	],
	en_MX: [
		/*** title values ***/
		'Asylum application (Affirmative Asylum)',
		'BIPOC support groups',
		'Career counselling',
		'Citizenship',
		'Cultural centres',
		'Deferred Action for Childhood Arrivals (DACA)',
		'Drop-in centres for LGBTQ youth',
		'Employment Authorization',
		'English classes',
		'Family Petitions',
		'Gender-neutral restrooms',
		'Gender-neutral washrooms',
		'Leadership training and professional development',
		'Legal hotlines',
		'LGBTQ centres',
		'Mail',
		'Physical evaluations for refugee claim',
		'Private therapy and counselling',
		'Psychological evaluations for refugee claim',
		'Reception services',
		'Refugee claim',
		'Residency',
		'Short-term housing',
		'Special Immigrant Juvenile Status (SIJS)',
		'Sponsors',
		'Support for conversion therapy survivors',
		'T Visa',
		'Trans housing',
		'U Visa',
		/*** Intl values ***/
		'services.asylum-application',
		'services.bipoc-support-groups',
		'services.career-counselling',
		'services.citizenship',
		'services.cultural-centres',
		'services.deferred-action-childhood-arrivals',
		'services.drop-in-centres-lgbtq-youth',
		'services.employment-authorization',
		'services.english-classes',
		'services.family-petition',
		'services.gender-neutral-restrooms',
		'services.gender-neutral-washrooms',
		'services.leadership',
		'services.legal-hotlines',
		'services.lgbtq-centres',
		'service-type.mail',
		'services.physical-evaluations-for-refugee',
		'services.private-therapy-counselling',
		'services.psychological-evaluation-for-refugee',
		'services.reception-services',
		'services.refugee-claim',
		'services.residency',
		'services.short-term-housing',
		'services.special-immigrant-juvenile-status',
		'services.sponsors',
		'services.support-for-conversion-therapy-survivors',
		'services.t-visa',
		'services.trans-housing',
		'services.u-visa'
	],
	es_MX: [
		/*** title values ***/
		'Asylum application (Affirmative Asylum)',
		'BIPOC support groups',
		'Career counselling',
		'Citizenship',
		'Cultural centres',
		'Deferred Action for Childhood Arrivals (DACA)',
		'Drop-in centres for LGBTQ youth',
		'Employment Authorization',
		'English classes',
		'Family Petitions',
		'Gender-neutral restrooms',
		'Gender-neutral washrooms',
		'Leadership training and professional development',
		'Legal hotlines',
		'LGBTQ centres',
		'Mail',
		'Physical evaluations for refugee claim',
		'Private therapy and counselling',
		'Psychological evaluations for refugee claim',
		'Reception services',
		'Refugee claim',
		'Residency',
		'Short-term housing',
		'Special Immigrant Juvenile Status (SIJS)',
		'Sponsors',
		'Support for conversion therapy survivors',
		'T Visa',
		'Trans housing',
		'U Visa',
		/*** Intl values ***/
		'services.asylum-application',
		'services.bipoc-support-groups',
		'services.career-counselling',
		'services.citizenship',
		'services.cultural-centres',
		'services.deferred-action-childhood-arrivals',
		'services.drop-in-centres-lgbtq-youth',
		'services.employment-authorization',
		'services.english-classes',
		'services.family-petition',
		'services.gender-neutral-restrooms',
		'services.gender-neutral-washrooms',
		'services.leadership',
		'services.legal-hotlines',
		'services.lgbtq-centres',
		'service-type.mail',
		'services.physical-evaluations-for-refugee',
		'services.private-therapy-counselling',
		'services.psychological-evaluation-for-refugee',
		'services.reception-services',
		'services.refugee-claim',
		'services.residency',
		'services.short-term-housing',
		'services.special-immigrant-juvenile-status',
		'services.sponsors',
		'services.support-for-conversion-therapy-survivors',
		'services.t-visa',
		'services.trans-housing',
		'services.u-visa'
	]
};
const filterResourceType = function (item, locale) {
	if (
		typeof item.title !== 'undefined' ||
		typeof item.titleIntl !== 'undefined'
	) {
		return (
			typeof localeExclusions[locale] === 'undefined' ||
			localeExclusions[locale].indexOf(item.title) === -1 ||
			localeExclusions[locale].indexOf(item.titleIntl) === -1
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
			if (
				typeof item.title !== 'undefined' ||
				typeof item.titleIntl !== 'undefined'
			) {
				if (!categorized[categoryIndex].children) {
					categorized[categoryIndex].children = [];
				}
				if (
					!categorized[categoryIndex].children.find(
						({title}) => title === item.title
					)
				) {
					if (item.info !== 'undefined') {
						categorized[categoryIndex].children.push({
							titleIntl: item.titleIntl,
							title: item.title,
							value: item.acTag,
							info: item.info,
							link: item.link
						});
					} else {
						categorized[categoryIndex].children.push({
							titleIntl: item.titleIntl,
							title: item.title,
							value: item.acTag
						});
					}
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
			if (item.title || item.titleIntl) {
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
