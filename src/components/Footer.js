import React from 'react';
import PropTypes from 'prop-types';
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
  paddingVertical: { padding: '1.5rem 0' },
  textBlack: { color: theme.palette.common.darkBlack },
  textCenter: { textAlign: 'center' },
});

const Footer = ({ classes }) => {
  const {
    bgDarkGrey,
    bgLightGrey,
    paddingBelow,
    paddingVertical,
    textBlack,
    textCenter,
  } = classes;

  const ContactLink = ({ link, icon }) => (
    <Grid item>
      <a href={link} target="_blank" className={textBlack}>
        <FontAwesome name={icon} size="lg" />
      </a>
    </Grid>
  );

  return (
    <footer className={textCenter}>
      <Grid container className={classNames(bgDarkGrey, paddingVertical)}>

        <Grid item xs={12} md={6}>
          <Typography type="display3" className={classNames(paddingBelow)}>
            Connect with AsylumConnect
          </Typography>
          <Grid container justify="center">
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
              link="mailto:katie@asylumconnect.org"
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
          <Typography type="display3" className={paddingBelow}>
            Stay Updated on AsylumConnect's Lifesaving Initiatives
          </Typography>
          <a
            href="http://www.asylumconnect.org/follow-us-subscribe/"
            target="_blank"
          >
            <AsylumConnectButton variant="primary">
              Subscribe to our newsletter
            </AsylumConnectButton>
          </a>
        </Grid>
      </Grid>

      <div className={classNames(bgLightGrey, paddingVertical)}>
        <Typography type="body2">
          AsylumConnect, Inc. 2016. All rights reserved. Powered by One Degree.
        </Typography>
      </div>

    </footer>
  );
};

export default withStyles(styles)(Footer);
