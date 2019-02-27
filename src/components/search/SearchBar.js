import React from 'react';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PlaceIcon from 'material-ui-icons/Place';

import Dimensions from 'react-dimensions';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import ResourceTypeSelector from './ResourceTypeSelector';
import { searchInput, searchInputMobile } from '../../theme/sharedClasses';

const styles = theme => ({
  searchInput: searchInput(theme),
  [theme.breakpoints.down('xs')]: {
    searchInput: searchInputMobile(theme)
  },
  searchInputContainer: {
    position: 'relative',
    zIndex: '10'
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


class SearchBar extends React.Component {
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.nearAddress && nextProps.nearAddress != this.state.address) {
      this.setState({
        address: nextProps.nearAddress
      })
    }
  }

  handlePlaceSelect(address) {
    this.setState({
      address
    })
    this.props.handlePlaceSelect(address);
  }

  handlePlaceChange(address) {
    this.setState({
      address
    })
    this.props.handlePlaceChange(address);
  }

  render() {
    const { searchInputContainer, searchInput, placesContainer } = this.props.classes;
    
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
    const options = {
      componentRestrictions: {
        country: 'us'
      }
    };
    const AutocompleteItem = ({ formattedSuggestion }) => (
          <ListItem divider={true} dense={true}>
            <ListItemIcon>
              <PlaceIcon />
            </ListItemIcon>
            <ListItemText primary={formattedSuggestion.mainText} secondary={formattedSuggestion.secondaryText} />
          </ListItem>    
    );
    return (
      <Grid container spacing={0}>
        <Grid item md={8} sm={12} xs={12}>
          <PlacesAutocomplete
            onSelect={this.handlePlaceSelect}
            autocompleteItem={AutocompleteItem}
            onEnterKeyDown={this.handlePlaceSelect}
            classNames={cssClasses}
            inputProps={inputProps}
            options={options}
          />
        </Grid>
        <Grid item md={4} sm={12} xs={12} className="hide--on-print">
          <ResourceTypeSelector 
            containerWidth={this.props.containerWidth} 
            onChange={this.props.handleResourceTypeSelect} 
            selectedResourceTypes={this.props.selectedResourceTypes} 
            clearResourceTypes={this.props.clearResourceTypes} 
          />
        </Grid>
      </Grid>
    );
  }
};

export default withStyles(styles)(Dimensions({containerStyle: {}})(SearchBar));