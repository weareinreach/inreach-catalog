import React from 'react';
import MaskedInput from 'react-text-mask';

import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

// Define a custom style
const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  inputLabel: {
    marginTop: '20px',
    '& label': theme.custom.inputLabel,
    '& div': {
      marginTop: '23px'
    },
    '& input': theme.custom.inputText
  },
  inputWithMask: {
    color: 'red'
  }
});

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

class OrgSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneTextMask: '(  )   -   '
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  render() {
    console.log(this.props)
    const classes = this.props;
    return (
      <div>
        <Typography type='display3'>Your Organization</Typography>
        <form className={classes.form}>  
          <TextField
            className={classes.inputLabel}
            label='About:'
            InputLabelProps={{
              shrink: true,
            }}
            placeholder='Hint text'
          />
          <TextField
            className={classes.inputLabel}
            label='Who it helps:'
            InputLabelProps={{
              shrink: true,
            }}
            placeholder='Population'
          />
          <TextField
            className={classes.inputLabel}
            label='Websites:'
            InputLabelProps={{
              shrink: true,
            }}
            placeholder='URL'
          />
          <FormControl>
            <InputLabel 
              children='Phone number:'
              shrink />
            <Input
              name='phoneTextMask'
              value={this.state.textmask}
              inputComponent={TextMaskCustom}
              onChange={this.handleChange}
            />
          </FormControl>
          <TextField
            className={classes.inputLabel}
            label='Address:'
            InputLabelProps={{
              shrink: true,
            }}
            placeholder='Address'
          />
        </form>
      </div>
    );
  }
}

OrgSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrgSettings);
