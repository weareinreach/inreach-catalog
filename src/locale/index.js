import React from 'react';
import enUS from './en_US';
import enCA from './en_CA';

const fetchLocale = function(locale) { 
  switch(locale) {
    case 'en_CA':
      return enCA;
      break;
    case 'en_US':
    default: 
      return enUS;
  }
}

export {fetchLocale}