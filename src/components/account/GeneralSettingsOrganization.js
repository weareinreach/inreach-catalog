import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import AsylumConnectButton from '../AsylumConnectButton';

const styles = theme => ({
  root: {
    width: '30%',
    padding: '0 5% 0 5%',
  },
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
  inputLabel: {
    '& label': theme.custom.inputLabel,
    '& div': {
      marginTop: '20px',
    },
    '& input': theme.custom.inputText,
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
    const { handleMessageNew } = this.props;
    handleMessageNew('submit');
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
};

GeneralSettingsOrganization.propTypes = {
  affiliation: PropTypes.shape({}),
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GeneralSettingsOrganization);
