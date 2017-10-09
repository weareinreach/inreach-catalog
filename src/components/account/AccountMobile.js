import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

const TabContainer = ({ children }) => (
  <div style={{ padding: '2.5rem' }}>
    {children}
  </div>
);

TabContainer.propTypes = { children: PropTypes.node.isRequired };

const styles = theme => ({
  root: { flexGrow: 1 },
  textCenter: { textAlign: 'center' },
});

const AccountMobile = ({classes, handleRequestOpen, tab}) => (
  <div>
    <Paper className={classes.root}>
      <Typography className={classes.textCenter} type="display1">
        {tab === 0 && 'Log In' }
        {tab === 1 && 'Sign Up' }
      </Typography>
      <Tabs
        value={tab}
        onChange={(e, tab) => handleRequestOpen(tab === 0 ? 'login' : 'signup')}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="LOG IN" />
        <Tab label="SIGN UP" />
      </Tabs>
    </Paper>
    <TabContainer>
      {/*
      {tab === 0 && <DisclaimerText /> }
      {tab === 1 && <PrivacyText /> }
      */}
    </TabContainer>
  </div>
);

AccountMobile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountMobile);
