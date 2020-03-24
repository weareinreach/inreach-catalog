import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {withStyles} from 'material-ui/styles';

import {DialogTitle} from '../dialog';
import LoginFormContainer from './LoginFormContainer';
import Disclaimer from '../static/Disclaimer';

const styles = theme => ({
  paddingDisclaimer: {paddingTop: theme.spacing.unit * 1},
  disclaimerLink: {
    cursor: 'pointer',
    color: theme.palette.secondary[900]
  }
});

const LoginDialog = ({
  handleLogIn,
  handleMessageNew,
  handleRequestClose,
  handleRequestOpen,
  classes
}) => (
  <div>
    <DialogTitle>Log In</DialogTitle>
    <div className={classes.paddingDisclaimer}>
      <Disclaimer
        text={
          <Fragment>
            Due to moving to a new technology system, we are asking all of our
            users who created an account before March 20th, 2020 to create a new
            account. We apologize for any inconvenience. To create your new
            account, please click{' '}
            <u>
              <span
                onClick={() => handleRequestOpen('signup')}
                className={classes.disclaimerLink}
              >
                here
              </span>
            </u>
            .
          </Fragment>
        }
        marginBottom={'0'}
      />
    </div>
    <LoginFormContainer
      handleLogIn={handleLogIn}
      handleMessageNew={handleMessageNew}
      handleRequestClose={handleRequestClose}
      handleRequestOpen={handleRequestOpen}
    />
  </div>
);

LoginDialog.propTypes = {
  handleLogIn: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired
};

export default withStyles(styles)(LoginDialog);
