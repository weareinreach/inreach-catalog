import React from 'react';
import {FormattedMessage} from 'react-intl';
import PlacesAutocomplete from 'react-places-autocomplete';
import {withStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlaceIcon from '@material-ui/icons/Place';

import {breakpoints, searchInput, searchInputMobile} from '../theme';

const styles = (theme) => ({
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

const SearchByLocation = (props) => {
	const {searchInputContainer, searchInput, placesContainer} = props.classes;
	const {country} = props;
	const searchOptions = {
		componentRestrictions: {
			country: typeof country === 'string' ? country.toLowerCase() : 'us'
		}
	};
	//https://app.asana.com/0/1132189118126148/1202125382246302 find addresses in the U.S. Virgin Islands
	if (searchOptions.componentRestrictions.country === 'us') {
		searchOptions.componentRestrictions.country = ['us', 'vi'];
	}
	return (
		<Grid item xs={12}>
			<PlacesAutocomplete
				onChange={props.handlePlaceChange}
				onSelect={props.handlePlaceChange}
				searchOptions={searchOptions}
				value={props.nearAddress}
			>
				{({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
					<div className={searchInputContainer} data-test-id="search-bar-input">
						<FormattedMessage
							id="search.search-field-placeholder"
							defaultMessage="Start typing county, city or state…"
							description="search input box placeholder text"
						>
							{(placeholder) => (
								<input
									{...getInputProps({
										placeholder: placeholder,
										className: searchInput
									})}
								/>
							)}
						</FormattedMessage>
						<div className={placesContainer}>
							{loading && (
								<div>
									<FormattedMessage
										id="app.loading"
										defaultMessage="Loading..."
										description="results list loading message"
									/>
								</div>
							)}
							{suggestions.map((suggestion) => {
								return (
									<ListItem
										button
										key={suggestion.id}
										divider={true}
										dense={true}
										data-test-id="search-bar-item-suggestion"
										{...getSuggestionItemProps(suggestion)}
									>
										<ListItemIcon>
											<PlaceIcon />
										</ListItemIcon>
										<ListItemText
											primary={suggestion?.formattedSuggestion?.mainText}
											secondary={suggestion?.formattedSuggestion?.secondaryText}
										/>
									</ListItem>
								);
							})}
						</div>
					</div>
				)}
			</PlacesAutocomplete>
		</Grid>
	);
};

export default withStyles(styles)(SearchByLocation);
