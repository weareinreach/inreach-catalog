import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Input from 'material-ui/Input';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';
import PlaceIcon from 'material-ui-icons/Place';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import ResourceTypeSelector from './ResourceTypeSelector';
import AsylumConnectButton from './AsylumConnectButton';
import ErrorMessage from './ErrorMessage';

import Dimensions from 'react-dimensions';
import { searchInput } from '../theme/sharedClasses';

const styles = theme => ({
  searchInput: searchInput(theme),
  formRow: {
    marginBottom: '2.5rem'
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
    left: '0'
  }
});

class SearchForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    //this.state = { dialog: 'none' };
    this.state = {
      address: this.props.nearAddress
    }


    this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
    this.handlePlaceChange = this.handlePlaceChange.bind(this)
    /*this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this)*/
  }

  handlePlaceSelect(address) {
    this.handlePlaceChange(address);
    this.props.handlePlaceSelect(address);
  }

  handlePlaceChange(address) {
    this.setState({
      address
    })
  }

  render() {
    const { searchInputContainer, searchInput, placesContainer, formRow } = this.props.classes;
    
    const cssClasses = {
      root: searchInputContainer,
      input: searchInput,
      autocompleteContainer: placesContainer,
    }
    const inputProps = {
      type: "text",
      value: this.state.address,
      onChange: this.handlePlaceChange,
      //autoFocus: true,
      placeholder: "Start typing address, city or zip code in the US…",
      name: 'search--near',
      id: "search--near",
    }
    const AutocompleteItem = ({ formattedSuggestion }) => (
          <ListItem divider={true} dense={true}>
            <ListItemIcon>
              <PlaceIcon />
            </ListItemIcon>
            <ListItemText primary={formattedSuggestion.mainText} secondary={formattedSuggestion.secondaryText} />
          </ListItem>    
    );

    const searchStatus = () => {
      switch(this.props.searchStatus) {
        case 'redirect':
          return (<Redirect to={`/search/${encodeURIComponent(this.props.nearAddress)}/test/test/test`} />);
        break;
        case 'error':
          var errors = (this.props.errorMessage.length ? [this.props.errorMessage] : []);
          return errors.map(function(name, index){
            return <ErrorMessage key={ Date.now() } message={ name } />;
          })
        break;
        default:
          return null;
        break;
      } 
    }

    return (
      <div>
        {searchStatus()}
        <Grid container spacing={0}>
          <Grid item sm={8} xs={12}>
            <PlacesAutocomplete
              onSelect={this.handlePlaceSelect}
              autocompleteItem={AutocompleteItem}
              onEnterKeyDown={this.handlePlaceSelect}
              classNames={cssClasses}
              inputProps={inputProps}
            />
          </Grid>
          <Grid item sm={4} xs={12}>
            <ResourceTypeSelector containerWidth={this.props.containerWidth} onChange={this.props.handleResourceTypeSelect} selectedResources={this.props.selectedResources} />
          </Grid>
          <Grid item xs={12} className={formRow}>
            {/*<FormControlLabel
              control={
                <Checkbox
                  value="checkedA"
                />
              }
            label="Include remote resources"
            className={formRow}
            />*/}
          </Grid>
          <Grid item xs={12}>
            <AsylumConnectButton variant="secondary" onClick={this.props.handleSearchButtonClick} >
              Search
            </AsylumConnectButton>
          </Grid>
        </Grid>
        
      </div>
    );
  }
};

export default withStyles(styles)(Dimensions({containerStyle: {}})(SearchForm));
