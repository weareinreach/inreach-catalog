import _forEach from 'lodash/forEach';
import _reduce from 'lodash/reduce';
import _uniq from 'lodash/uniq';

import {localeTagMap} from '../utils/locale';

// Master list of all tags in all locales
const resourceTypes = [
  /* AC Community support Category */
  {
    category: 'Community Support',
    type: 'communitySupport',
    acTag: 'Community Support',
  },
  {
    category: 'Community Support',
    type: 'communitySupport',
    acTag: 'Cultural centers',
  },
  {
    category: 'Community Support',
    type: 'communitySupport',
    acTag: 'Cultural centres',
  },
  {
    category: 'Community Support',
    type: 'communitySupport',
    acTag: 'LGBTQ centers',
  },
  {
    category: 'Community Support',
    type: 'communitySupport',
    acTag: 'LGBTQ centres',
  },

  /* AC Computers and Internet Category */
  {
    category: 'Computers and Internet',
    type: 'computers',
    acTag: 'Computers and Internet',
  },

  /* AC Education and Employment Category */
  {
    category: 'Education and Employment',
    type: 'educationEmployment',
    acTag: 'Education and Employment',
  },
  {
    category: 'Education and Employment',
    type: 'educationEmployment',
    acTag: 'Career counseling',
  },
  {
    category: 'Education and Employment',
    type: 'educationEmployment',
    acTag: 'Educational support for LGBT youth',
  },
  {
    category: 'Education and Employment',
    type: 'educationEmployment',
    acTag: 'English classes',
  },
  {
    category: 'Education and Employment',
    type: 'educationEmployment',
    acTag: 'Language classes',
  },
  {
    category: 'Education and Employment',
    type: 'educationEmployment',
    acTag: 'Libraries',
  },
  {
    category: 'Education and Employment',
    type: 'educationEmployment',
    acTag: 'Scholarships',
  },

  /* AC Food Category */
  {
    category: 'Food',
    type: 'food',
    acTag: 'Food',
  },

  /* AC Housing Category */
  {category: 'Housing', type: 'housing', acTag: 'Housing'},
  {
    category: 'Housing',
    type: 'housing',
    acTag: 'Drop-in centers for LGBTQ youth',
  },
  {
    category: 'Housing',
    type: 'housing',
    acTag: 'Drop-in centres for LGBTQ youth',
  },
  {category: 'Housing', type: 'housing', acTag: 'Emergency housing'},
  {
    category: 'Housing',
    type: 'housing',
    acTag: 'Housing information and referrals',
  },
  {category: 'Housing', type: 'housing', acTag: 'Short-term housing'},

  /* AC Hygiene and Clothing Category */
  {
    category: 'Hygiene and Clothing',
    type: 'hygiene',
    acTag: 'Hygiene and Clothing',
  },
  {category: 'Hygiene and Clothing', type: 'hygiene', acTag: 'Clothes'},
  {
    category: 'Hygiene and Clothing',
    type: 'hygiene',
    acTag: 'Gender-affirming items',
  },
  {
    category: 'Hygiene and Clothing',
    type: 'hygiene',
    acTag: 'Gender-neutral bathrooms',
  },
  {
    category: 'Hygiene and Clothing',
    type: 'hygiene',
    acTag: 'Gender-neutral restrooms',
  },
  {
    category: 'Hygiene and Clothing',
    type: 'hygiene',
    acTag: 'Gender-neutral washrooms',
  },
  {category: 'Hygiene and Clothing', type: 'hygiene', acTag: 'Hygiene'},

  /* AC Legal Category */
  {category: 'Legal', type: 'legal', acTag: 'Legal'},
  {category: 'Legal', type: 'legal', acTag: 'Asylum application in Mexico'},
  {
    category: 'Legal',
    type: 'legal',
    acTag: 'Asylum application in the US from Mexico',
  },
  {category: 'Legal', type: 'legal', acTag: 'Asylum application'},
  {category: 'Legal', type: 'legal', acTag: 'Crime and discrimination'},
  {
    category: 'Legal',
    type: 'legal',
    acTag: 'Deferred Action for Childhood Arrivals (DACA)',
  },
  {category: 'Legal', type: 'legal', acTag: 'Deportation or removal'},
  {category: 'Legal', type: 'legal', acTag: 'Immigration detention'},
  {category: 'Legal', type: 'legal', acTag: 'Legal hotlines'},
  {category: 'Legal', type: 'legal', acTag: 'Name and gender change'},
  {category: 'Legal', type: 'legal', acTag: 'Refugee claim'},
  {
    category: 'Legal',
    type: 'legal',
    acTag: 'Special Immigrant Juvenile Status (SIJS)',
  },

  /* AC Mail services Category */
  {category: 'Mail', type: 'mail', acTag: 'Mail'},

  /* AC Medical Category */
  {category: 'Medical', type: 'medical', acTag: 'Medical'},
  {category: 'Medical', type: 'medical', acTag: 'Dental care'},
  {category: 'Medical', type: 'medical', acTag: 'HIV and sexual health'},
  {category: 'Medical', type: 'medical', acTag: 'Medical clinics'},
  {
    category: 'Medical',
    type: 'medical',
    acTag: 'Physical evaluations for asylum claim',
  },
  {
    category: 'Medical',
    type: 'medical',
    acTag: 'Physical evaluations for refugee claim',
  },
  {category: 'Medical', type: 'medical', acTag: 'Trans health'},
  {category: 'Medical', type: 'medical', acTag: "Women's health"},

  /* AC Mental Health Category */
  {category: 'Mental Health', type: 'mentalHealth', acTag: 'Mental Health'},
  {category: 'Mental Health', type: 'mentalHealth', acTag: 'Hotlines'},
  {
    category: 'Mental Health',
    type: 'mentalHealth',
    acTag: 'Private therapy and counseling',
  },
  {
    category: 'Mental Health',
    type: 'mentalHealth',
    acTag: 'Psychological evaluations for asylum claim',
  },
  {
    category: 'Mental Health',
    type: 'mentalHealth',
    acTag: 'Psychological evaluations for refugee claim',
  },
  {category: 'Mental Health', type: 'mentalHealth', acTag: 'Substance use'},
  {category: 'Mental Health', type: 'mentalHealth', acTag: 'Support groups'},
  {
    category: 'Mental Health',
    type: 'mentalHealth',
    acTag: 'Trans support groups',
  },

  /* AC Sports and Entertainment Category */
  {
    category: 'Sports and Entertainment',
    type: 'sportsEntertainment',
    acTag: 'Sports and Entertainment',
  },

  /* AC Translation and interpretation Category */
  {
    category: 'Translation and Interpretation',
    type: 'speechBubble',
    acTag: 'Translation and Interpretation',
  },

  /* AC Transportation Category */
  {category: 'Transportation', type: 'transportation', acTag: 'Transportation'},
  {
    category: 'Transportation',
    type: 'transportation',
    acTag: 'Transit passes and discounts',
  },
  {
    category: 'Transportation',
    type: 'transportation',
    acTag: 'Transportation assistance',
  },
];

//use this to exclude certain resource types from the list for certain locales
const localeExclusions = {
  en_US: [],
  en_CA: [
    'Deferred Action for Childhood Arrivals (DACA)',
    'Special Immigrant Juvenile Status (SIJS)',
  ],
};
const filterResourceType = function (item, locale) {
  if (typeof item.title !== 'undefined') {
    return (
      typeof localeExclusions[locale] === 'undefined' ||
      localeExclusions[locale].indexOf(item.title) === -1
    );
  } else {
    return (
      typeof localeExclusions[locale] === 'undefined' ||
      localeExclusions[locale].indexOf(item.category) === -1
    );
  }
};

const defaultLocale = 'en_US';

const getResourceTypes = (locale = defaultLocale) => {
  return resourceTypes.filter((item) => filterResourceType(item, locale));
};

const getResourceTypesByGroup = (locale = defaultLocale) => {
  let categorized = {},
    index = [],
    final = [];
  resourceTypes
    .filter((item) => filterResourceType(item, locale))
    .forEach((item) => {
      if (typeof categorized[item.category] === 'undefined') {
        categorized[item.category] = {
          category: item.category,
          type: item.type,
        };
        index.push(item.category);
      }
      if (typeof item.title !== 'undefined') {
        if (typeof categorized[item.category].children === 'undefined') {
          categorized[item.category].children = {};
        }
        if (
          typeof categorized[item.category].children[item.title] === 'undefined'
        ) {
          categorized[item.category].children[item.title] = [];
        }
        categorized[item.category].children[item.title].push(item.acTag);
      } else {
        categorized[item.category].value = item.acTag;
      }
    });
  index.forEach((category) => {
    let collection = categorized[category];
    if (typeof collection.children !== 'undefined') {
      let childArray = [];
      for (let child in collection.children) {
        childArray.push({
          title: child,
          value: collection.children[child].join(','),
        });
      }
      collection.children = childArray;
    }
    final.push(collection);
  });
  return final;
};

const resourceTypesByGroup = getResourceTypesByGroup();

const getResourceIndex = (locale = defaultLocale) => {
  let index = {};
  resourceTypes
    .filter((item) => filterResourceType(item, locale))
    .forEach((item) => {
      index[item.acTag] = item;
    });
  return index;
};

const resourceIndex = getResourceIndex();

const getResourceCategoryIndex = (locale = defaultLocale) => {
  let index = {};
  resourceTypes
    .filter((item) => filterResourceType(item, locale))
    .forEach((item) => {
      if (item.title) {
        index[item.title] = item;
      } else if (
        (typeof item.iconOnly === 'undefined' || !item.iconOnly) &&
        typeof index[item.category] === 'undefined'
      ) {
        index[item.category] = item;
      }
    });

  return index;
};

const resourceCategoryIndex = getResourceCategoryIndex();

const getBadge = (tags) => {
  let badge = 'misc';
  tags.forEach((tag) => {
    if (typeof resourceIndex[tag] !== 'undefined' && badge === 'misc') {
      badge = resourceIndex[tag].type;
    }
  });
  return badge;
};

export const getTags = (item, locale) => {
  const tagList = item?.tags?.[localeTagMap?.[locale]];

  if (!tagList) {
    return [];
  }

  const tags = [];

  _forEach(tagList, (subCategory, category) => {
    if (typeof subCategory === 'object') {
      _forEach(subCategory, (value, tagName) => {
        tags.push(tagName);
      });
    } else {
      tags.push(category);
    }
  });

  return tags;
};

export const getOrgTags = (org, locale) => {
  const {services = []} = org || {};
  const orgTags = getTags(org, locale);

  return _uniq(
    _reduce(
      services,
      (result, service = {}) => {
        result = result.concat(getTags(service, locale));

        return result;
      },
      orgTags
    )
  );
};

export default {
  types: resourceTypes,
  getResourceTypes,
  resourceTypesByGroup,
  getResourceTypesByGroup,
  resourceIndex,
  getResourceIndex,
  resourceCategoryIndex,
  getResourceCategoryIndex,
  getBadge,
};
