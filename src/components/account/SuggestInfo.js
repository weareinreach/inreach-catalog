import React from 'react';
import MaskedInput from 'react-text-mask';
import update from 'react-addons-update';

import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Input, {InputLabel} from 'material-ui/Input';
import {FormControl} from 'material-ui/Form';
import {searchInput, searchInputMobile} from '../../theme';

import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

import AsylumConnectCheckbox from '../AsylumConnectCheckbox';
import PlacesAutocomplete from 'react-places-autocomplete';
import SuggestInfoNonEngServices from './SuggestInfoNonEngServices';

function TextMaskCustom(props) {
  return (
    <MaskedInput
      {...props}
      mask={[
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

const styles = theme => ({
  root: {},
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
    '&>div': {
      marginTop: '20px'
    },
    '& input': theme.custom.inputText
  },
  settingsTypeFont: {
    fontSize: 13,
    fontWeight: 700,
    fontFamily: '"Open Sans", sans-serif',
    letterSpacing: '-.02em',
    color: theme.palette.secondary[500],
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer'
  },
  inputAddressLabel: {
    '& label': theme.custom.inputLabel,
    '&>div': {
      marginTop: '40px'
    }
  },
  searchInput: searchInput(theme),
  [theme.breakpoints.down('xs')]: {
    searchInput: searchInputMobile(theme)
  },
  searchInputContainer: {
    position: 'relative'
  },
  placesContainer: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    position: 'absolute',
    zIndex: '20',
    top: 'calc(100% - 1.5rem)',
    width: '100%',
    right: '0',
    left: '0',
    '& div': theme.custom.inputText
  },
  container: {
    flexGrow: 1,
    position: 'relative',
    height: 200
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  textField: {
    width: '100%'
  }
});

class SuggestInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleToggleDropDown = this.handleToggleDropDown.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handleChangeAutoAddress = this.handleChangeAutoAddress.bind(this);
    this.handleServiceSelect = this.handleServiceSelect.bind(this);
    this.handleServiceDelete = this.handleServiceDelete.bind(this);
  }
  handleChange(e) {
    const {name, value} = e.target;
    this.props.handleChangeGeneralInfo(name, value);
  }
  handleChangePhone(e) {
    const {name, value} = e.target;
    this.props.handleChangePhone(name, value);
  }
  handleChangeEmail(e) {
    const {name, value} = e.target;
    this.props.handleChangeEmail(name, value);
  }
  handleChangeAutoAddress(address) {
    this.props.handleSelectAddress(address);
  }
  handleToggleDropDown() {
    this.setState({open: !this.state.open});
  }
  handlePlaceSelect(address) {
    this.props.handleSelectAddress(address);
  }
  handleServiceSelect(service) {
    if (!this.props.nonEngServices.includes(service)) {
      this.props.handleSelectNonEngServices('add', service, 0);
    }
  }
  handleServiceDelete(service) {
    const index = this.props.nonEngServices.findIndex(s => {
      return s == service;
    });
    if (index >= 0) {
      this.props.handleSelectNonEngServices('remove', service, index);
    }
  }
  render() {
    const {
      classes,
      name,
      website,
      description,
      address,
      emails,
      notes,
      digits,
      nonEngServices,
      t,
      locale,
      country
    } = this.props;

    const inputPropsAutoAddress = {
      value: address,
      onChange: this.handleChangeAutoAddress,
      type: 'text',
      placeholder: t('Start typing address, city or zip code in the US…'),
      name: 'search--near',
      id: 'search--near'
    };
    const options = {
      componentRestrictions: {
        country: typeof country == 'string' ? country.toLowerCase() : 'us'
      }
    };
    const cssClasses = {
      root: classes.searchInputContainer,
      input: classes.searchInput,
      autocompleteContainer: classes.placesContainer
    };
    return (
      <div className={classes.root}>
        <form className={classes.form}>
          <TextField
            className={classes.inputLabel}
            label="Resource Name:"
            name="name"
            value={name}
            InputLabelProps={{
              shrink: true
            }}
            placeholder="Resource Name"
            onChange={this.handleChange}
          />
          <FormControl className={classes.inputAddressLabel}>
            <InputLabel children="Address:" shrink />
            <PlacesAutocomplete
              onSelect={this.handlePlaceSelect}
              onEnterKeyDown={this.handlePlaceSelect}
              inputProps={inputPropsAutoAddress}
              classNames={cssClasses}
              options={options}
            />
          </FormControl>
          <TextField
            className={classes.inputLabel}
            label="About:"
            name="description"
            value={description}
            multiline={true}
            InputLabelProps={{
              shrink: true
            }}
            placeholder="Short description of resource"
            onChange={this.handleChange}
          />
          {/* <TextField
            className={classes.inputLabel}
            label='Who it helps:'
            name='target'
            InputLabelProps={{
              shrink: true,
            }}
            placeholder='Population(s) served'
            onChange={this.handleChange}
          /> */}
          {/* Age Range */}
          {/* <div>
            <div onClick={this.handleToggleDropDown} className={classes.settingsTypeFont}>
              <span>Age range(s) served:</span>
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </div>
            <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
              <div>
                <AsylumConnectCheckbox 
                  label='Infants (0-3)' 
                  value='infants'
                  onChange={(ref)=>{return ref}}
                  checked={false} />
                <AsylumConnectCheckbox 
                  label='Kids (4-12)' 
                  value='kids'
                  onChange={(ref)=>{return ref}}
                  checked={false} />
                <AsylumConnectCheckbox 
                  label='Infants (0-3)' 
                  value='infants'
                  onChange={(ref)=>{return ref}}
                  checked={false} />
                <AsylumConnectCheckbox 
                  label='Teens (13-17)' 
                  value='teens'
                  onChange={(ref)=>{return ref}}
                  checked={false} />
                <AsylumConnectCheckbox 
                  label='Young Adults (18-24)' 
                  value='youth'
                  onChange={(ref)=>{return ref}}
                  checked={false} />
                <AsylumConnectCheckbox 
                  label='Adults (25-64)' 
                  value='adult'
                  onChange={(ref)=>{return ref}}
                  checked={false} />
                <AsylumConnectCheckbox 
                  label='Seniors (65+)' 
                  value='senior'
                  onChange={(ref)=>{return ref}}
                  checked={false} />
                <AsylumConnectCheckbox 
                  label='All Ages' 
                  value='all'
                  onChange={(ref)=>{return ref}}
                  checked={false} />
              </div>
            </Collapse>
          </div> */}
          <FormControl className={classes.inputAddressLabel}>
            <InputLabel children="Non-English Service(s):" shrink />
            <SuggestInfoNonEngServices
              services={nonEngServices}
              handleClick={this.handleServiceSelect}
              handleDelete={this.handleServiceDelete}
            />
          </FormControl>
          <TextField
            className={classes.inputLabel}
            label="Websites:"
            name="website"
            value={website}
            InputLabelProps={{
              shrink: true
            }}
            placeholder="URL"
            onChange={this.handleChange}
          />
          <FormControl className={classes.inputLabel}>
            <InputLabel children="Phone number:" shrink />
            <Input
              name="digits"
              value={digits}
              inputComponent={TextMaskCustom}
              onChange={this.handleChangePhone}
            />
          </FormControl>
          <TextField
            className={classes.inputLabel}
            label="Email:"
            name="email"
            type="text"
            value={emails.join(', ')}
            InputLabelProps={{
              shrink: true
            }}
            placeholder="Contact email(s) for resource"
            onChange={this.handleChangeEmail}
          />
        </form>
      </div>
    );
  }
}

SuggestInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  info: PropTypes.object,
  handleCollectInfoData: PropTypes.func
};

export default withStyles(styles)(SuggestInfo);
