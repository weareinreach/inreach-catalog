const resourceTypes = [
  /* AC Medical Category */
  {category: 'Medical', type: 'medical', odTag: 'Dental',                               title: 'Dental care'},
  {category: 'Medical', type: 'medical', odTag: 'General health',                       title: 'Medical clinics'},
  {category: 'Medical', type: 'medical', odTag: 'Vision',                               title: 'Medical clinics'},
  {category: 'Medical', type: 'transportation', odTag: 'Transportation for healthcare', title: 'Medical clinics'},
  {category: 'Medical', type: 'medical', odTag: 'Sexual health',                        title: 'Sexual health'},
  {category: 'Medical', type: 'transportation', odTag: 'Transportation for healthcare', title: 'Sexual health'},
  {category: 'Medical', type: 'medical', odTag: 'Trans health',                         title: 'Trans health'},
  {category: 'Medical', type: 'medical', odTag: 'Hormone therapy',                      title: 'Trans health'},
  {category: 'Medical', type: 'medical', odTag: 'Gender reassignment surgery',          title: 'Trans health'},
  {category: 'Medical', type: 'transportation', odTag: 'Transportation for healthcare', title: 'Trans health'},
  {category: 'Medical', type: 'medical', odTag: 'Pregnancy',                            title: 'Women\'s health'},
  {category: 'Medical', type: 'medical', odTag: 'Birth control',                        title: 'Women\'s health'},
  {category: 'Medical', type: 'transportation', odTag: 'Transportation for healthcare', title: 'Women\'s health'},
  {category: 'Medical', type: 'medical', odTag: 'Primary care',                         iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Alternative medicine',                 iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Hearing',                              iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Medical supplies',                     iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Medical tests',                        iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Pain management',                      iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Pediatric medicine',                   iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Physical therapy',                     iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Prescriptions',                        iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Vaccinations',                         iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Health education',                     iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Diabetes',                             iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Eye exams',                            iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Glasses & contacts',                   iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Gynecology',                           iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'OB & prenatal care',                   iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Birth preparation',                    iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Pregnancy tests',                      iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Abortion',                             iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Sex worker health services',           iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Birth control',                        iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Sex education',                        iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'STD tests',                            iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'HIV health services',                  iconOnly: true},

  /* AC Legal Category */
  /** Using Category instead of Tags for most of the main checkbox for inclusiveness **/
  {category: 'Legal', type: 'legal', odTag: 'Legal'},
  {category: 'Legal', type: 'legal', odTag: 'Asylum application',       title: 'Asylum application'},
  {category: 'Legal', type: 'legal', odTag: 'Personal harm',            title: 'Crime and discrimination'},
  {category: 'Legal', type: 'legal', odTag: 'Crime victim support',     title: 'Crime and discrimination'},
  {category: 'Legal', type: 'legal', odTag: 'DACA',                     title: 'Deferred Action for Childhood Arrivals (DACA)'},
  {category: 'Legal', type: 'legal', odTag: 'Deportation',              title: 'Deportation or removal'},
  {category: 'Legal', type: 'legal', odTag: 'Immigration detention',    title: 'Immigration detention'},
  {category: 'Legal', type: 'legal', odTag: 'Name & gender change',     title: 'Name and gender change'},
  
  {category: 'Legal', type: 'legal', odTag: 'ID & driver\'s license',   iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Legal assistance',         iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Legal services',           iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Tax law',                  iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Personal injury ',         iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Visas & other statuses',   iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Family law',               iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Housing law',              iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Criminal law',             iconOnly: true},

  /* AC Housing Category */
  /** Using Categories instead of Tags for most of these for inclusiveness **/
  {category: 'Housing', type: 'housing', odTag: 'Supportive housing'},
  {category: 'Housing', type: 'housing', odTag: 'Temporary housing'},
  {category: 'Housing', type: 'housing', odTag: 'Affordable housing'},
  {category: 'Housing', type: 'housing', odTag: 'Tenant resources'},
  {category: 'Housing', type: 'housing', odTag: 'Homeowner resources'},
  {category: 'Housing', type: 'housing', odTag: 'Homeless support services'},
  {category: 'Housing', type: 'housing', odTag: 'Homeless centers'},
  {category: 'Housing', type: 'housing', odTag: 'Shelters'},
  {category: 'Housing', type: 'housing', odTag: 'Shelter hotlines'},
  {category: 'Housing', type: 'housing', odTag: 'Permanent supportive housing',     iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Transitional housing',             iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Temporary shelters',               iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Halfway houses',                   iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Transitional housing for victims', iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Housing search',                   iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Public housing',                   iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Section 8',                        iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Housing vouchers',                 iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Affordable home ownership',        iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Deposit & rent assistance',        iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Renters insurance',                iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Tenants rights',                   iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Homeowners insurance',             iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Foreclosure',                      iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Payment assistance',               iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'First-time homebuyers',            iconOnly: true},

  /* AC Food Category */
  /** Using Categories instead of Tags for most of these for inclusiveness **/
  {category: 'Food', type: 'food', odTag: 'Food'},
  {category: 'Food', type: 'food', odTag: 'Food stamps',            iconOnly: true},
  {category: 'Food', type: 'food', odTag: 'Food pantries',          iconOnly: true},
  {category: 'Food', type: 'food', odTag: 'Meals',                  iconOnly: true},
  {category: 'Food', type: 'food', odTag: 'Summer & holiday meals', iconOnly: true},
  {category: 'Food', type: 'food', odTag: 'Nutrition education',    iconOnly: true},

  /* AC Hygiene and Clothing Category */
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Laundry'},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Showers'},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Storage'},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Hygiene'},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Clothes'},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Heating & cooling'},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Household supplies'},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Cash for clothing', iconOnly: true},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'General clothes',   iconOnly: true},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'School clothes',    iconOnly: true},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Work clothes',      iconOnly: true},

  /* AC Computers and Internet Category */
  {category: 'Computers and Internet', type: 'computers', odTag: 'Computer classes'},
  {category: 'Computers and Internet', type: 'computers', odTag: 'Computer labs'},
  {category: 'Computers and Internet', type: 'computers', odTag: 'Internet access'},

  /* AC Education and Employment Category */
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Preschool & K-12'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Financial aid'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Money'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Language resources',         title: 'English classes'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Employment',                 title: 'Career counseling'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Internships',                title: 'Career counseling'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Life skills training',       title: 'Career counseling'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Financial literacy',         title: 'Career counseling'},
  {category: 'Education and Employment', type: 'hygiene',             odTag: 'Work clothes',               title: 'Career counseling'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Books & supplies',           title: 'Libraries'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Scholarships',               title: 'Scholarships'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Student loans',              title: 'Scholarships'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Grants',                     title: 'Scholarships'},
  {category: 'Education and Employment', type: 'hygiene',             odTag: 'School clothes',             title: 'Scholarships'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'ESL classes',                   iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Translation & interpretation',  iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'School supplies',               iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Books',                         iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Job search & placement',        iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Unemployment benefits',         iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Interview training',            iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Resume help',                   iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Job training',                  iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Career counseling',             iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Starting a business',           iconOnly: true},

  /* AC Community support Category */
  {category: 'Community Support', type: 'communitySupport', odTag: 'Community centers'},
  {category: 'Community Support', type: 'communitySupport', odTag: 'Community centers', title: 'Community centers'},
  {category: 'Community Support', type: 'communitySupport', odTag: 'LGBTQ centers',     title: 'LGBTQ centers'},
  {category: 'Community Support', type: 'communitySupport', odTag: 'Cultural centers',  title: 'Cultural centers'},

  /* AC Mental Health Category */
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Mental health'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Hotlines'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Transgender support groups'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Addiction',                 title: 'Addiction'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Emergency services',        title: 'Hotlines'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Hotlines',                  title: 'Hotlines'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Crisis hotlines',           title: 'Hotlines'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Domestic violence hotline', title: 'Hotlines'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Suicide hotlines',          title: 'Hotlines'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Child abuse hotlines',      title: 'Hotlines'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Elder abuse hotlines',      title: 'Hotlines'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Grief',                     title: 'Private counseling'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Counseling & therapy',      title: 'Private counseling'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Anger management',          title: 'Private counseling'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Depression',                title: 'Private counseling'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Psychiatry',                title: 'Psychiatry'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Grief',                     title: 'Psychiatry'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Counseling & therapy',      title: 'Psychiatry'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Anger management',          title: 'Psychiatry'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Depression',                title: 'Psychiatry'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Grief',                     title: 'Support groups'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Counseling & therapy',      title: 'Support groups'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Support groups',            title: 'Support groups'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Peer support',              title: 'Support groups'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Anger management',          title: 'Support groups'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Depression',                title: 'Support groups'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Transgender support groups',title: 'Trans support groups'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Alcohol',                   iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Detox',                     iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Drugs',                     iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Needle exchanges',          iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Other addictions',          iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Residential treatment',     iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Sober living',              iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Mental health emergency',   iconOnly: true},

  /* AC Mail services Category */
  {category: 'Mail Services', type: 'mail', odTag: 'Mail'},

  /* AC Sports and Entertainment Category */
  {category: 'Sports and Entertainment', type: 'sportsEntertainment', odTag: 'Recreational activities'},
  {category: 'Sports and Entertainment', type: 'sportsEntertainment', odTag: 'Toys'},
  {category: 'Sports and Entertainment', type: 'sportsEntertainment', odTag: 'Art',               iconOnly: true},
  {category: 'Sports and Entertainment', type: 'sportsEntertainment', odTag: 'Dance',             iconOnly: true},
  {category: 'Sports and Entertainment', type: 'sportsEntertainment', odTag: 'Recreation',        iconOnly: true},
  {category: 'Sports and Entertainment', type: 'sportsEntertainment', odTag: 'Sports & fitness',  iconOnly: true},

  /* AC Transportation Category */
  {category: 'Transportation', type: 'transportation', odTag: 'Transportation'},
  {category: 'Transportation', type: 'transportation', odTag: 'Transit passes & discounts',     title: 'Transit passes and discounts'},
  {category: 'Transportation', type: 'transportation', odTag: 'Transportation for healthcare',  title: 'Transit passes and discounts'},
  {category: 'Transportation', type: 'transportation', odTag: 'Transportation assistance',      title: 'Transportation assistance'},
  {category: 'Transportation', type: 'transportation', odTag: 'Transportation for healthcare',  title: 'Transportation assistance'},
];
//Art, dance, recreation, sports & fitness
const groupResourceTypes = () => {
  let categorized = {}, index = [], final = [];
  resourceTypes.forEach((item) => {
    if(typeof categorized[item.category] === "undefined") {
      categorized[item.category] = {
        category: item.category,
        type: item.type
      }
      index.push(item.category);
    }
    if(typeof item.title !== "undefined") {
      if(typeof categorized[item.category].children === "undefined"){
        categorized[item.category].children = {};
      }
      if(typeof categorized[item.category].children[item.title] === "undefined") {
        categorized[item.category].children[item.title] = [];
      }
      categorized[item.category].children[item.title].push(item.odTag);
    } else {
      categorized[item.category].value = item.odTag;
    }
  });
  index.forEach((category) => {
    let collection = categorized[category];
    if(typeof collection.children !== 'undefined'){
      let childArray = [];
      for (let child in collection.children) {
        childArray.push({
          title: child,
          value: collection.children[child].join(',')
        })
      }
      collection.children = childArray;
    }
    final.push(collection);
  });
  return final;
}

const resourceTypesByGroup = groupResourceTypes();

const getTagIndex = () => {
  let index = {};
  resourceTypes.forEach((item) => {
    index[item.odTag] = item
  });
  return index;
}

const resourceIndex = getTagIndex();

const getBadge = (tags) => {
  let badge = 'misc';
  tags.forEach((tag) => {
    if(typeof resourceIndex[tag] !== 'undefined') {
      badge = resourceIndex[tag].type
    }
  });
  return badge;
};

/*const resourceTypes = [
  {category: 'Medical', type: 'medical', children: [
    {title: 'Medical clinics', value: 'Health'}, //confirm
    {title: 'Women\'s health', value: 'Pregnancy'}, //refine
    {title: 'Sexual health', value: 'Sexual health'},
    {title: 'Trans health', value: 'Trans health'},
    {title: 'Dental care', value: 'Dental'}
  ]},
  {category: 'Legal', type: 'legal', children: [
    {title: 'Legal aid', value: 'Legal assistance'}, //refine
    {title: 'Documentation', value: 'Documentation'} //MISSING
  ]},
  {category: 'Housing', type: 'housing', value: 'Housing'}, //refine
  {category: 'Food', type: 'food', value: 'Food'},
  {category: 'Hygiene and Clothing', type: 'hygiene', value: 'Homeless support'}, //refine
  {category: 'Computers and Internet', type: 'computers', value: 'Computer labs'},
  {category: 'Education and Employment', type: 'educationEmployment', children: [
    {title: 'English classes', value: 'Language resources'}, //refine
    {title: 'Career counseling', value: 'Job training & preparation'}, //refine
    {title: 'Libraries', value: 'Libraries'},
    {title: 'Scholarships', value: 'Scholarships'},
  ]},
  {category: 'Community support', type: 'communitySupport', children: [
    {title: 'Community centers', value: 'Community centers'},
    {title: 'LGBTQ centers', value: 'LGBTQ centers'},
    {title: 'Cultural centers', value: 'Cultural centers'},
  ]},
  {category: 'Mental health', type: 'mentalHealth', children: [
    {title: 'Support Groups', value: 'Support groups'}, //refine
    {title: 'Private Counseling', value: 'Counseling & therapy'},
    {title: 'Psychiatry', value: 'Psychiatry'},
  ]},
  {category: 'Mail services', type: 'mail', value: 'Mail'},
  {category: 'Sports and Entertainment', type: 'sportsEntertainment', value: 'Recreational activities'},
];*/

export default {
  types: resourceTypes,
  resourceTypesByGroup,
  resourceIndex,
  getBadge
};