import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';

const styles = theme => ({
  subAnnouncementText: {
    color: theme.palette.common.darkBlack,
    fontWeight: theme.typography.fontWeightHeavy,
    '&:hover': {
      color: theme.palette.common.darkBlack
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.caption.fontSize,
      fontWeight: theme.typography.caption.fontWeight
    }
  },
  subAnnouncementTextArrow: {
    verticalAlign: 'bottom',
    height: '1.2rem'
  }
});

const SubAnnouncement = ({classes, handleRequestOpen, url}) => (
  <Typography variant="body2">
    <a href={url} target="_blank" className={classes.subAnnouncementText}>
      Download our free mobile app&nbsp;&nbsp;
      <KeyboardArrowRightIcon className={classes.subAnnouncementTextArrow} />
    </a>
  </Typography>
);

SubAnnouncement.defaultProps = {url: 'https://asylumconnect.org/mobile-app/'};

SubAnnouncement.propTypes = {
  classes: PropTypes.object.isRequired,
  url: PropTypes.string
};

export default withStyles(styles)(SubAnnouncement);
