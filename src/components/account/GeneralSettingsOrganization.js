import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  createAffiliation,
  deleteAffiliation,
} from '../../helpers/odasRequests';

import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import AsylumConnectButton from '../AsylumConnectButton';
import OrganizationAutocomplete from './OrganizationAutocomplete';
import withOrganizations from './withOrganizations';

const styles = theme => ({
  settingsTypeFont: {
    padding: '15px 0 25px 0',
    fontSize: 13,
    fontWeight: 700,
    fontFamily: '"Open Sans", sans-serif',
    letterSpacing: '-.02em',
    color: theme.palette.primary[500],
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer',
  },
  marginVertical: { margin: '1rem 0' },
});

class GeneralSettingsOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.handleAffiliationDelete = this.handleAffiliationDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggleDropDown = this.handleToggleDropDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAffiliationDelete() {
    const { handleMessageNew, handleUserUpdate, session } = this.props;
    deleteAffiliation(session)
      .then(response => {
        handleUserUpdate({ affiliation: null });
      })
      .catch(() => {
        handleMessageNew('Oops! Something went wrong.');
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleToggleDropDown() {
    this.setState(prevState => ({ open: !prevState.open }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      handleMessageNew,
      handleUserUpdate,
      organizationSelection,
      session,
    } = this.props;
    if (organizationSelection === null) {
      handleMessageNew('Please select an organization');
    } else {
      const { id, name } = organizationSelection;
      createAffiliation({ id, name }, session)
        .then(response =>
          handleUserUpdate({ affiliation: { fetchable_id: id } })
        )
        .catch(() => {
          handleMessageNew('Oops! Something went wrong.');
        });
    }
  }

  render() {
    const { affiliation, classes } = this.props;
    return (
      <div>
        <div
          onClick={this.handleToggleDropDown}
          className={classes.settingsTypeFont}
        >
          <span>Change Organization</span>
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </div>
        <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
          {affiliation ? (
            <div>
              <Typography>
                Before joining a new organzation, you must leave your current
                organization.
              </Typography>
              <AsylumConnectButton
                className={classes.marginVertical}
                onClick={this.handleAffiliationDelete}
                variant="primary"
              >
                Leave Organization
              </AsylumConnectButton>
            </div>
          ) : (
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <OrganizationAutocomplete
                handleBlurOrganizations={this.props.handleBlurOrganizations}
                handleMessageNew={this.props.handleMessageNew}
                handleOrganizationSearchChange={
                  this.props.handleOrganizationSearchChange
                }
                handleOrganizationSelect={this.props.handleOrganizationSelect}
                handleOrganizationsFetchRequested={
                  this.props.handleOrganizationsFetchRequested
                }
                handleOrganizationsClearRequested={
                  this.props.handleOrganizationsClearRequested
                }
                isLoadingOrganizations={this.props.isLoadingOrganizations}
                organizationSearch={this.props.organizationSearch}
                organizationSelection={this.props.organizationSelection}
                organizations={this.props.organizations}
              />
              <AsylumConnectButton
                className={classes.marginVertical}
                variant="primary"
              >
                Join Organization
              </AsylumConnectButton>
            </form>
          )}
        </Collapse>
      </div>
    );
  }
}

GeneralSettingsOrganization.defaultProps = {
  affiliation: null,
  organizationSelection: null,
};

GeneralSettingsOrganization.propTypes = {
  affiliation: PropTypes.shape({}),
  classes: PropTypes.object.isRequired,
  handleBlurOrganizations: PropTypes.func.isRequired,
  handleOrganizationSearchChange: PropTypes.func.isRequired,
  handleOrganizationSelect: PropTypes.func.isRequired,
  handleOrganizationsFetchRequested: PropTypes.func.isRequired,
  handleOrganizationsClearRequested: PropTypes.func.isRequired,
  handleUserUpdate: PropTypes.func.isRequired,
  organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
  organizationSearch: PropTypes.string.isRequired,
  organizationSelection: PropTypes.object,
  session: PropTypes.string.isRequired,
};

export default withStyles(styles)(
  withOrganizations(GeneralSettingsOrganization)
);
