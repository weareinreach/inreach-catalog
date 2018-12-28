import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';


const styles = (theme) => ({
  subAnnouncementText: {
    color: theme.palette.common.darkBlack,
    fontWeight: theme.typography.fontWeightHeavy
  },
  subAnnouncementTextArrow: {
    verticalAlign: 'bottom',
    height: '1.2rem'
  },
});

const SubAnnouncement = ({ classes, handleRequestOpen, url }) => (
  <Typography type="body2">
    <a href={url} target="_blank" className={classes.subAnnouncementText}>Are you interested in joining an online community for LGBTQ asylum seekers?&nbsp;&nbsp;<KeyboardArrowRightIcon className={classes.subAnnouncementTextArrow} /></a>
  </Typography>
);

SubAnnouncement.defaultProps = { url: 'https://goo.gl/forms/EihovJZGbCqKZ5582' }

SubAnnouncement.propTypes = {
  classes: PropTypes.object.isRequired,
  url: PropTypes.string
};

export default withStyles(styles)(SubAnnouncement);
