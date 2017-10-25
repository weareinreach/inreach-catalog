import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

import OrgSettings from './OrgSettings';
import GeneralSettings from './GeneralSettings';

import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    padding: '5% 0 5% 0',
    display: 'flex',
    flexDirection: 'column',
    '& > h1': {
      textAlign: 'center'  
    }
  },
  formRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline'
  }
});

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography type="display1">Your Account</Typography>
        <Typography type="display2">Organization</Typography>
        <div className={classes.formRow}>
          <OrgSettings />
          <GeneralSettings />
        </div>
      </div>
  )}
}

AccountPage.propTypes = {
};

export default withStyles(styles)(AccountPage);
