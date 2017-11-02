import React from 'react';
import MaskedInput from 'react-text-mask';

import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

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
  },
});

class OrgSettingsInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '(  )   -   ',
      name: '',
      description: '',
      address: '', 
      website: ''
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  componentWillReceiveProps(nextProps){
    if (nextProps.isRequested) {
      const { phone, name, description, address, website } = this.state;      
      let data = {phone, name, description, address, website};
      this.props.handleCollectInfoData(data)
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography type="display2" className={classes.formTitle}>Title</Typography>
        <form className={classes.form}>
          <TextField
            className={classes.inputLabel}
            label='About:'
            name='name'
            InputLabelProps={{
              shrink: true,
            }}
            placeholder='Hint text'
            onChange={this.handleChange}
          />
          <TextField
            className={classes.inputLabel}
            label='Who it helps:'
            name='description'
            InputLabelProps={{
              shrink: true,
            }}
            placeholder='Population'
            onChange={this.handleChange}
          />
          <TextField
            className={classes.inputLabel}
            label='Websites:'
            name='website'
            InputLabelProps={{
              shrink: true,
            }}
            placeholder='URL'
            onChange={this.handleChange}
          />
          <FormControl className={classes.inputLabel}>
            <InputLabel 
              children='Phone number:'
              shrink />
            <Input
              name='phone'
              value={this.state.textmask}
              inputComponent={TextMaskCustom}
              onChange={this.handleChange}
            />
          </FormControl>
          <TextField
            className={classes.inputLabel}
            label='Address:'
            name='address'
            InputLabelProps={{
              shrink: true,
            }}
            placeholder='Address'
            onChange={this.handleChange}
          />
        </form>
      </div>
    )
  }
}

OrgSettingsInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  handleCollectInfoData: React.PropTypes.func
};

export default withStyles(styles)(OrgSettingsInfo);