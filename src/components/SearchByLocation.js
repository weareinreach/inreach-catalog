import React from 'react';
import {FormattedMessage} from 'react-intl';
import PlacesAutocomplete from 'react-places-autocomplete';
import Fa from 'react-fontawesome';
import {withStyles} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
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
	},
	inlineSearchButton: {
		position: 'absolute',
		top: 0,
		right: 0,
		zIndex: 100,
		height: '48px',
		borderRadius: 0,
		color: theme.palette.common.white,
		backgroundColor: theme.palette.primary[500],
		borderColor: theme.palette.primary[500],
		'&:hover': {
			color: theme.palette.common.white,
			backgroundColor: theme.palette.primary[900],
			borderColor: theme.palette.primary[900]
		}
	},
	inlineSearchButtonDisabled: {
		color: theme.palette.common.white,
		backgroundColor: theme.palette.primary[100],
		borderColor: theme.palette.primary[100],
		'&:active': {
			color: theme.palette.common.white,
			backgroundColor: theme.palette.primary[100],
			borderColor: theme.palette.primary[100]
		},
		'&:hover': {
			color: theme.palette.common.white,
			backgroundColor: theme.palette.primary[100],
			borderColor: theme.palette.primary[100]
		}
	}
});

const SearchByLocation = (props) => {
	const {
		searchInputContainer,
		searchInput,
		placesContainer,
		inlineSearchButton,
		inlineSearchButtonDisabled
	} = props.classes;
	const {width, handleSearchButtonClick, searchDisabled, country} = props;
	const isMobile = width < breakpoints['sm'];
	const searchOptions = {
		componentRestrictions: {
			country: typeof country === 'string' ? country.toLowerCase() : 'us'
		}
	};
	return (
		<>
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
							defaultMessage="Start typing county, city or state in the US…"
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
							{loading && <div>Loading...</div>}
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
			{isMobile && inlineSearchButton ? (
				<IconButton
					className={inlineSearchButton}
					classes={{
						disabled: inlineSearchButtonDisabled
					}}
					onClick={handleSearchButtonClick}
					disabled={searchDisabled}
				>
					<Fa name="search" />
				</IconButton>
			) : null}
		</>
	);
};

export default withStyles(styles)(SearchByLocation);
