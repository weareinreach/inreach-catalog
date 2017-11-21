import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, {Tab} from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import ForgotFormContainer from './ForgotFormContainer';
import LoginFormContainer from './LoginFormContainer';
import SignupFormContainer from './SignupFormContainer';

import breakpoints from '../../theme/breakpoints';
import theWidth from '../theWidth';


const TabContainer = ({children}) => {
  const isMobile = theWidth() < breakpoints['sm'];
  const tabPadding = isMobile ? '.5rem 1.5rem' : '2.5rem';

  return(
    <div style={{padding: tabPadding}}>{children}</div>
  );
};

TabContainer.propTypes = {children: PropTypes.node.isRequired};

const styles = theme => ({
  root: {flexGrow: 1},
  textCenter: {textAlign: 'center'},
});

const AccountMobile = ({
  classes,
  dialog,
  handleLogIn,
  handleMessageNew,
  handleRequestClose,
  handleRequestOpen,
  tab,
}) => (
  <div>
    <Paper className={classes.root}>
      <Typography className={classes.textCenter} type="display1">
        {tab === 0 && 'Log In'}
        {tab === 1 && 'Sign Up'}
      </Typography>
      <Tabs
        value={tab}
        onChange={(e, tab) => handleRequestOpen(tab === 0 ? 'login' : 'signup')}
        indicatorColor="primary"
        textColor="primary"
        centered>
        <Tab label="LOG IN" />
        <Tab label="SIGN UP" />
      </Tabs>
    </Paper>
    <TabContainer>
      {tab === 0 &&
        dialog === 'login' && (
          <LoginFormContainer
            handleLogIn={handleLogIn}
            handleMessageNew={handleMessageNew}
            handleRequestClose={handleRequestClose}
            handleRequestOpen={handleRequestOpen}
          />
        )}
      {tab === 0 &&
        dialog === 'forgot' && (
          <ForgotFormContainer
            handleMessageNew={handleMessageNew}
            handleRequestClose={handleRequestClose}
            handleRequestOpen={handleRequestOpen}
          />
        )}
      {tab === 1 && (
        <SignupFormContainer
          handleLogIn={handleLogIn}
          handleMessageNew={handleMessageNew}
          handleRequestClose={handleRequestClose}
          handleRequestOpen={handleRequestOpen}
        />
      )}
    </TabContainer>
  </div>
);

AccountMobile.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogIn: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  tab: PropTypes.number.isRequired,
};

export default withStyles(styles)(AccountMobile);
