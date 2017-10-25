import React from 'react';
import MaskedInput from 'react-text-mask';

import GeneralSettingsEmail from './GeneralSettingsEmail';
import GeneralSettingsPassword from './GeneralSettingsPassword';

import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';

function TextMaskCustom(props) {
  return (
    <MaskedInput
      {...props}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

const styles = theme => ({
  root: {
    width: '30%',
    padding: '0 5% 0 5%'
  },
  formType: {
    margin: '10% 0 10% 0'
  },
  settingsTypeFont: {
    padding: '15px 0 25px 0',
    fontSize: 13,
    fontWeight: 700,
    fontFamily: "\"Open Sans\", sans-serif",
    letterSpacing: "-.02em",
    color: theme.palette.primary[500]
  },
});

class GeneralSettings extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this)
  }
  
  handleDelete() {
    return "Delete"
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography type="display3" className={classes.formType}>Your Account</Typography>
        <div>
          <GeneralSettingsEmail />
          <GeneralSettingsPassword />
          <div><div onClick={this.handleDelete} className={classes.settingsTypeFont}>
            <span>Delete Account</span>
          </div></div>
        </div>
      </div>
    )
  }
}

GeneralSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GeneralSettings);