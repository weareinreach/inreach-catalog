import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import AsylumConnectButton from './AsylumConnectButton';
import {
  AccountIcon,
  FavoritesIcon,
  LanguageIcon,
  PrivacyIcon,
  SearchIcon,
} from './icons';

const styles = theme => ({
  bgDarkGrey: { backgroundColor: theme.palette.common.darkGrey },
  bgLightGrey: { backgroundColor: theme.palette.common.lightGrey },
  paddingBelow: { paddingBottom: '0.5rem' },
  paddingBelowLarge: { paddingBottom: '2rem' },
  paddingVertical: { padding: '2rem 0' },
  centerColumn: {
    maxWidth: theme.maxColumnWidth,
    margin: "0 auto"
  },
  textBlack: { color: theme.palette.common.darkBlack },
  textCenter: { textAlign: 'center' },
  footerLink: {
    color: theme.typography.body2.color,
    textDecoration: 'underline',
    '&:link': {
      color: theme.typography.body2.color
    },
    '&:hover': {
      color: theme.typography.body2.color,
      textDecoration: 'none',
    },
    '&:active': {
      color: theme.typography.body2.color
    }

  }
});

const Footer = ({ classes, locale }) => {
  const {
    bgDarkGrey,
    bgLightGrey,
    footerLink,
    paddingBelow,
    paddingBelowLarge,
    paddingVertical,
    textBlack,
    textCenter,
    centerColumn
  } = classes;

  const ContactLink = ({ link, icon }) => (
    <Grid item>
      <a href={link} target="_blank" className={textBlack}>
        <FontAwesome name={icon} size="lg" />
      </a>
    </Grid>
  );

  return (
    <footer className={classNames(textCenter, bgDarkGrey)}>
      <Grid container spacing={0} alignItems="center" className={classNames(centerColumn, paddingVertical)}>

        <Grid item xs={12} md={6}>
          <Grid container spacing={16} justify="center">
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
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container spacing={0}>
            <Grid item xs>
              <Link to={"/"+locale+"/suggestions/new"}>
                <Typography variant="display3">
                  Suggest a Resource
                </Typography>
              </Link>
            </Grid>
            <Grid item xs>
              <a href="https://survey.az1.qualtrics.com/jfe/form/SV_4JylCyjAklvKGVL">
                <Typography variant="display3">
                  Share Feedback
                </Typography>
              </a>
            </Grid>
            <Grid item xs>
              <a href="https://asylumconnect.org/contact/">
                <Typography variant="display3">
                  Subscribe to our Newsletter
                </Typography>
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div className={classNames(bgLightGrey, paddingVertical)}>
        <Typography variant="body2">
          AsylumConnect, Inc. {(new Date()).getFullYear()}. All rights reserved. <a href="https://www.1degree.org" className={footerLink}>Powered by One Degree</a>.
        </Typography>
      </div>

    </footer>
  );
};

export default withStyles(styles)(Footer);
