import {getLanguage} from './language';
import ValidLanguageList from './validLanguageList';

export const VISIBILITY = {
	PRIVATE: 'private',
	SHARED: 'shared',
	PUBLIC: 'public'
};

export const isInList = (target, list) => {
	if (!list.items || list.items?.length <= 0) {
		return false;
	}
	return list.items.find((it) => it.fetchable_id === target);
};

export const hasAccessToList = (user, list) => {
	if (!user || !list) {
		return false;
	}
	return belongsToUser(user, list)
		? true
		: sharedWithUser(user.email, list)
		? true
		: false;
};

export const belongsToUser = (user, list) => {
	if (!user || !user.lists?.length > 0) {
		return false;
	}
	return user.lists.find((collection) => collection._id === list._id)
		? true
		: false;
};

const sharedWithUser = (email, list) => {
	if (!email || !list) {
		return false;
	}
	return list.shared_with.find((shared) => shared.email === email)
		? true
		: false;
};

const googleTranslate = (data, language) => {
	console.log('google translate function called');
	return; //google translated value
};

export const getLangData = (data, type) => {
	// if(!orgObjectResults){
	// 	return
	// }else {
	console.log(data);

	const languageCode = ValidLanguageList.codeByName(getLanguage());

	let tempData;
	tempData = data;

	console.log(tempData);

	switch (languageCode) {
		case 'es':
			console.log('use spanish from DB');
			//update tempObject
			Array.isArray(tempData) && type == 'organization'
				? tempData.forEach(changeData)
				: changeData(tempData);
			//return new object
			return tempData;
			break;
		default:
			//return the original object
			return data;
	}
	// }

	function whichField(item, fieldName) {
		if (Array.isArray(item)) {
			item.forEach(function (item) {
				item[fieldName] = item[fieldName + '_ES']
					? item[fieldName + '_ES']
					: item[fieldName];
			});
		} else {
			item[fieldName] = item[fieldName + '_ES']
				? item[fieldName + '_ES']
				: item[fieldName];
		}
	}
	function changeData(item, index) {
		item.description
			? whichField(item, 'description')
			: console.log('no description data');
		item.website ? whichField(item, 'website') : console.log('no website data');
		item.alert_message
			? whichField(item, 'alert_message')
			: console.log('no alert_message data');
		type == 'organization' && item.slug
			? whichField(item, 'slug')
			: console.log('no slug data');
		item.name ? whichField(item, 'name') : console.log('no name data');
		item.phones.length > 0
			? whichField(item.phones, 'phone_type')
			: console.log('no phone data');
		item.emails.length > 0
			? whichField(item.emails, 'title')
			: console.log('no email data');
		item.locations.length > 0
			? whichField(item.locations, 'name')
			: console.log('no lcation name data');
		item.locations.length > 0
			? whichField(item.locations, 'city')
			: console.log('no location city data');
		item.locations.length > 0
			? whichField(item.locations, 'state')
			: console.log('no location state data');
		item.locations.length > 0
			? whichField(item.locations, 'country')
			: console.log('no location country data');
		//for organizations only
		type == 'organization' && item.services && item.services.length > 0
			? whichField(item.services, 'description')
			: console.log('no services description data');
		type == 'organization' && item.services && item.services.length > 0
			? whichField(item.services, 'name')
			: console.log('no services name data');
		// type == 'organization' && item.services.length > 0
		// 	? whichField(item.services, 'slug')
		// 	: console.log('no services slug data');
		type == 'organization' && item.servces && item.services.length > 0
			? item.services.access_instructions
				? whichField(item.services.access_instructions, 'access_value')
				: console.log('no access_value data')
			: console.log('no access instructions data');
		type == 'organization' && item.services && item.services.length > 0
			? item.services.access_instructions
				? whichField(item.services.access_instructions, 'instructions')
				: console.log('no access_instructions data')
			: console.log('no access instructions data');
		//for services only
		type == 'service' &&
		item.access_instructions &&
		item.access_instructions.length > 0
			? whichField(item.access_instructions, 'access_value')
			: console.log('no access_value data');
		type == 'service' &&
		item.access_instructions &&
		item.access_instructions.length > 0
			? whichField(item.access_instructions, 'instructions')
			: console.log('no access_instructions data');
		tempData[index] = item;
	}

	//this function will return obejct data based on locale and language choices
	// English + locale = English
	// Spanish + locale = Either Native Spanish or Google translate spanish depending on the locale
	//	// if locale is MX or US - return values from _ES fields,
	//	// else use the google translate function and retun google translate Spanish
	// Any language other than English or Spanish, use google translate
	// Applicable fields to translate
	//	// top level - website_ES, description_ES, alert_message_ES, slug_ES, name_ES
	//	// phones - phone_type_ES
	// 	// emails - title_ES
	// 	// locations - name_ES, city_ES, state_ES, country_ES
	// 	// services - description_ES, name_ES, slug_ES,
	//	//	// services.access_instructions - access_value_ES, instructions_ES
};
