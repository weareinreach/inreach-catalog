import React from 'react';
import url from 'url';
import trim from 'trim';

import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

import { scheduleParser, addressParser } from '../../helpers/Parser';
import Phone from './Phone';
import {boldFont, bodyLink, listLink, dividerSpacing} from '../../theme/sharedClasses';

const styles = theme => ({
  boldFont: boldFont(theme),
  bodyLink: bodyLink(theme),
  listLink: listLink(theme),
  dividerSpacing: dividerSpacing(theme),
  bottomSpacing: {
    marginBottom: theme.spacing.unit * 2
  },
  lineSpacing: {
    lineHeight: "1.4rem"
  },
  locationSpacing: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }
});

const Visit = ({resource, classes, isMobile, hideTitle, className}) => (
  <Grid container spacing={0} className={className}>
    {hideTitle ? null :
    <Grid item xs={12}>
      <Typography variant="subheading" className={classes.boldFont+' '+classes.bottomSpacing} >
        How to visit this resource
      </Typography>
    </Grid>
    }
     <Grid item xs={12} className={classes.dividerSpacing}>
      <Typography variant="body2" className={classes.lineSpacing} ><strong className={classes.boldFont}>Website: </strong>{resource.website ? <a href={resource.website} target="_blank" className={classes.bodyLink}>{isMobile ? url.parse(resource.website).hostname : resource.website}</a> : null}</Typography>
      {resource.emails && resource.emails.length ? 
        <Typography variant="body2" className={classes.lineSpacing} >
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
      <Typography variant="body2" className={classes.lineSpacing} >
        <strong className={classes.boldFont}>Phone number(s): </strong>{resource.phones.map((phone) => (
          <Phone key={phone.id} phone={phone} classes={classes} />
        )
      )}
      </Typography> : null }
      {resource.locations && resource.locations.length ? 
        resource.locations.map((location) => {
          let schedule;
          return (
          <div key={location.id} className={resource.locations.length > 1 ? classes.locationSpacing : null}>
            <Typography variant="body2" className={classes.lineSpacing} >
              <strong className={classes.boldFont}>{location.name ? location.name : 'Location'}: </strong>
              {addressParser({address: location})}
            </Typography>
            {location.schedule && Object.keys(location.schedule).length > 1 && (schedule = scheduleParser({schedule: location.schedule})).length
            ?
              <Typography variant="body2" className={classes.lineSpacing} >
                <strong className={classes.boldFont}>Hours: </strong>
                {schedule.map((sch) => {
                  return sch.days+' '+sch.time;
                }).join(', ')}
              </Typography>
            : null}
            {location.schedule 
              && Object.keys(location.schedule).length > 1 
              && location.schedule.notes 
              && trim(location.schedule.notes).length 
            ?
              <Typography variant="body2" className={classes.lineSpacing} >
                <strong className={classes.boldFont}>Additional Information: </strong>
                {location.schedule.notes}
              </Typography>
            : null}
          </div>
        )
      })
      : null}
      
      
      {/*<Typography variant="body2" className={classes.lineSpacing} >
        <strong className={classes.boldFont}>Public transportation: </strong>
      </Typography>*/}
    </Grid>
  </Grid>
);

export default withStyles(styles)(Visit);