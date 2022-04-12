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

export const getLangData = (orgObject, language) => {
	// potential _ES fileds
	// top level - website_ES, description_ES, alert_message_ES, slug_ES, name_ES
	// phone - phone_type_ES
	// emails - title_ES
	// locations - name_ES, city_ES, state_ES, country_ES
	// services - description_ES, name_ES, slug_ES, access_instructions -> access_value_ES, instructions_ES
	return orgObject[orgDataField + '_ES']
		? orgObject[orgDataField + '_ES']
		: orgObject[orgDataField];
};
