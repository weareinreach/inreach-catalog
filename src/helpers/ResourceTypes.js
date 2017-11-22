const resourceTypes = [
  /* AC Medical Category */
  {category: 'Medical', type: 'medical', odTag: 'Health', title: 'Medical clinics'},
  {category: 'Medical', type: 'medical', odTag: 'Pregnancy', title: 'Women\'s health'},
  {category: 'Medical', type: 'medical', odTag: 'OB & prenatal care', title: 'Women\'s health'},
  {category: 'Medical', type: 'medical', odTag: 'Birth preparation', title: 'Women\'s health'},
  {category: 'Medical', type: 'medical', odTag: 'Pregnancy tests', title: 'Women\'s health'},
  {category: 'Medical', type: 'medical', odTag: 'Abortion', title: 'Women\'s health'},
  {category: 'Medical', type: 'medical', odTag: 'Gynecology', title: 'Women\'s health'},
  {category: 'Medical', type: 'medical', odTag: 'Sexual health', title: 'Sexual health'},
  {category: 'Medical', type: 'medical', odTag: 'Sex worker health services', title: 'Sexual health'},
  {category: 'Medical', type: 'medical', odTag: 'Birth control', title: 'Sexual health'},
  {category: 'Medical', type: 'medical', odTag: 'Sex education', title: 'Sexual health'},
  {category: 'Medical', type: 'medical', odTag: 'STD tests', title: 'Sexual health'},
  {category: 'Medical', type: 'medical', odTag: 'HIV health services', title: 'Sexual health'},
  {category: 'Medical', type: 'medical', odTag: 'Trans health', title: 'Trans health'},
  {category: 'Medical', type: 'medical', odTag: 'Dental', title: 'Dental care'},
  /* AC Legal Category */
  {category: 'Legal', type: 'legal', odTag: 'Legal assistance', title: 'Legal aid'},
  {category: 'Legal', type: 'legal', odTag: 'Documentation', title: 'Documentation'},
  /* AC Housing Category */
  {category: 'Housing', type: 'housing', odTag: 'Supportive housing'},
  {category: 'Housing', type: 'housing', odTag: 'Temporary housing'},
  {category: 'Housing', type: 'housing', odTag: 'Affordable housing'},
  {category: 'Housing', type: 'housing', odTag: 'Tenant resources'},
  {category: 'Housing', type: 'housing', odTag: 'Homeless support'},
  /* AC Food Category */
  {category: 'Food', type: 'food', odTag: 'Food'},
  {category: 'Food', type: 'food', odTag: 'Prepared meals'},
  {category: 'Food', type: 'food', odTag: 'Groceries'},
  {category: 'Food', type: 'food', odTag: 'Food delivery'},
  {category: 'Food', type: 'food', odTag: 'Nutrition'},
  /* AC Hygiene and Clothing Category */
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Homeless support'},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Laundry'},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Showers'},
  {category: 'Hygiene and Clothing', type: 'hygiene', odTag: 'Hygiene'},
  /* AC Computers and Internet Category */
  {category: 'Computers and Internet', type: 'computers', odTag: 'Computer labs'},
  /* AC Education and Employment Category */
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Language resources', title: 'English classes'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Skills building', title: 'English classes'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Books & supplies', title: 'English classes'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Finding work', title: 'Career counseling'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Unemployment', title: 'Career counseling'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Job training & preparation', title: 'Career counseling'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Libraries', title: 'Libraries'},
  {category: 'Education and Employment', type: 'educationEmployment', odTag: 'Scholarships', title: 'Scholarships'},
  /* AC Community support Category */
  {category: 'Community support', type: 'communitySupport', odTag: 'Community centers', title: 'Community centers'},
  {category: 'Community support', type: 'communitySupport', odTag: 'LGBTQ centers', title: 'LGBTQ centers'},
  {category: 'Community support', type: 'communitySupport', odTag: 'Cultural centers', title: 'Cultural centers'},
  /* AC Mental health Category */
  {category: 'Mental health', type: 'mentalHealth', odTag: 'Support groups', title: 'Support groups'},
  {category: 'Mental health', type: 'mentalHealth', odTag: 'Peer support', title: 'Support groups'},
  {category: 'Mental health', type: 'mentalHealth', odTag: 'Counseling & therapy', title: 'Private Counseling'},
  {category: 'Mental health', type: 'mentalHealth', odTag: 'Psychiatry', title: 'Psychiatry'},
  /* AC Mail services Category */
  {category: 'Mail services', type: 'mail', odTag: 'Mail'},
  /* AC Sports and Entertainment Category */
  {category: 'Sports and Entertainment', type: 'sportsEntertainment', odTag: 'Recreational activities'},
  {category: 'Sports and Entertainment', type: 'sportsEntertainment', odTag: 'Art'},
  {category: 'Sports and Entertainment', type: 'sportsEntertainment', odTag: 'Dance'},
  {category: 'Sports and Entertainment', type: 'sportsEntertainment', odTag: 'Recreation'},
  {category: 'Sports and Entertainment', type: 'sportsEntertainment', odTag: 'Sports & fitness'},
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

const getTagIndex = () => {
  let index = {};
  resourceTypes.forEach((item) => {
    index[item.odTag] = item
  });
  return index;
}

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
  groupResourceTypes,
  getTagIndex
};