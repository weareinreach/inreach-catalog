import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  announcement: {
    backgroundColor: theme.palette.secondary[500],
    padding: '2rem 0',
    textAlign: 'center'
  },
  pointer: {
    cursor: 'pointer',
    display: 'inline-block',
    position: 'relative'
  },
  pointerText: {
    textShadow:
      '2px 0 ' +
      theme.palette.secondary[500] +
      ', -2px 0 ' +
      theme.palette.secondary[500]
  },
  underline: {
    position: 'absolute',
    width: '100%',
    display: 'block',
    margin: '0',
    border: 'none',
    height: '1px',
    background: 'white',
    bottom: '.2em'
  },
  textContent: {
    color: theme.palette.common.darkWhite,
    maxWidth: theme.maxColumnWidth,
    margin: '0 auto'
  }
});

const Announcement = ({classes, handleRequestOpen}) => (
  <div className={classes.announcement + ' hide--on-print'}>
    <Typography variant="body1" className={classes.textContent}>
      Asylum seekers contact service providers at their own risk.
      <br />
      <span>Please read our complete </span>
      <strong
        className={classes.pointer}
        onClick={() => handleRequestOpen('disclaimer')}
      >
        <i className={classes.underline} />
        <span className={classes.pointerText}>Disclaimer</span>
      </strong>
      <span> and </span>
      <strong
        className={classes.pointer}
        onClick={() => handleRequestOpen('privacy')}
      >
        <i className={classes.underline} />
        <span className={classes.pointerText}>User Privacy Statement</span>
      </strong>
      <span> before using our catalog.</span>
    </Typography>
  </div>
);

Announcement.propTypes = {
  classes: PropTypes.object.isRequired,
  handleRequestOpen: PropTypes.func.isRequired
};

export default withStyles(styles)(Announcement);
