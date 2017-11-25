import React from 'react';
import url from 'url';
import trim from 'trim';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

import { scheduleParser, addressParser } from '../../helpers/Parser';
import Phone from './Phone';

const Visit = ({resource, classes, isMobile}) => (
  <Grid container spacing={0}>
    <Grid item xs={12}>
      <Typography type="subheading" className={classes.boldFont+' '+classes.bottomSpacing} >
        How to visit this resource
      </Typography>
    </Grid>
     <Grid item xs={12} className={classes.dividerSpacing}>
      <Typography type="body2" className={classes.lineSpacing} ><strong className={classes.boldFont}>Website: </strong>{resource.website ? <a href={resource.website} target="_blank" className={classes.bodyLink}>{isMobile ? url.parse(resource.website).hostname : resource.website}</a> : null}</Typography>
      {resource.emails && resource.emails.length ? 
        <Typography type="body2" className={classes.lineSpacing} >
          <strong className={classes.boldFont}>Email: </strong>{resource.emails.map((email) => {
            let name = trim(
              (email.title ? email.title : '')+ ' ' +
              (email.first_name ? email.first_name : '')+ ' ' +
              (email.last_name ? email.last_name : '')
            );
            return (
            <a href={"mailto:"+email.email} key={email.id} className={classes.bodyLink+' '+classes.listLink}>
              {email.email} 
              {name ? "("+name+")" : ''}
            </a>
        )})}
      </Typography> : null}
      {resource.phones && resource.phones.length ? 
      <Typography type="body2" className={classes.lineSpacing} >
        <strong className={classes.boldFont}>Phone number(s): </strong>{resource.phones.map((phone) => (
          <Phone key={phone.id} phone={phone} classes={classes} />
        )
      )}
      </Typography> : null }
      {resource.locations && resource.locations.length ? 
        resource.locations.map((location) => (
          <Typography key={location.id} type="body2" className={classes.lineSpacing} >
            <strong className={classes.boldFont}>Location: </strong>
            {addressParser({address: location})}
          </Typography>
        ))
      : null}
      {resource.schedule && Object.keys(resource.schedule).length > 1 ?
        <Typography type="body2" className={classes.lineSpacing} >
          {scheduleParser({schedule: resource.schedule})}
        </Typography>
      : null}
      {/*<Typography type="body2" className={classes.lineSpacing} >
        <strong className={classes.boldFont}>Public transportation: </strong>
      </Typography>*/}
    </Grid>
  </Grid>
);

export default Visit;