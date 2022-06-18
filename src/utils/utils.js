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
	//remove undefined key helper function
	const rmUnKeys = (tmpObj) => {
		return Object.keys(tmpObj).forEach(
			(key) => tmpObj[key] === undefined && delete tmpObj[key]
		);
	};

	//determine language field from langCode
	var langField = '_' + langCode.toUpperCase();

	//email function

	//phone function

	//locations function

	//service function

	//access function

	//return the specified language field value if one exsits, else return the original
	//hardcoded to _ES for now
	var tempResults = [];

	for (var result of results) {
		var tempResult = '';
		var tempEmails = [];
		var tempLocations = [];
		var tempPhones = [];
		var tempServices = [];

		//update emails array
		if (Array.isArray(result?.emails)) {
			var tempEmail = '';
			for (var email of result.emails) {
				tempEmail = {...email, title: email?.title_ES || email?.title};
				rmUnKeys(tempEmail);
				tempEmails.push(tempEmail);
			}
		}

		//update locations array
		if (Array.isArray(result?.locations)) {
			var tempLocation = '';
			for (var location of result.locations) {
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

		//update phones array
		if (Array.isArray(result?.phones)) {
			var tempPhone = '';
			for (var phone of result.phones) {
				tempPhone = {
					...phone,
					phone_type: phone?.phone_type_ES || phone?.phone_type
				};
				rmUnKeys(tempPhone);
				tempPhones.push(tempPhone);
			}
		}

		//update services array
		if (Array.isArray(result?.services)) {
			var tempService = '';
			for (var service of result.services) {
				//update access instructions
				var tempAccessInstructions = [];
				if (Array.isArray(service?.access_instructions)) {
					var tempAccessInstruction = '';
					for (var access_instruction of service.access_instructions) {
						tempAccessInstruction = {
							...access_instruction,
							access_value:
								access_instruction?.access_value_ES ||
								access_instruction.access_value,
							instructions:
								access_instruction?.instruction_ES ||
								access_instruction.instructions
						};
						rmUnKeys(tempAccessInstruction);
						tempAccessInstructions.push(tempAccessInstruction);
					}
				}

				tempService = {
					...service,
					description: service?.description_ES || service?.description,
					name: service?.name_ES || service?.name,
					slug: service?.slug_ES || service?.slug,
					access_instructions: tempAccessInstructions
				};
				rmUnKeys(tempService);
				tempServices.push(tempService);
			}
		}

		//create temporary result object
		tempResult = {
			...result,
			description: result?.description_ES || result.description,
			website: result?.website_ES || result.website,
			alert_message: result?.alert_message_ES || result.alert_message,
			name: result?.name_ES || result.name,
			slug: result?.slug_ES || result.slug,
			emails: tempEmails,
			locations: tempLocations,
			phones: tempPhones,
			services: tempServices
		};

		//add tempResult Object to tempResults array
		tempResults.push(tempResult);
	}
	//return the array
	console.log(tempResults);
	return tempResults;
};
