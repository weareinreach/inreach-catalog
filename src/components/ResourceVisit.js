import React from 'react';
import url from 'url';
import trim from 'trim';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fa from 'react-fontawesome';

import {ScheduleParser, AddressParser} from './Parser';
import Phone from './ResourcePhone';
import {boldFont, bodyLink, listLink, dividerSpacing} from '../theme';

const styles = (theme) => ({
  boldFont: boldFont(theme),
  bodyLink: bodyLink(theme),
  listLink: listLink(theme),
  dividerSpacing: dividerSpacing(theme),
  bottomSpacing: {
    marginBottom: theme.spacing(1),
  },
  lineSpacing: {
    lineHeight: '1.4rem',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(4),
      position: 'relative',
    },
  },
  locationSpacing: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  mobileIcon: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      position: 'absolute',
      left: 0,
      top: theme.spacing(1) / 2,
      width: '22px',
    },
  },
  mobileHide: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
});

//TODO: Update each of these to utilize components where the code is shared with DetailAccessInstructions.js

const Visit = ({
  website,
  phones,
  emails,
  locations,
  classes,
  isMobile,
  hideTitle,
  className,
}) => (
  <Grid container spacing={0} className={className}>
    <Grid item xs={12}>
      <Typography variant="body2" className={classes.lineSpacing}>
        <strong className={classes.boldFont + ' ' + classes.mobileHide}>
          Website:{' '}
        </strong>
        {website ? (
          <a
            href={website}
            target="_blank"
            className={classes.bodyLink}
            rel="noopener noreferrer"
          >
            {isMobile ? url.parse(website).hostname : website}
          </a>
        ) : null}
        <Fa name="link" className={classes.mobileIcon} />
      </Typography>

      {emails && emails.length ? (
        <Typography variant="body2" className={classes.lineSpacing}>
          {/*<Header emailExist={true} />*/}

          <strong className={classes.boldFont + ' ' + classes.mobileHide}>
            Email:{' '}
          </strong>

          {emails.map((email) => {
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
                className={classes.bodyLink + ' ' + classes.listLink}
              >
                {email.email}
                {name ? '(' + name + ')' : ''}
              </a>
            );
          })}
          <Fa name="envelope" className={classes.mobileIcon} />
        </Typography>
      ) : null}
      {phones && phones.length ? (
        <Typography variant="body2" className={classes.lineSpacing}>
          <strong className={classes.boldFont + ' ' + classes.mobileHide}>
            Phone number(s):{' '}
          </strong>
          {phones.map((phone) => (
            <Phone
              key={phone.id}
              phone={phone}
              classes={classes}
              includeType={true}
            />
          ))}
          <Fa name="phone" className={classes.mobileIcon} />
        </Typography>
      ) : null}
      {locations && locations.length
        ? locations.map((location) => {
            let schedule;
            return (
              <div
                key={location.id}
                className={
                  locations.length > 1 ? classes.locationSpacing : null
                }
              >
                <Typography variant="body2" className={classes.lineSpacing}>
                  <strong className={classes.boldFont}>
                    {location.name ? location.name : 'Location'}:{' '}
                  </strong>
                  {AddressParser({address: location})}
                  <Fa name="map-marker" className={classes.mobileIcon} />
                </Typography>
                {location.schedule &&
                Object.keys(location.schedule).length > 1 &&
                (schedule = ScheduleParser({schedule: location.schedule}))
                  .length ? (
                  <Typography variant="body2" className={classes.lineSpacing}>
                    <strong
                      className={classes.boldFont + ' ' + classes.mobileHide}
                    >
                      Hours:{' '}
                    </strong>
                    {schedule
                      .map((sch) => {
                        return sch.days + ' ' + sch.time;
                      })
                      .join(', ')}
                    <Fa name="clock-o" className={classes.mobileIcon} />
                  </Typography>
                ) : null}
                {location.schedule &&
                Object.keys(location.schedule).length > 1 &&
                location.schedule.notes &&
                trim(location.schedule.notes).length ? (
                  <Typography variant="body2" className={classes.lineSpacing}>
                    <strong className={classes.boldFont}>
                      Additional Information:{' '}
                    </strong>
                    {location.schedule.notes}
                    <Fa name="info-circle" className={classes.mobileIcon} />
                  </Typography>
                ) : null}
              </div>
            );
          })
        : null}
    </Grid>
  </Grid>
);

export default withStyles(styles)(Visit);
