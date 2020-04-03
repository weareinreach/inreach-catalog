import React from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update';

import {withStyles} from '@material-ui/core/styles';
import {boldFont, breakpoints} from '../theme';
import Typography from '@material-ui/core/Typography';

import Loading from './Loading';
import OrgSettingsInfo from './OrgSettingsInfo';
import OrgSettingsHour from './OrgSettingsHour';

import AsylumConnectButton from './AsylumConnectButton';

import config from '../config';
import fetchJsonp from 'fetch-jsonp';

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
    this.state = {
      isLoading: true,
      isSent: false,
      orgData: {},
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

  componentDidMount() {
    // const {user, handleMessageNew} = this.props;
    // const apiDomain = config[process.env.OD_API_ENV].odrs;
    // const url = `${apiDomain}organizations/${user.affiliation.fetchable_id}.jsonp?`;
    // const apiKeyParam = `api_key=${config[process.env.OD_API_ENV].odApiKey}`;
    //
    // fetchJsonp(url + apiKeyParam)
    //   .then(response => {
    //     if (response.ok) {
    //       response.json().then(orgData => {
    //         // Add properties array as submission requirement
    //         /*orgData.properties = [
    //           {
    //               "name": "approval-asylumconnect",
    //               "value": "false"
    //           },
    //           {
    //               "name": "source-name",
    //               "value": "asylumconnect"
    //           },
    //           {
    //               "name": "community-asylum-seeker",
    //               "value": "true"
    //           },
    //           {
    //               "name": "community-lgbt",
    //               "value": "true"
    //           }
    //         ]*/
    //         this.setState({orgData, isLoading: false});
    //         // Capture selected day
    //         if (
    //           orgData.locations &&
    //           orgData.locations[0] &&
    //           orgData.locations[0].schedule
    //         ) {
    //           let selectedDays;
    //           const {schedule} = orgData.locations[0];
    //           for (let day in schedule) {
    //             // if initial hour field is empty, checkbox of the day will be unchecked initially
    //             if (schedule[day]) {
    //               selectedDays = update(this.state.selectedDays, {
    //                 $merge: {[day.split('_')[0]]: true}
    //               });
    //             } else {
    //               selectedDays = update(this.state.selectedDays, {
    //                 $merge: {[day.split('_')[0]]: false}
    //               });
    //             }
    //           }
    //           this.setState({selectedDays});
    //         }
    //       });
    //     } else {
    //       handleMessageNew('Sorry, please try logging in again');
    //     }
    //   })
    //   .catch(error => {
    //     handleMessageNew('Oops! Something went wrong. Error:' + error);
    //   });
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
    // const {orgData, selectedDays} = this.state;
    // const {user, handleMessageNew} = this.props;
    // // Remove unselected time in schedule object
    // let {schedule} = orgData.locations[0];
    // let updatedOrgData;
    // for (let timeKey in schedule) {
    //   let day = timeKey.split('_')[0];
    //   if (!selectedDays[day]) {
    //     schedule = update(schedule, {$merge: {[timeKey]: ''}});
    //   }
    // }
    // updatedOrgData = update(orgData, {
    //   locations: {0: {schedule: {$merge: schedule}}}
    // });
    // // Submit
    // const payload = {
    //   api_key: config[process.env.OD_API_ENV].odApiKey,
    //   submission: {
    //     resource_id: updatedOrgData.id,
    //     resource_type: 'Organization',
    //     client_user_id: user.id,
    //     content: JSON.stringify(updatedOrgData),
    //     submitter_type: 'PublicForm'
    //   }
    // };
    // fetch(window.location.origin + '/api/submissions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json; charset=UTF-8'
    //   },
    //   body: JSON.stringify(payload)
    // }).then(response => {
    //   if (response.status === 200) {
    //     this.setState({isSent: true});
    //     handleMessageNew('Your information has been submitted for reviewing.');
    //   } else {
    //     handleMessageNew('Oops! Something went wrong.');
    //   }
    // });
  }
  render() {
    const {classes} = this.props;
    const {orgData, selectedDays, isLoading, isSent} = this.state;
    let schedule =
      orgData && orgData.locations && orgData.locations[0]
        ? orgData.locations[0].schedule
        : {};
    let name = orgData && orgData.name ? orgData.name : '';
    let website = orgData && orgData.website ? orgData.website : '';
    let region = orgData && orgData.region ? orgData.region : '';
    let description = orgData && orgData.description ? orgData.description : '';
    let address =
      orgData && orgData.locations && orgData.locations[0]
        ? orgData.locations[0]
        : {};
    return (
      <div className={classes.root}>
        <Typography variant="h5" className={classes.formType}>
          Your Organization
        </Typography>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            {orgData.has_pending_submission ? (
              <div className={classes.note}>
                <Typography type="body1">
                  We are still reviewing your recent edits. Below reflects the
                  current live data on the site, and once we confirm your
                  requested changes, they will be live on the site in 1-3 days.
                </Typography>
              </div>
            ) : (
              ''
            )}

            <OrgSettingsInfo
              name={name}
              website={website}
              region={region}
              description={description}
              address={address}
              onChange={this.handleChange}
            />

            <OrgSettingsHour
              schedule={schedule}
              selectedDays={selectedDays}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
            />

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
