import PropTypes from 'prop-types';
import React from 'react';
import MaskedInput from 'react-text-mask';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlaceIcon from '@material-ui/icons/Place';
import TextField from '@material-ui/core/TextField';
import PlacesAutocomplete from 'react-places-autocomplete';
import SuggestInfoNonEngServices from './SuggestInfoNonEngServices';

import {searchInput, searchInputMobile} from '../theme';

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
        /\d/,
      ]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

const styles = (theme) => ({
  root: {},
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    '& > div': {
      margin: '15px 0 15px 0',
    },
  },
  formType: {
    marginTop: '10%',
  },
  inputLabel: {
    '& label': theme.custom.inputLabel,
    '&>div': {
      marginTop: '20px',
    },
    '& input': theme.custom.inputText,
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
    cursor: 'pointer',
  },
  inputAddressLabel: {
    '& label': theme.custom.inputLabel,
    '&>div': {
      marginTop: '40px',
    },
  },
  searchInput: searchInput(theme),
  [theme.breakpoints.down('xs')]: {
    searchInput: searchInputMobile(theme),
  },
  searchInputContainer: {
    position: 'relative',
  },
  placesContainer: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    border: 'none',
    width: '100%',
    '& div': theme.custom.inputText,
  },
  placesContainer2: {
    padding: '20px',
  },
  container: {
    flexGrow: 1,
    position: 'relative',
    height: 200,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  textField: {
    width: '100%',
  },
});

class SuggestInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
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
    const index = this.props.nonEngServices.findIndex((s) => {
      return s === service;
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
      digits,
      nonEngServices,
      t,
      country,
    } = this.props;

    const searchOptions = {
      componentRestrictions: {
        country: typeof country === 'string' ? country.toLowerCase() : 'us',
      },
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
              shrink: true,
            }}
            placeholder="Resource Name"
            onChange={this.handleChange}
          />
          <FormControl className={classes.inputAddressLabel}>
            <InputLabel children="Address:" shrink />
            <PlacesAutocomplete
              onChange={this.handlePlaceSelect}
              onSelect={this.handlePlaceSelect}
              searchOptions={searchOptions}
              value={address}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div className={classes.searchInputContainer}>
                  <input
                    {...getInputProps({
                      type: 'text',
                      className:
                        classes.placesContainer +
                        ' ' +
                        classes.placesContainer2,
                      placeholder: t('Start typing county or state in the US…'),
                      name: 'search--near',
                      id: 'search--near',
                    })}
                  />
                  <div className={classes.placesContainer}>
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      return (
                        <ListItem
                          button
                          key={suggestion.id}
                          divider={true}
                          dense={true}
                          {...getSuggestionItemProps(suggestion)}
                        >
                          <ListItemIcon>
                            <PlaceIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={suggestion?.formattedSuggestion?.mainText}
                            secondary={
                              suggestion?.formattedSuggestion?.secondaryText
                            }
                          />
                        </ListItem>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </FormControl>
          <TextField
            className={classes.inputLabel}
            label="About:"
            name="description"
            value={description}
            multiline={true}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Short description of resource"
            onChange={this.handleChange}
          />
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
              shrink: true,
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
              shrink: true,
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
  handleCollectInfoData: PropTypes.func,
};

export default withStyles(styles)(SuggestInfo);
