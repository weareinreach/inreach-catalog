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

const SubAnnouncement = ({ classes, handleRequestOpen }) => (
  <Typography type="body2">
    <a href="https://goo.gl/forms/EihovJZGbCqKZ5582" target="_blank" className={classes.subAnnouncementText}>Are you interested in joining an online community for LGBTQ asylum seekers?&nbsp;&nbsp;<KeyboardArrowRightIcon className={classes.subAnnouncementTextArrow} /></a>
  </Typography>
);

SubAnnouncement.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SubAnnouncement);
