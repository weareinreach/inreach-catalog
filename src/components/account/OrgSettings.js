import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import OrgSettingsInfo from './OrgSettingsInfo';
import OrgSettingsHour from './OrgSettingsHour';
import OrgSettingsAdditional from './OrgSettingsAdditional';

import AsylumConnectButton from '../AsylumConnectButton';

const styles = theme => ({
  root: {
    width: '43%',
    padding: '0 5% 0 5%'
  },
  formType: {
    margin: '10% 0 10% 0'
  },
  extraMargin: {
    margin: '20px 0 20px 0'
  },
  settingsTypeFont: {
    marginRight: '20px',
    lineHeight: '1.6',
    fontSize: 13,
    fontWeight: 700,
    fontFamily: "\"Open Sans\", sans-serif",
    color: theme.palette.common.lightBlack,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer'
  },
});

class OrgSettings extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography type='display3' className={classes.formType}>Your Organization</Typography>
        <OrgSettingsInfo />
        <OrgSettingsHour />
        <OrgSettingsAdditional />
        <AsylumConnectButton variant='primary'>request change</AsylumConnectButton>
        <Typography type='body1' className={classes.extraMargin}>All organization changes are subject to review by AsylumConnect before publication</Typography>
        <div className={classes.settingsTypeFont}>
          <span>Thank you for your request! All changes will be review by the AsylumConnect team and verification permitting, published as soon as possible. Question? Please email <a>catalog@asylumconnect.org</a>.</span>
        </div>
      </div>
    )
  }
}

OrgSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrgSettings);