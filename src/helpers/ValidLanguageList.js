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
{"name":"Cebuano", "1":"ceb"},//
{"name":"Chinese (Simplified)", "1":"zh-CN"},//
{"name":"Chinese (Traditional)", "1":"zh-TW"},//
{"name":"Corsican"},
{"name":"Croatian"},
{"name":"Czech"},
{"name":"Danish"},
{"name":"Dutch"},
{"name":"English"},
{"name":"Esperanto"},
{"name":"Estonian"},
{"name":"Filipino"},
{"name":"Finnish"},
{"name":"French"},
{"name":"Frisian", "1":"fy"},//
{"name":"Galician"},
{"name":"Georgian"},
{"name":"German"},
{"name":"Greek"},
{"name":"Gujarati"},
{"name":"Haitian"},
{"name":"Hausa"},
{"name":"Hawaiian", "1":"haw"},//
{"name":"Hebrew"},
{"name":"Hindi"},
{"name":"Hmong", "1":"hmn"},//
{"name":"Hungarian"},
{"name":"Icelandic", "1":"is"},//
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
{"name":"Kyrgyz", "1":"ky"},//
{"name":"Lao"},
{"name":"Latin", "1":"la"},//
{"name":"Latvian"},
{"name":"Lithuanian"},
{"name":"Luxembourgish", "1":"lb"},//
{"name":"Macedonian"},
{"name":"Malagasy"},
{"name":"Malay"},
{"name":"Malayalam"},
{"name":"Maltese"},
{"name":"Māori"},
{"name":"Marathi"},
{"name":"Mongolian"},
{"name":"Myanmar", "1":"my"},//
{"name":"Nepali"},
{"name":"Norwegian"},
{"name":"Nyanja", "1":"ny"},//
{"name":"Pashto"},
{"name":"Persian"},
{"name":"Polish"},
{"name":"Portuguese"},
{"name":"Punjabi", "1":"pa"},//
{"name":"Romanian"},
{"name":"Russian"},
{"name":"Samoan", "1":"sm"},//
{"name":"Gaelic"},
{"name":"Serbian"},
{"name":"Sesotho", "1":"st"},//
{"name":"Shona"},
{"name":"Sindhi", "1":"sd"},//
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
{"name":"Thai", "1":"th"},//
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
    all: getValidLanguagueList
}

function getValidLanguagueList() {
    for (var validLang of validLangs) {
        langs.map(function(lang) {
            if (validLang['name'] == 'Filipino') {
                validLang['1'] = 'tl'
            } else if (validLang['name'] != 'Filipino' && lang['name'] == validLang['name']) {
                validLang['1'] = lang['1']    
            }
        })
    }
    return validLangs;
}

module.exports = ValidLanguageList;