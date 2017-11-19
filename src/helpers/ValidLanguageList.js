import React from 'react';

import langs from 'langs/data';

var validLangs = [
{"name":"Afrikaans"},
{"name":"Albanian"},
{"name":"Amharic"},
{"name":"Arabic"},
{"name":"Armenian"},
{"name":"Azerbaijani"},
{"name":"Basque"},
{"name":"Belarusian"},
{"name":"Bengali"},
{"name":"Bosnian"},
{"name":"Bulgarian"},
{"name":"Catalan"},
{"name":"Cebuano", "1":"ceb", "local": "Bisaya"},//
{"name":"Chinese (Simplified)", "1":"zh-cn", "local":"廣東話"},//
{"name":"Chinese (Traditional)", "1":"zh-tw", "local": "台語"},//
{"name":"Corsican"},
{"name":"Croatian"},
{"name":"Czech"},
{"name":"Danish"},
{"name":"Dutch"},
{"name":"English"},
{"name":"Esperanto"},
{"name":"Estonian"},
{"name":"Filipino", "1":'tl', "local": "Wikang Filipino"},
{"name":"Finnish"},
{"name":"French"},
{"name":"Frisian", "1":"fy", "local": "Noordfreesk"},//
{"name":"Galician"},
{"name":"Georgian"},
{"name":"German"},
{"name":"Greek"},
{"name":"Gujarati"},
{"name":"Haitian"},
{"name":"Hausa"},
{"name":"Hawaiian", "1":"haw", "local":"ʻŌlelo Hawaiʻi"},//
{"name":"Hebrew"},
{"name":"Hindi"},
{"name":"Hmong", "1":"hmn", "local":"lol Hmongb"},//
{"name":"Hungarian"},
{"name":"Icelandic", "1":"is", "local":"Íslenska"},//
{"name":"Igbo"},
{"name":"Indonesian"},
{"name":"Irish"},
{"name":"Italian"},
{"name":"Japanese"},
{"name":"Javanese"},
{"name":"Kannada"},
{"name":"Kazakh"},
{"name":"Khmer"},
{"name":"Korean"},
{"name":"Kurdish"},
{"name":"Kyrgyz", "1":"ky", "local":"قىرعىز"},//
{"name":"Lao"},
{"name":"Latin", "1":"la", "local":"Lingua Latina"},//
{"name":"Latvian"},
{"name":"Lithuanian"},
{"name":"Luxembourgish", "1":"lb", "local":"Lëtzebuergesch"},//
{"name":"Macedonian"},
{"name":"Malagasy"},
{"name":"Malay"},
{"name":"Malayalam"},
{"name":"Maltese"},
{"name":"Māori"},
{"name":"Marathi"},
{"name":"Mongolian"},
{"name":"Myanmar", "1":"my", "local":"Burmese"},//
{"name":"Nepali"},
{"name":"Norwegian"},
{"name":"Nyanja", "1":"ny", "local": "Chicheŵa"},//
{"name":"Pashto"},
{"name":"Persian"},
{"name":"Polish"},
{"name":"Portuguese"},
{"name":"Punjabi", "1":"pa", "local":"पंजाबी"},//
{"name":"Romanian"},
{"name":"Russian"},
{"name":"Samoan", "1":"sm", "local":"Gagana Sāmoa"},//
{"name":"Gaelic"},
{"name":"Serbian"},
{"name":"Sotho", "1":"st", "local":"Sesotho"},//
{"name":"Shona"},
{"name":"Sindhi", "1":"sd", "local":"سنڌي"},//
{"name":"Sinhala"},
{"name":"Slovak"},
{"name":"Slovene"},
{"name":"Somali"},
{"name":"Spanish"},
{"name":"Sundanese"},
{"name":"Swahili"},
{"name":"Swedish"},
{"name":"Tajik"},
{"name":"Tamil"},
{"name":"Telugu"},
{"name":"Thai", "1":"th", "local":"ภาษาไทย"},//
{"name":"Turkish"},
{"name":"Ukrainian"},
{"name":"Urdu"},
{"name":"Uzbek"},
{"name":"Vietnamese"},
{"name":"Welsh"},
{"name":"Xhosa"},
{"name":"Yiddish"},
{"name":"Yoruba"},
{"name":"Zulu"}
]

var ValidLanguageList = {
    all: getValidLanguagueList,
    byCode: getValidLanguageByCode
}

function getValidLanguagueList() {
    for (var validLang of validLangs) {
        langs.map(function(lang) {
            if (lang['name'] == validLang['name']) {
                validLang['1'] = lang['1']
                validLang['local'] = lang['local']
            }
        })
    }
    return validLangs;
}

function getValidLanguageByCode(code) {
    for (var validLang of validLangs) {
        if (validLang['1'] == code) {
            return validLang['local']
        }
    }
}

module.exports = ValidLanguageList;