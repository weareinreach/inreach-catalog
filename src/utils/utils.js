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

/**** Helper functions to return Native Language Data ***/
//remove undefined key helper function
const rmUnKeys = (tmpObj) => {
	return Object.keys(tmpObj).forEach(
		(key) => tmpObj[key] === undefined && delete tmpObj[key]
	);
};

//determine language field from langCode
const createLangField = (field, langCode) => {
	var langField = '_' + langCode.toUpperCase();
	return langField;
};

//function to translate email fields
const updateEmails = (emailsArr) => {
	var tempEmails = [];

	if (Array.isArray(emailsArr)) {
		var tempEmail = '';
		for (var email of emailsArr) {
			tempEmail = {...email, title: email?.title_ES || email?.title};
			rmUnKeys(tempEmail);
			tempEmails.push(tempEmail);
		}
	}
	return tempEmails;
};

//function to translate phone fields
const updatePhones = (phonessArr) => {
	var tempPhones = [];

	if (Array.isArray(phonessArr)) {
		var tempPhone = '';
		for (var phone of phonessArr) {
			tempPhone = {
				...phone,
				phone_type: phone?.phone_type_ES || phone?.phone_type
			};
			rmUnKeys(tempPhone);
			tempPhones.push(tempPhone);
		}
	}
	return tempPhones;
};

//function to translate location fields
const updateLocations = (locationsArr) => {
	var tempLocations = [];

	if (Array.isArray(locationsArr)) {
		var tempLocation = '';
		for (var location of locationsArr) {
			tempLocation = {
				...location,
				country: location?.country_ES || location?.country,
				state: location?.state_ES || location?.state,
				city: location?.city_ES || location?.city
			};
			rmUnKeys(tempLocation);
			tempLocations.push(tempLocation);
		}
	}
	return tempLocations;
};

//function to translate service fields
const updateServices = (servicesArr) => {
	var tempServices = [];

	if (Array.isArray(servicesArr)) {
		var tempService = '';
		for (var service of servicesArr) {
			//update access instructions

			tempService = {
				...service,
				description: service?.description_ES || service?.description,
				name: service?.name_ES || service?.name,
				slug: service?.slug, //use the english slug for services until the API is updated
				// slug: service?.slug_ES || service?.slug,
				access_instructions: updateAccessInstructions(
					service?.access_instructions
				)
			};
			rmUnKeys(tempService);
			tempServices.push(tempService);
		}
	}
	return tempServices;
};

//function to translate access_instruction fields
const updateAccessInstructions = (accessArr) => {
	var tempAccessInstructions = [];
	if (Array.isArray(accessArr)) {
		var tempAccessInstruction = '';
		for (var access_instruction of accessArr) {
			tempAccessInstruction = {
				...access_instruction,
				access_value:
					access_instruction?.access_value_ES ||
					access_instruction.access_value,
				instructions:
					access_instruction?.instruction_ES || access_instruction.instructions
			};
			rmUnKeys(tempAccessInstruction);
			tempAccessInstructions.push(tempAccessInstruction);
		}
	}
	return tempAccessInstructions;
};

//use the createLangField function to return the specified language field value if one exsits,
//else return the original
//hardcoded to _ES for now
const updateOrgResults = (results) => {
	var tempResults = [];
	var tempResult = '';

	if (Array.isArray(results)) {
		for (var result of results) {
			tempResult = '';

			//create temporary result object
			tempResult = {
				...result,
				description: result?.description_ES || result.description,
				website: result?.website_ES || result.website,
				alert_message: result?.alert_message_ES || result.alert_message,
				name: result?.name_ES || result.name,
				slug: result?.slug_ES || result.slug,
				emails: updateEmails(result?.emails),
				locations: updateLocations(result?.locations),
				phones: updatePhones(result?.phones),
				services: updateServices(result?.services)
			};

			//add tempResult Object to tempResults array
			tempResults.push(tempResult);
		}
		//return the array
		return tempResults;
	} else {
		//create temporary result object
		tempResult = {
			...results,
			description: results?.description_ES || results.description,
			website: results?.website_ES || results.website,
			alert_message: results?.alert_message_ES || results.alert_message,
			name: results?.name_ES || results.name,
			slug: results?.slug_ES || results.slug,
			emails: updateEmails(results?.emails),
			locations: updateLocations(results?.locations),
			phones: updatePhones(results?.phones),
			services: updateServices(results?.services)
		};
		return tempResult;
	}
};

//use this to update organizations
export const returnOrgNativeLanguageData = (results, langCode) => {
	//now run everything
	return updateOrgResults(results, langCode);
};

//use this to update services
export const returnServiceNativeLanguageData = (results, langCode) => {
	//now run everything
	return updateOrgResults(results, langCode);
};
