import React from 'react';

import langs from 'langs/data';

var validLangs = [
    {"name":"Bulgarian"}, {"name":"Catalan"}, 
    {"name":"Chinese"}, {"name":"Croatian"}, 
    {"name":"Czech"}, {"name":"Danish"}, 
    {"name":"Dutch"}, {"name":"English"}, 
    {"name":"Spanish"}, // Spanish ?
    {"name":"Finnish"}, 
    {"name":"French"}, {"name":"German"}, 
    {"name":"Hungarian"}, {"name":"Indonesian"}, 
    {"name":"Italian"}, {"name":"Japanese"},
    {"name":"Lithuanian"}, {"name":"Norwegian"}, 
    {"name":"Polish"}, {"name":"Portuguese"}, 
    {"name":"Romanian"}, {"name":"Russian"}, 
    {"name":"Slovak"}, {"name":"Spanish"}, 
    {"name":"Swedish"}, {"name":"Turkish"}, 
    {"name":"Ukrainian"}
]

var ValidLanguageList = {
    all: getValidLanguagueList
}

function getValidLanguagueList() {
    for (var validLang of validLangs) {
        langs.map(function(lang) {
            if (lang['name'] == validLang['name']) {
                validLang['1'] = lang['1']    
            }
        })
    }
    return validLangs;
}

module.exports = ValidLanguageList;