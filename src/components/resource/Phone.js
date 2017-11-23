import React from 'react';

const Phone = (props) => {
  const { phone, classes, includeIcon } = props;
  let icon, phoneType = (phone.phone_type ? phone.phone_type.toLowerCase() : null);
  switch(phoneType) {
    case "fax": 
      icon = "fa-fax";
      break;
    default:
      icon = "fa-phone"
  }
  return (
    <a href={"tel:"+phone.digits} className={classes.bodyLink+' '+classes.listLink}>
      {includeIcon ? (()=>(<i className={"fa "+icon} aria-hidden="true"></i>))()+"&nbsp;" : null}
      {phone.digits}
    </a>
  )
}

export default Phone;