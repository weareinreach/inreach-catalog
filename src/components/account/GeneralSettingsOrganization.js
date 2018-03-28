import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { createAffiliation } from '../../helpers/odasRequests';

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
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    '& > div': {
      margin: '15px 0 15px 0',
    },
  },
  formType: {
    margin: '10% 0 10% 0',
  },
});

class GeneralSettingsOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleToggleDropDown = this.handleToggleDropDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {}

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleToggleDropDown() {
    this.setState(prevState => ({ open: !prevState.open }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const { handleMessageNew, organizationSelection, session } = this.props;
    if (organizationSelection === null) {
      handleMessageNew('Please select an organization');
    } else {
      const { id, name } = organizationSelection;
      createAffiliation({ id, name }, session)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
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
          {!affiliation && (
            <Typography>You are not affiliated to an organization.</Typography>
          )}
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <OrganizationAutocomplete
              handleBlurOrganizations={this.props.handleBlurOrganizations}
              handleMessageNew={this.props.handleMessageNew}
              handleOrganizationSearchChange={this.props.handleOrganizationSearchChange}
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
            <AsylumConnectButton variant="primary">
              Change Organization
            </AsylumConnectButton>
          </form>
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
  organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
  organizationSearch: PropTypes.string.isRequired,
  organizationSelection: PropTypes.object,
  session: PropTypes.string.isRequired,
};

export default withStyles(styles)(withOrganizations(GeneralSettingsOrganization));
