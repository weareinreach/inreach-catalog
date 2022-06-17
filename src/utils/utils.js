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

export const returnNativeLanguageData = (results, langCode) => {
	//determine language field from langCode
	var langField = '_' + langCode.toUpperCase();

	//return the specified language field value if one exsits, else return the original
	//hardcoded to _ES for now
	var tempResults = [];
	for (var result of results) {
		var tempResult = '';
		tempResult = {
			...result,
			description: result?.description_ES || result.description,
			website: result?.website_ES || result.website,
			alert_message: result?.alert_message_ES || result.alert_message,
			name: result?.name_ES || result.name,
			slug: result?.slug_ES || result.slug
		};

		tempResults.push(tempResult);
	}
	console.log(tempResults);
	return tempResults;
};
