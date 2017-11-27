import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  accountNav: {
    display: "flex",
    flex: "0 0 200px"
  },
  root: {
    display: 'flex',
    padding: '0 5px 0',
  },
  accountLinks: {
    padding: '5px 10px'
  },
  divider: {
    borderRight: "1px solid",
    borderColor: theme.palette.text.divider
  },
  lowercaseText: {
    textTransform: 'capitalize',
    'cursor': 'pointer'
  },
  cursor: {
    cursor: 'pointer'
  }
});

const AccountNav = ({
  classes,
  session,
  handleLogOut,
  handleRequestOpen,
}) => (
  <div
    className={classes.accountNav+' hide--on-print'}
    >
    {session && (
      <div className={classes.root}>
        <Link
          className={[classes.divider, classes.accountLinks].join(' ')}
          to='/account'
        >
          <Typography type='body1' className={classes.lowercaseText}>
             Account Settings
          </Typography>
        </Link>
        <Link to='/'
          className={classes.accountLinks}
          onClick={handleLogOut}
        >
          <Typography type='body1' className={classes.lowercaseText} >
            Log Out
          </Typography>
        </Link>
      </div>
    )}

    {!session && (
      <div className={classes.root}>
        <a
          className={[classes.divider, classes.accountLinks, classes.cursor].join(' ')}
          onClick={() => handleRequestOpen('login')}
        >
          <Typography type='body1' className={classes.lowercaseText}>
            Log In
          </Typography>
        </a>
        <a
          className={[classes.accountLinks, classes.cursor].join(' ')}
          onClick={() => handleRequestOpen('signup')}
        >
          <Typography type='body1' className={classes.lowercaseText} >
            Sign Up
          </Typography>
        </a>
      </div>
    )}

  </div>
);

AccountNav.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  session: PropTypes.string,
};

export default withStyles(styles)(AccountNav);
