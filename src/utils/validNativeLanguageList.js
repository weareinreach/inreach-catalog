import langs from 'langs/data';

var validNativeLangs = [{name: 'English'}, {name: 'Spanish'}];

var ValidNativeLanguageList = {
	all: getValidNativeLanguagueList,
	byCode: getValidNativeLanguageByCode,
	codeByName: getValidNativeLanguageCodeByName,
	filteredLanguageList: getFilteredNativeLanguageList
};

function getValidNativeLanguagueList() {
	for (var validNativeLang of validNativeLangs) {
		// eslint-disable-next-line
		langs.forEach(function (lang) {
			if (lang['name'] === validNativeLang['name']) {
				validNativeLang['1'] = lang['1'];
				validNativeLang['local'] = lang['local'];
			}
		});
	}
	return validNativeLangs;
}

function getValidNativeLanguageByCode(code) {
	for (var validNativeLang of validNativeLangs) {
		if (validNativeLang['1'] === code) {
			return validNativeLang['local'];
		}
	}
}

function getValidNativeLanguageCodeByName(name) {
	for (var validNativeLang of validNativeLangs) {
		if (validNativeLang['local'] === name) {
			return validNativeLang['1'];
		}
	}
}

/**
 * this function filters the list of languages based on user input (both english and local spelling)
 * @param {String} language
 * return an array of languages matching the filter
 */
function getFilteredNativeLanguageList(language) {
	return validNativeLangs.filter(function (lang) {
		return (
			lang.name.toLowerCase().indexOf(language.toLowerCase()) !== -1 ||
			lang.local.toLowerCase().indexOf(language.toLowerCase()) !== -1
		);
	});
}

export default ValidNativeLanguageList;
