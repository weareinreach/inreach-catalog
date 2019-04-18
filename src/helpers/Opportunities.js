export const isACOpportunity = function(opportunity) {
  if(opportunity && opportunity.properties) {
    return (typeof opportunity.properties['community-asylum-seeker'] !== 'undefined' && opportunity.properties['community-asylum-seeker'] == 'true' && typeof opportunity.properties['community-lgbt'] !== 'undefined' && opportunity.properties['community-lgbt'] == 'true');
  } else { //if unsure, return true
    return true;
  }
}

export const fetchPhone = function(phones) {
  //if no primary, return phone number
  let selectedPhone = phones[0];

  //look for primary
  phones.map(phone => {
    if(phone.is_primary) {
      selectedPhone = phone;
    }
  });
  
  return selectedPhone;
}