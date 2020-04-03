import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import ForgotFormContainer from './ForgotFormContainer';
import LoginFormContainer from './LoginFormContainer';
import SignupFormContainer from './SignupFormContainer';
import withWidth from './withWidth';
import {breakpoints} from '../theme';

const TabContainer = ({children, width}) => {
  const isMobile = width < breakpoints['sm'];
  const tabPadding = isMobile ? '.5rem 1.5rem' : '2.5rem';

  return <div style={{padding: tabPadding}}>{children}</div>;
};

TabContainer.propTypes = {children: PropTypes.node.isRequired};

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: '2.5em',
    marginRight: '2.5em',
    borderBottom: '1px solid ' + theme.palette.common.faintBlack,
    boxShadow: 'none',
  },
  textCenter: {textAlign: 'center'},
});

const AccountMobile = ({
  classes,
  dialog,
  handleLogIn,
  handleMessageNew,
  handleRequestClose,
  handleRequestOpen,
  session,
  tab,
  width,
}) => (
  <div>
    <Paper className={classes.root}>
      <Typography className={classes.textCenter} variant="h3">
        {tab === 0 && 'Log In'}
        {tab === 1 && 'Sign Up'}
      </Typography>
      <Tabs
        value={tab}
        onChange={(e, tab) => handleRequestOpen(tab === 0 ? 'login' : 'signup')}
        indicatorColor="secondary"
        textColor="secondary"
        centered
      >
        <Tab label="LOG IN" />
        <Tab label="SIGN UP" />
      </Tabs>
    </Paper>
    <TabContainer width={width}>
      {tab === 0 && dialog === 'login' && (
        <LoginFormContainer
          handleLogIn={handleLogIn}
          handleMessageNew={handleMessageNew}
          handleRequestClose={handleRequestClose}
          handleRequestOpen={handleRequestOpen}
        />
      )}
      {tab === 0 && dialog === 'forgot' && (
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
          session={session}
        />
      )}
    </TabContainer>
  </div>
);

AccountMobile.defaultProps = {
  session: null,
};

AccountMobile.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogIn: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  session: PropTypes.string,
  tab: PropTypes.number.isRequired,
};

export default withStyles(styles)(withWidth(AccountMobile));
