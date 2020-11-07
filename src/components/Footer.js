import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppStoreBadge from '../images/app-store-badge.svg'
import GooglePlayBadge from '../images/google-play-badge.png'

const styles = (theme) => ({
  bgDarkGrey: { backgroundColor: theme.palette.common.darkGrey },
  bgLightGrey: { backgroundColor: theme.palette.common.lightGrey },
  paddingBelow: { paddingBottom: '0.5rem' },
  paddingBelowLarge: { paddingBottom: '2rem' },
  paddingVertical: { padding: '1.5rem 0' },
  paddingVerticalIcons: { padding: '2.5rem 0 1rem 0' },
  paddingVerticalText: { padding: '1rem 0 1.5rem 0' },
  centerColumn: {
    maxWidth: theme.maxColumnWidth,
    margin: '0 auto',
  },
  textBlue: { color: theme.palette.secondary },
  textCenter: { textAlign: 'center' },
  footerLink: {
    fontWeight: '700',
  },
});

const Footer = ({ classes, locale }) => {
  const {
    bgDarkGrey,
    bgLightGrey,
    paddingVertical,
    paddingVerticalIcons,
    paddingVerticalText,
    textBlue,
    textCenter,
    centerColumn,
    footerLink,
  } = classes;

  const ContactLink = ({ link, icon }) => (
    <Grid item>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={textBlue}
      >
        <FontAwesome name={icon} size="lg" />
      </a>
    </Grid>
  );

  return (
    <footer className={classNames(textCenter, bgDarkGrey)}>
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        className={classNames(centerColumn, paddingVerticalIcons)}
      >
        <Grid item xs={12} md={6}>
          <Grid container spacing={2} justify="center">
            <ContactLink
              link="https://www.facebook.com/asylumconnect"
              icon="facebook-f"
            />
            <ContactLink
              link="https://twitter.com/AsylumConnect"
              icon="twitter"
            />
            <ContactLink
              link="https://www.linkedin.com/company/6454603/"
              icon="linkedin"
            />
            <ContactLink
              link="mailto:catalog@asylumconnect.org"
              icon="envelope-o"
            />
            <ContactLink
              link="https://www.instagram.com/asylumconnect/"
              icon="instagram"
            />
            <ContactLink
              link="https://www.youtube.com/channel/UCJsVS5-0ymo40mRjCe4BIHA"
              icon="youtube-play"
            />
            <Grid container xs={6} spacing={2} align="center" justify="center">
              <Grid item>
                <a
                  href="https://apps.apple.com/us/app/asylumconnect-lgbtq-help/id1482908383"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img height="35" src={AppStoreBadge} alt="Download on the App Store badge" />
                </a>
              </Grid>
              <Grid item>
                <a
                  href="https://play.google.com/store/apps/details?id=org.asylumconnect.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img height="35" src={GooglePlayBadge} alt="Get it on Google Play badge" />
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        className={classNames(centerColumn, paddingVerticalText)}
      >
        <Grid item xs={12} md={6}>
          <Grid container spacing={0}>
            <Grid item xs>
              <Link to={'/' + locale + '/suggestions/new'} className={textBlue}>
                <Typography variant="body1" color="secondary" classes={{ body1: footerLink }}>Suggest a Resource</Typography>
              </Link>
            </Grid>
            <Grid item xs>
              <a href="https://asylumconnect.org/newsletter/" className={textBlue}>
                <Typography variant="body1" color="secondary" classes={{ body1: footerLink }}>Subscribe to Newsletter</Typography>
              </a>
            </Grid>
            <Grid item xs>
              <a href="https://survey.az1.qualtrics.com/jfe/form/SV_4JylCyjAklvKGVL" className={textBlue}>
                <Typography variant="body1" color="secondary" classes={{ body1: footerLink }}>Share Feedback</Typography>
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div className={classNames(bgLightGrey, paddingVertical)}>
        <Typography variant="caption">
          AsylumConnect, Inc. {new Date().getFullYear()}. All rights reserved.
        </Typography>
      </div>
    </footer>
  );
};

export default withStyles(styles)(Footer);
