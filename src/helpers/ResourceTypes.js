//Master list of all AC resources types mapped to One Degree tags - should cover all locales
const resourceTypes = [
  /* AC Medical Category */
  {category: 'Medical', type: 'medical', odTag: 'General health'},
  {category: 'Medical', type: 'medical', odTag: 'Dental',                               title: 'Dental care'},
  {category: 'Medical', type: 'medical', odTag: 'General health',                       title: 'Medical clinics'},
  {category: 'Medical', type: 'medical', odTag: 'Vision',                               title: 'Medical clinics'},
  {category: 'Medical', type: 'medical', odTag: 'Medical emergency',                    title: 'Medical clinics'},
  {category: 'Medical', type: 'transportation', odTag: 'Transportation for healthcare', title: 'Medical clinics'},
  {category: 'Medical', type: 'medical', odTag: 'Sexual health',                        title: 'HIV and sexual health'},
  {category: 'Medical', type: 'transportation', odTag: 'Transportation for healthcare', title: 'HIV and sexual health'},
  {category: 'Medical', type: 'medical', odTag: 'Physical evaluations for asylum claim', title: 'Physical evaluations for asylum claim'},
  {category: 'Medical', type: 'medical', odTag: 'Transgender health',                   title: 'Trans health'},
  {category: 'Medical', type: 'transportation', odTag: 'Transportation for healthcare', title: 'Trans health'},
  {category: 'Medical', type: 'medical', odTag: 'Gynecology',                           title: 'Women\'s health'},
  {category: 'Medical', type: 'medical', odTag: 'Pregnancy',                            title: 'Women\'s health'},
  {category: 'Medical', type: 'medical', odTag: 'Birth control',                        title: 'Women\'s health'},
  {category: 'Medical', type: 'transportation', odTag: 'Transportation for healthcare', title: 'Women\'s health'},
  {category: 'Medical', type: 'medical', odTag: 'Primary care',                         title: 'Medical clinics',           iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Alternative medicine',                 title: 'Medical clinics',           iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Hearing',                              title: 'Medical clinics',           iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Medical supplies',                     title: 'Medical clinics',           iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Medical tests',                        title: 'Medical clinics',           iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Pain management',                      title: 'Medical clinics',           iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Pediatric medicine',                   title: 'Medical clinics',           iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Physical therapy',                     title: 'Medical clinics',           iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Prescriptions',                        title: 'Medical clinics',           iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Vaccinations',                         title: 'Medical clinics',           iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Health education',                     title: 'Medical clinics',           iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Diabetes',                             title: 'Medical clinics',           iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Eye exams',                            title: 'Medical clinics',           iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Glasses & contacts',                   title: 'Medical clinics',           iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Family planning',                      title: 'Women\'s health',           iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Doulas & midwives',                    title: 'Women\'s health',           iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'OB & prenatal care',                   title: 'Women\'s health',           iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Birth preparation',                    title: 'Women\'s health',           iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Pregnancy tests',                      title: 'Women\'s health',           iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Abortion',                             title: 'Women\'s health',           iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Sex worker health services',           title: 'HIV and sexual health',     iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Birth control',                        title: 'Women\'s health',           iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Sex education',                        title: 'HIV and sexual health',     iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'STD/STI tests',                        title: 'HIV and sexual health',     iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'HIV health services',                  title: 'HIV and sexual health',     iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Hormone therapy',                      title: 'Trans health', iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Gender reassignment surgery',          title: 'Trans health', iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Gender affirming items',               title: 'Trans health', iconOnly: true},
  {category: 'Medical', type: 'medical', odTag: 'Dental health',                        title: 'Dental care', iconOnly: true},
  

  /* AC Legal Category */
  /** Using Category instead of Tags for most of the main checkbox for inclusiveness **/
  {category: 'Legal', type: 'legal', odTag: 'Legal'},
  {category: 'Legal', type: 'legal', odTag: 'Asylum application',                       title: 'Asylum application'},
  {category: 'Legal', type: 'legal', odTag: 'Personal harm',                            title: 'Crime and discrimination'},
  {category: 'Legal', type: 'legal', odTag: 'DACA application/renewal',                 title: 'Deferred Action for Childhood Arrivals (DACA)'},
  {category: 'Legal', type: 'legal', odTag: 'Deportation',                              title: 'Deportation or removal'},
  {category: 'Legal', type: 'legal', odTag: 'Immigration detention',                    title: 'Immigration detention'},
  {category: 'Legal', type: 'legal', odTag: 'Legal advice',                             title: 'Legal hotlines'},
  {category: 'Legal', type: 'legal', odTag: 'Name & gender change',                     title: 'Name and gender change'},
  {category: 'Legal', type: 'legal', odTag: 'Special Immigrant Juvenile Status (SIJS)', title: 'Special Immigrant Juvenile Status (SIJS)'},
  
  //{category: 'Legal', type: 'legal', odTag: 'Applying ID & driver\'s license',                             iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Legal advice',                                                iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Tax law',                                                     iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Crime victim support',     title: 'Crime and discrimination', iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Personal injury',          title: 'Crime and discrimination', iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Police complaints',                                           iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Family law',                                                  iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Divorce',                                                     iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Custody & guardianship',                                      iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Child support',                                               iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Restraining orders',                                          iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Dependency court',                                            iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Wills & health care directives',                              iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Housing law',                                                 iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Eviction issues',                                             iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Tenants rights',                                              iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Immigration law',                                             iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Visas & other statuses',                                      iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Citizenship & naturalization',                                iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Criminal Law & re-entry',                                     iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Warrants & active cases',                                     iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Re-entry legal support',                                      iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Loss of ID & tickets',                                        iconOnly: true},
  {category: 'Legal', type: 'legal', odTag: 'Criminal record help',                                        iconOnly: true},


  /* AC Housing Category */
  /** Using Categories instead of Tags for most of these for inclusiveness **/
  {category: 'Housing', type: 'housing', odTag: 'Supportive housing'},
  {category: 'Housing', type: 'housing', odTag: 'Affordable housing'},
  {category: 'Housing', type: 'housing', odTag: 'Tenant resources'},
  {category: 'Housing', type: 'housing', odTag: 'Homeowner resources'},
  {category: 'Housing', type: 'housing', odTag: 'Drop-in centers',                  title: 'Drop-in centers for LGBTQ youth'},
  {category: 'Housing', type: 'housing', odTag: 'Overnight shelters',               title: 'Emergency housing'},
  {category: 'Housing', type: 'housing', odTag: 'Shelter hotlines',                 title: 'Emergency housing'},
  {category: 'Housing', type: 'housing', odTag: 'Housing search',                   title: 'Housing information and referrals'},
  {category: 'Housing', type: 'housing', odTag: 'Temporary housing',                title: 'Short-term housing'},
  {category: 'Housing', type: 'housing', odTag: 'Short-term shelters',              title: 'Short-term housing', iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Transitional housing',             title: 'Short-term housing', iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Transitional housing for victims', title: 'Short-term housing', iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Homeless support',                                              iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Permanent supportive housing',                                  iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Halfway houses',                                                iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Independent living skills',                                     iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Section 8',                                                     iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Eviction prevention',                                           iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Foreclosure',                                                   iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Deposit & rent assistance',                                     iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Renters insurance',                                             iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Moving assistance',                                             iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Affordable home ownership',                                     iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Homeowners insurance',                                          iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'Payment assistance',                                            iconOnly: true},
  {category: 'Housing', type: 'housing', odTag: 'First-time homebuyers',                                         iconOnly: true},
    

  /* AC Food Category */
  /** Using Categories instead of Tags for most of these for inclusiveness **/
  {category: 'Food', type: 'food', odTag: 'Food'},
  {category: 'Food', type: 'food', odTag: 'Prepared meals',          iconOnly: true},
  {category: 'Food', type: 'food', odTag: 'Meals',                   iconOnly: true},
  {category: 'Food', type: 'food', odTag: 'Summer & holiday meals',  iconOnly: true},
  {category: 'Food', type: 'food', odTag: 'Groceries',               iconOnly: true},
  {category: 'Food', type: 'food', odTag: 'Food stamps',             iconOnly: true},
  {category: 'Food', type: 'food', odTag: 'Food pantries',           iconOnly: true},
  {category: 'Food', type: 'food', odTag: 'Nutrition',               iconOnly: true},
  {category: 'Food', type: 'food', odTag: 'Nutrition education',     iconOnly: true},

  /* AC Hygiene and Clothing Category */
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Heating & cooling'},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Household supplies'},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Gender-neutral restrooms',title: 'Gender-neutral restrooms'},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Gender-affirming items',  title: 'Gender-affirming items'},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Clothes',                 title: 'Clothes'},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Hygiene',                 title: 'Hygiene'},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Laundry',                 title: 'Hygiene'},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Showers',                 title: 'Hygiene'},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Storage',                 title: 'Hygiene'},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Cash for clothing',       iconOnly: true},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'General clothes',         iconOnly: true},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'School clothes',          iconOnly: true},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Work clothes',            iconOnly: true},

  /* AC Computers and Internet Category */
  {category: 'Computers and Internet', type: 'computers', odTag: 'Computer classes'},
  {category: 'Computers and Internet', type: 'computers', odTag: 'Computer labs'},
  {category: 'Computers and Internet', type: 'computers', odTag: 'Internet access'},

  /* AC Education and Employment Category */
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Preschool & K-12'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Financial aid'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Money'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Employment',                 title: 'Career counseling'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Internships',                title: 'Career counseling'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Life skills training',       title: 'Career counseling'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Financial literacy',         title: 'Career counseling'},
  {category: 'Education and Employment', type: 'hygiene',             odTag: 'Work clothes',               title: 'Career counseling'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Mentors',                    title: 'Educational support for LGBTQ youth'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Language resources',         title: 'English classes'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Books & supplies',           title: 'Libraries'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Libraries',                  title: 'Libraries'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Scholarships',               title: 'Scholarships'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Applying for student loans', title: 'Scholarships'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Grants',                     title: 'Scholarships'},
  {category: 'Education and Employment', type: 'hygiene',             odTag: 'School clothes',             title: 'Scholarships'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Preschool',                  iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Special education',          iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Tutors',                     iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'After school programs',      iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'College prep',               iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Homeschooling',              iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'ESL classes',                title: 'English classes',        iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'School supplies',            title: 'Libraries',         iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Books',                      title: 'Libraries',         iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Job search & placement',     title: 'Career counseling',      iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Unemployment benefits',      iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Interview training',         title: 'Career counseling',      iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Resume help',                title: 'Career counseling',      iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Job training',               title: 'Career counseling',      iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Career counseling',          title: 'Career counseling',      iconOnly: true},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Starting a business',        title: 'Career counseling',      iconOnly: true},

  /* AC Community support Category */
  //{category: 'Community Support', type: 'communitySupport', odTag: 'Community'},
  /*{category: 'Community Support', type: 'communitySupport', odTag: 'Community centers', title: 'Community centers'}, //removed because 1D removed corresponding tag */
  {category: 'Community Support', type: 'communitySupport', odTag: 'LGBTQ centers'},
  {category: 'Community Support', type: 'communitySupport', odTag: 'LGBTQ centers',     title: 'LGBTQ centers'},
  {category: 'Community Support', type: 'communitySupport', odTag: 'Cultural centers',  title: 'Cultural centers'},

  /* AC Mental Health Category */
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Mental health'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Mental health emergency',   title: 'Hotlines'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Hotlines',                  title: 'Hotlines'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Text lines',                title: 'Hotlines'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Grief',                     title: 'Private therapy and counseling'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Counseling & therapy',      title: 'Private therapy and counseling'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Anger management',          title: 'Private therapy and counseling'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Depression',                title: 'Private therapy and counseling'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Psychological evaluations for asylum claim', title: 'Psychological evaluations for asylum claim'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Addiction',                 title: 'Substance use'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Support groups',            title: 'Support groups'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Peer support',              title: 'Support groups'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Transgender support groups',title: 'Trans support groups'},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Crisis hotlines',           title: 'Hotlines',      iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Domestic violence hotline', title: 'Hotlines',      iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Suicide hotlines',          title: 'Hotlines',      iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Child abuse hotlines',      title: 'Hotlines',      iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Elder abuse hotlines',      title: 'Hotlines',      iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Crisis text lines',         title: 'Hotlines',      iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Suicide text lines',        title: 'Hotlines',      iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Domestic violence text lines', title: 'Hotlines',   iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Alcoholics Anonymous',      title: 'Substance use', iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Al-Anon & family support',  title: 'Substance use', iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Alcohol treatment',         title: 'Substance use', iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Detox',                     title: 'Substance use', iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Drugs',                     title: 'Substance use', iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Needle exchanges',          title: 'Substance use', iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Other addictions',          title: 'Substance use', iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Residential treatment',     title: 'Substance use', iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Sober living',              title: 'Substance use', iconOnly: true},
  {category: 'Mental Health', type: 'mentalHealth', odTag: 'Smoking',                   title: 'Substance use', iconOnly: true},

  /* AC Mail services Category */
  {category: 'Mail Services', type: 'mail', odTag: 'Mail'},

  /* AC Sports and Entertainment Category */
  {category: 'Sports and Entertainment', type: 'sportsEntertainment', odTag: 'Recreational activities'},
  {category: 'Sports and Entertainment', type: 'sportsEntertainment', odTag: 'Toys'},
  {category: 'Sports and Entertainment', type: 'sportsEntertainment', odTag: 'Art & performance art', iconOnly: true},
  {category: 'Sports and Entertainment', type: 'sportsEntertainment', odTag: 'Dance',                 iconOnly: true},
  {category: 'Sports and Entertainment', type: 'sportsEntertainment', odTag: 'Recreation',            iconOnly: true},
  {category: 'Sports and Entertainment', type: 'sportsEntertainment', odTag: 'Sports & fitness',      iconOnly: true},

  /* AC Translation and interpretation Category */
  {category: 'Translation and Interpretation', type: 'speechBubble', odTag: 'Translation/interpretation for healthcare'},
  {category: 'Translation and Interpretation', type: 'speechBubble', odTag: 'Translation & Interpretation'},
  {category: 'Translation and Interpretation', type: 'speechBubble', odTag: 'Translation/interpretation for legal services', iconOnly: true},

  /* AC Transportation Category */
  {category: 'Transportation', type: 'transportation', odTag: 'Transportation'},
  {category: 'Transportation', type: 'transportation', odTag: 'Transit passes & discounts',     title: 'Transit passes and discounts'},
  {category: 'Transportation', type: 'transportation', odTag: 'Transportation for healthcare',  title: 'Transit passes and discounts'},
  {category: 'Transportation', type: 'transportation', odTag: 'Transportation assistance',      title: 'Transportation assistance'},
  {category: 'Transportation', type: 'transportation', odTag: 'Transportation for healthcare',  title: 'Transportation assistance'},
];

//use this to exclude certain resource types from the list for certain locales
const localeExclusions = {
  'en_US': [],
  'en_CA': [
    'Deferred Action for Childhood Arrivals (DACA)',
    'Special Immigrant Juvenile Status (SIJS)'
  ]
}
const filterResourceType = function(item, locale) {
  if(typeof item.title !== 'undefined') {
    return (typeof localeExclusions[locale] === 'undefined' || localeExclusions[locale].indexOf(item.title) == -1);
  } else { 
    return (typeof localeExclusions[locale] === 'undefined' || localeExclusions[locale].indexOf(item.category) == -1);
  }
}


const defaultLocale = 'en_US';

const getResourceTypes = (locale = defaultLocale) => {
  return resourceTypes.filter((item) => (filterResourceType(item, locale)));
}

const getResourceTypesByGroup = (locale = defaultLocale) => {
  let categorized = {}, index = [], final = [];
  resourceTypes.filter((item) => (filterResourceType(item, locale))).forEach((item) => {
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

const resourceTypesByGroup = getResourceTypesByGroup();

const getResourceIndex = (locale = defaultLocale) => {
  let index = {};
  resourceTypes.filter((item) => (filterResourceType(item, locale))).forEach((item) => {
    index[item.odTag] = item
  });
  return index;
}

const resourceIndex = getResourceIndex();

const getResourceCategoryIndex = (locale = defaultLocale) => {
  let index = {};
  resourceTypes.filter((item) => (filterResourceType(item, locale))).forEach((item) => {
    if(item.title) {
      index[item.title] = item
    } else if((typeof item.iconOnly === 'undefined' || !item.iconOnly) && typeof index[item.category] === 'undefined') {
      index[item.category] = item;
    }
    
  });

  return index;
}

const resourceCategoryIndex = getResourceCategoryIndex();

const getBadge = (tags) => {
  let badge = 'misc';
  tags.forEach((tag) => {
    if(typeof resourceIndex[tag] !== 'undefined' && badge == 'misc') {
      badge = resourceIndex[tag].type
    }
  });
  return badge;
};

const combineTags = (resource) => {
  return resource.tags.concat(
    resource.categories && resource.categories.length ? resource.categories : [],
    resource.areas && resource.areas.length ? resource.areas : []
  );
}

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
  combineTags
};