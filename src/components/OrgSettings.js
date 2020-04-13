import React from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update';

import {withStyles} from '@material-ui/core/styles';
import {boldFont, breakpoints} from '../theme';
import Typography from '@material-ui/core/Typography';

import Loading from './Loading';
import OrgSettingsInfo from './OrgSettingsInfo';
import AsylumConnectButton from './AsylumConnectButton';
import {createSuggestion} from '../utils/api';

const styles = (theme) => ({
  root: {
    width: '43%',
    padding: '0 5% 0 5%',
  },
  formType: {
    marginTop: '10%',
  },
  [`@media (max-width: ${breakpoints['sm']}px)`]: {
    root: {
      width: 'auto',
      padding: '0',
    },
    formType: {
      margin: '2% 0 2% 0',
    },
  },
  extraMargin: {
    margin: '20px 0 20px 0',
  },
  settingsTypeFont: {
    marginRight: '20px',
    lineHeight: '1.6',
    fontSize: 13,
    fontWeight: 700,
    fontFamily: '"Open Sans", sans-serif',
    color: theme.palette.common.lightBlack,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  note: {
    backgroundColor: '#fff3c6',
    padding: '10px',
    marginTop: '10px',
  },
  boldFont: boldFont(theme),
});

class OrgSettings extends React.Component {
  constructor(props) {
    super(props);

    const {alert_message, description, name, website} =
      props?.affiliation || {};

    this.state = {
      isLoading: false,
      isSent: false,
      orgData: {...{alert_message, description, name, website}},
      selectedDays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(parent, name, value) {
    const {orgData} = this.state;
    let updatedOrgData;
    if (parent === 'schedule') {
      updatedOrgData = update(orgData, {
        locations: {0: {schedule: {$merge: {[name]: value}}}},
      });
      this.setState({orgData: updatedOrgData});
    } else if (parent === 'address') {
      updatedOrgData = update(orgData, {
        locations: {0: {$merge: {[name]: value}}},
      });
      this.setState({orgData: updatedOrgData});
    } else if (parent === 'phones') {
      updatedOrgData = update(orgData, {
        locations: {0: {phones: {0: {$merge: {[name]: value}}}}},
      });
      this.setState({orgData: updatedOrgData});
    } else {
      updatedOrgData = update(orgData, {$merge: {[name]: value}});
      this.setState({orgData: updatedOrgData});
    }
  }
  handleSelect(select, value, startValue, endValue) {
    const {selectedDays} = this.state;
    let updatedSelectedDays;
    if (select === 'select') {
      updatedSelectedDays = update(selectedDays, {
        $merge: {[value]: !selectedDays[value]},
      });
    } else {
      updatedSelectedDays = update(selectedDays, {
        $merge: {[value.split('_')[0]]: true},
      });
    }
    this.setState({selectedDays: updatedSelectedDays});
  }
  handleClick() {
    const {alert_message, description, name, website} =
      this.state?.orgData || {};

    const suggestions = [];
    const sharedValues = {
      organizationId: this.props?.affiliation?._id,
      userEmail: this.props?.userData?.email,
    };

    if (
      alert_message &&
      alert_message !== this.props?.affiliation?.alert_message
    ) {
      suggestions.push({
        ...sharedValues,
        field: 'Alert Message',
        value: alert_message,
      });
    }

    if (description && description !== this.props?.affiliation?.description) {
      suggestions.push({
        ...sharedValues,
        field: 'Description',
        value: description,
      });
    }

    if (name && name !== this.props?.affiliation?.name) {
      suggestions.push({...sharedValues, field: 'Name', value: name});
    }

    if (website && website !== this.props?.affiliation?.website) {
      suggestions.push({...sharedValues, field: 'Website', value: website});
    }

    if (suggestions.length > 0) {
      createSuggestion(suggestions)
        .then(() => {
          this.setState({isSent: true});
        })
        .catch((error) => {
          this.props.handleMessageNew(
            'Oops! Something went wrong. Error:' + error
          );
        });
    }
  }
  render() {
    const {classes} = this.props;
    const {
      orgData,
      // selectedDays,
      isLoading,
      isSent,
    } = this.state;
    const {
      alert_message,
      description,
      // locations,
      name,
      // phones,
      // region,
      // schedules,
      website,
    } = orgData;
    // let address = locations?.[0] || {};
    // let schedule = schedules?.[0] || {};

    return (
      <div className={classes.root}>
        <Typography variant="h5" className={classes.formType}>
          Your Organization
        </Typography>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            {/* TODO: Add this check back into the API / Control Panel */}
            {/* TODO: {orgData.has_pending_submission ? */}
            {false && (
              <div className={classes.note}>
                <Typography type="body1">
                  We are still reviewing your recent edits. Below reflects the
                  current live data on the site, and once we confirm your
                  requested changes, they will be live on the site in 1-3 days.
                </Typography>
              </div>
            )}
            <OrgSettingsInfo
              // address={address}
              alert_message={alert_message}
              description={description}
              name={name}
              onChange={this.handleChange}
              // phones={phones}
              // region={region}
              website={website}
            />

            {/* <OrgSettingsHour
              schedule={schedule}
              selectedDays={selectedDays}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
            /> */}

            {!isSent ? (
              <div>
                <AsylumConnectButton
                  variant="secondary"
                  onClick={this.handleClick}
                >
                  request change
                </AsylumConnectButton>
                <Typography type="body1" className={classes.extraMargin}>
                  All organization changes are subject to review by
                  AsylumConnect before publication
                </Typography>
              </div>
            ) : (
              <div className={classes.settingsTypeFont}>
                <span>
                  Thank you for your request! All changes will be review by the
                  AsylumConnect team and verification permitting, published as
                  soon as possible. Question? Please email{' '}
                  <a
                    href="mailto:catalog@asylumconnect.org"
                    className={classes.boldFont}
                  >
                    catalog@asylumconnect.org
                  </a>
                  .
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

OrgSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrgSettings);
