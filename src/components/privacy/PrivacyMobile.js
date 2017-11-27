import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import DisclaimerText from './DisclaimerText';
import PrivacyText from './PrivacyText';

const TabContainer = ({ children }) => (
  <div style={{ padding: '2.5rem' }}>
    {children}
  </div>
);

TabContainer.propTypes = { children: PropTypes.node.isRequired };

const styles = theme => ({
  root: {
    flexGrow: 1 ,
    marginLeft: "2.5em",
    marginRight: "2.5em",
    borderBottom: "1px solid "+theme.palette.common.faintBlack,
    boxShadow: "none"
  },
  textCenter: { textAlign: 'center' },
});

const PrivacyMobile = ({classes, handleRequestOpen, tab}) => (
  <div>
    <Paper className={classes.root}>
      <Typography className={classes.textCenter} type="display1">
        {tab === 0 && 'Privacy Statement' }
        {tab === 1 && 'AC Disclaimer' }
      </Typography>
      <Tabs
        value={tab}
        onChange={(e, tab) => handleRequestOpen(tab === 0 ? 'privacy' : 'disclaimer')}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="PRIVACY" />
        <Tab label="DISCLAIMER" />
      </Tabs>
    </Paper>
    <TabContainer>
      {tab === 0 && <DisclaimerText /> }
      {tab === 1 && <PrivacyText /> }
    </TabContainer>
  </div>
);

PrivacyMobile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrivacyMobile);
