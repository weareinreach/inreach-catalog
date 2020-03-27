import React from 'react';
import url from 'url';
import trim from 'trim';

import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Fa from 'react-fontawesome';

import {scheduleParser, addressParser} from '../../helpers/Parser';
import {fetchPhone} from '../../helpers/Opportunities';
import Phone from './Phone';
import {boldFont, bodyLink, listLink} from '../../theme/sharedClasses';

const styles = theme => ({
  boldFont: boldFont(theme),
  bodyLink: bodyLink(theme),
  listLink: listLink(theme),
  bottomSpacing: {
    marginBottom: theme.spacing.unit
  },
  lineSpacing: {
    lineHeight: '1.4rem',
    marginBottom: theme.spacing.unit * 2,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit * 4,
      position: 'relative'
    }
  },
  locationSpacing: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  instructions: {},
  mobileIcon: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      position: 'absolute',
      left: 0,
      top: theme.spacing.unit / 2,
      width: '22px'
    }
  },
  mobileHide: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  }
});
//TODO: Update each of these to utilize components where the code is shared with ResourceVisit.js

const DetailAccessInstructions = ({list, rawSchedule, classes}) => {
  //console.log(list, rawSchedule)
  let schedule;
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        {list.length
          ? list.map((item, index) => {
              switch (item.access_type) {
                case 'phone':
                  let phone =
                    item.access_value.replace(/[^0-9\(\)\-\.\s]/g, '').length ==
                    item.access_value.length
                      ? {digits: item.access_value}
                      : item.access_value;
                  if (phone && (phone.digits || phone.length > 0)) {
                    return (
                      <Typography
                        key={index}
                        variant="body2"
                        className={classes.lineSpacing}
                      >
                        <strong
                          className={
                            classes.boldFont + ' ' + classes.mobileHide
                          }
                        >
                          Phone:{' '}
                        </strong>
                        {typeof phone.digits !== 'undefined' ? (
                          <Phone
                            phone={phone}
                            classes={classes}
                            includeType={true}
                          />
                        ) : (
                          phone
                        )}
                        {item.instructions ? (
                          <span className={classes.instructions}>
                            <br />
                            {item.instructions}
                          </span>
                        ) : null}
                        <Fa name="phone" className={classes.mobileIcon} />
                      </Typography>
                    );
                  } else {
                    return null;
                  }
                  break;
                case 'email':
                  return (
                    <Typography
                      key={index}
                      variant="body2"
                      className={classes.lineSpacing}
                    >
                      <strong
                        className={classes.boldFont + ' ' + classes.mobileHide}
                      >
                        Email:{' '}
                      </strong>
                      {item.emails &&
                        item.emails.map(email => {
                          let name = trim(
                            (email.title ? email.title : '') +
                              ' ' +
                              (email.first_name ? email.first_name : '') +
                              ' ' +
                              (email.last_name ? email.last_name : '')
                          );
                          return (
                            <a
                              href={'mailto:' + email.email}
                              key={email.id}
                              className={
                                classes.bodyLink + ' ' + classes.listLink
                              }
                            >
                              {email.email}
                              {name ? '(' + name + ')' : ''}
                            </a>
                          );
                        })}
                      {item.instructions ? (
                        <span className={classes.instructions}>
                          <br />
                          {item.instructions}
                        </span>
                      ) : null}
                      <Fa name="envelope" className={classes.mobileIcon} />
                    </Typography>
                  );
                  break;
                case 'location':
                  if (item.locations && item.locations.length) {
                    return (
                      <div key={index}>
                        <Typography
                          variant="body2"
                          className={classes.lineSpacing}
                        >
                          <strong className={classes.boldFont}>
                            {item.access_value
                              ? item.access_value
                              : item.locations[0].name}
                            :{' '}
                          </strong>
                          {addressParser({address: item.locations[0]})}

                          <Fa
                            name="map-marker"
                            className={classes.mobileIcon}
                          />
                        </Typography>
                        <Typography
                          variant="body2"
                          className={classes.lineSpacing}
                        >
                          {rawSchedule &&
                          Object.keys(rawSchedule).length > 1 &&
                          (schedule = scheduleParser({schedule: rawSchedule}))
                            .length ? (
                            <span>
                              <strong
                                className={
                                  classes.boldFont + ' ' + classes.mobileHide
                                }
                              >
                                Hours:{' '}
                              </strong>
                              {schedule
                                .map(sch => {
                                  return sch.days + ' ' + sch.time;
                                })
                                .join(', ')}
                              <Fa
                                name="clock-o"
                                className={classes.mobileIcon}
                              />
                            </span>
                          ) : null}
                          {item.instructions ? (
                            <span className={classes.instructions}>
                              <br />
                              {item.instructions}
                            </span>
                          ) : null}
                        </Typography>
                      </div>
                    );
                  } else {
                    return null;
                  }
                  break;
                case 'link':
                  return (
                    <Typography
                      key={index}
                      variant="body2"
                      className={classes.lineSpacing}
                    >
                      <strong
                        className={classes.boldFont + ' ' + classes.mobileHide}
                      >
                        Website:{' '}
                      </strong>
                      <a
                        href={item.access_value}
                        target="_blank"
                        className={classes.bodyLink + ' ' + classes.listLink}
                      >
                        {item.access_value}
                      </a>
                      {item.instructions ? (
                        <span className={classes.instructions}>
                          <br />
                          {item.instructions}
                        </span>
                      ) : null}
                      <Fa name="link" className={classes.mobileIcon} />
                    </Typography>
                  );
                  break;
                case 'file':
                  break;
                case 'other':
                default:
                  return (
                    <Typography
                      key={index}
                      variant="body2"
                      className={classes.lineSpacing}
                    >
                      <strong className={classes.boldFont}>
                        {item.access_value}:{' '}
                      </strong>{' '}
                      item.instructions
                    </Typography>
                  );
                  break;
              }
            })
          : null}
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(DetailAccessInstructions);

/*locations && locations.length ? 
        locations.map((location) => {
          let schedule;
          return (
          <div key={location.id} className={locations.length > 1 ? classes.locationSpacing : null}>
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
      : null*/
