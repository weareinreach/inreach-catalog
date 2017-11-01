import React from 'react';

import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

import AsylumConnectButton from '../AsylumConnectButton';

const styles = theme => ({
  root: {
    width: '30%',
    padding: '0 5% 0 5%'
  },
  settingsTypeFont: {
    padding: '15px 0 25px 0',
    fontSize: 13,
    fontWeight: 700,
    fontFamily: "\"Open Sans\", sans-serif",
    letterSpacing: "-.02em",
    color: theme.palette.primary[500],
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    '& > div': {
      margin: '15px 0 15px 0'
    }
  },
  formType: {
    margin: '10% 0 10% 0'
  },
  inputLabel: {
    '& label': theme.custom.inputLabel,
    '& div': {
      marginTop: '20px'
    },
    '& input': theme.custom.inputText
  }
});

class GeneralSettingsEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      currentEmail: '',
      newEmail: '',
      confirmedEmail: ''
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleToggleDropDown = this.handleToggleDropDown.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.currentEmail !== this.props.currentEmail) {
      this.setState({ 
        currentEmail: nextProps.currentEmail,
        newEmail: '',
        confirmedEmail: ''
      })
    }
  }  

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  
  handleToggleDropDown() {
    this.setState({ open: !this.state.open });
  };

  handleSubmit(e) {
    e.preventDefault();
    const { currentEmail, newEmail, confirmedEmail } = this.state
    if (!currentEmail || !newEmail || !confirmedEmail) {
      console.log("Missing email")
    }

    if (currentEmail && newEmail && confirmedEmail) {
      if (newEmail === confirmedEmail) {
        this.props.handleUpdateAccount(newEmail)
      }
    }
  }
  
  render() {
    const { classes } = this.props;
    const { currentEmail, newEmail, confirmedEmail } = this.state
    return (
      <div>
        <div onClick={this.handleToggleDropDown} className={classes.settingsTypeFont}>
            <span>Change Email Address</span>
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </div>
        <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <TextField
              className={classes.inputLabel}
              name="currentEmail"
              type="email"
              label='*Enter Old Email Address:'
              value={currentEmail}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder='Hint text'
              onChange={this.handleChange}
            />
            <TextField
              className={classes.inputLabel}
              name="newEmail"
              type="email"
              label='*Enter New Email Address:'
              value={newEmail}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder='Hint text'              
              onChange={this.handleChange}
            />
            <TextField
              className={classes.inputLabel}
              name="confirmedEmail"
              type="email"
              label='*Confirm New Email Address:'
              value={confirmedEmail}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder='Hint text'              
              onChange={this.handleChange}
            />
            <div><AsylumConnectButton variant="primary">Change Email Address</AsylumConnectButton></div>
          </form>
        </Collapse>
      </div>
    )
  }
}

GeneralSettingsEmail.propTypes = {
  classes: PropTypes.object.isRequired,
  currentEmail: PropTypes.string
};

export default withStyles(styles)(GeneralSettingsEmail);