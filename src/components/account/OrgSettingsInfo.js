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
    marginTop: '10%'
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
    //const { phone, description, address, website, name, target } = this.props.initialData;
    this.state = {
      phone: this.props.initialData && this.props.initialData.phone? this.props.initialData.phone : '(  )   -   ',
      description: this.props.initialData && this.props.initialData.description? this.props.initialData.description : '',
      address: this.props.initialData && this.props.initialData.address? this.props.initialData.address : '', 
      website: this.props.initialData && this.props.initialData.website? this.props.initialData.website : '',
      name: this.props.initialData && this.props.initialData.name? this.props.initialData.name : '',
      region: this.props.initialData && this.props.initialData.region? this.props.initialData.region : '',
      city: this.props.initialData && this.props.initialData.city? this.props.initialData.city : '', 
      state: this.props.initialData && this.props.initialData.state? this.props.initialData.state : '', 
      zip_code: this.props.initialData && this.props.initialData.zip_code? this.props.initialData.zip_code : '',
      target: '',
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
      const { phone, name, description, address, website,  city, state, zip_code, region } = this.state;
      let data = {phone: phone == '(  )   -   '? '':phone, name, description, address, website, city, state, zip_code, region};
      this.props.handleCollectInfoData(data)
    }
  }
  render() {
    const { classes, isSuggestion } = this.props;
    const { phone, description, address, website, name, target, region, city, state, zip_code } = this.state;
    return (
      <div className={classes.root}>
        <form className={classes.form}>
        { !isSuggestion ? (
          <Typography type="display2" className={classes.formType}>{name}</Typography>
          ):(
            <TextField
              className={classes.inputLabel}
              label='Name:'
              name='name'
              value={name}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder='Hint text'
              onChange={this.handleChange}
            />
          )
        }
          <TextField
            className={classes.inputLabel}
            label='About:'
            name='description'
            value={description}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder='Hint text'
            onChange={this.handleChange}
          />
          <TextField
            className={classes.inputLabel}
            label='Who it helps:'
            name='target'
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
            value={website}
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
              value={phone}
              inputComponent={TextMaskCustom}
              onChange={this.handleChange}
            />
          </FormControl>
          <TextField
            className={classes.inputLabel}
            label='Address:'
            name='address'
            value={address}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder='Address'
            onChange={this.handleChange}
          />
          <TextField
            className={classes.inputLabel}
            label='Region:'
            name='region'
            value={region}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder='Region'
            onChange={this.handleChange}
          />
          <TextField
            className={classes.inputLabel}
            label='City:'
            name='city'
            value={city}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder='City'
            onChange={this.handleChange}
          />
          <TextField
            className={classes.inputLabel}
            label='State:'
            name='state'
            value={state}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder='State'
            onChange={this.handleChange}
          />
          <TextField
            className={classes.inputLabel}
            label='Zip code:'
            name='zip_code'
            value={zip_code}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder='Zip code'
            onChange={this.handleChange}
          />
        </form>
      </div>
    )
  }
}

OrgSettingsInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  info: PropTypes.object,
  handleCollectInfoData: React.PropTypes.func
};

export default withStyles(styles)(OrgSettingsInfo);