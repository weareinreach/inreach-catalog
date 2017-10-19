import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = (theme) => ({
  announcement: {
    backgroundColor: theme.palette.common.blue,
    padding: '2rem 0',
    textAlign: 'center',
  },
  pointer: { cursor: 'pointer' },
  textWhite: { color: theme.palette.common.darkWhite },
});

const Announcement = ({ classes, handleRequestOpen }) => (
  <div className={classes.announcement}>

    <Typography type="body1" className={classes.textWhite}>
      Asylum seekers contact service providers at their own risk.
      <br />
      <span>Please read our complete </span>
      <strong
        className={classes.pointer}
        onClick={() => handleRequestOpen('disclaimer')}
      >
        Disclaimer
      </strong>
      <span> and </span>
      <strong
        className={classes.pointer}
        onClick={() => handleRequestOpen('privacy')}
      >
        User Privacy Statement
      </strong>
      <span> before using our catalog.</span>
    </Typography>

  </div>
);

Announcement.propTypes = {
  classes: PropTypes.object.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
};

export default withStyles(styles)(Announcement);
