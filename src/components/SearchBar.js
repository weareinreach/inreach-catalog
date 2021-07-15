import React from 'react';
import Fa from 'react-fontawesome';
import Dimensions from 'react-dimensions';
import PlacesAutocomplete from 'react-places-autocomplete';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlaceIcon from '@material-ui/icons/Place';
import IconButton from '@material-ui/core/IconButton';

import ResourceTypeSelector from './ResourceTypeSelector';
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

const SearchBar = (props) => {
	const {
		clearResourceTypes,
		containerWidth,
		country,
		handlePlaceChange,
		handleResourceTypeSelect,
		handleSearchButtonClick,
		locale,
		moveSearchButton,
		nearAddress,
		searchDisabled,
		selectedResourceTypes,
		t,
		width,
		children,
		showResourceSelector = true
	} = props;
	const {
		searchInputContainer,
		searchInput,
		placesContainer,
		inlineSearchButton,
		inlineSearchButtonDisabled
	} = props.classes;
	const searchOptions = {
		componentRestrictions: {
			country: typeof country === 'string' ? country.toLowerCase() : 'us'
		}
	};
	const isMobile = width < breakpoints['sm'];

	return (
		<Grid container spacing={0}>
			<Grid item md={8} sm={12} xs={12} className="position-relative">
				{children}
				{/* <PlacesAutocomplete
					onChange={handlePlaceChange}
					onSelect={handlePlaceChange}
					searchOptions={searchOptions}
					value={nearAddress}
				>
					{({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
						<div
							className={searchInputContainer}
							data-test-id="search-bar-input"
						>
							<input
								{...getInputProps({
									placeholder: t(
										'Start typing county, city or state in the US…'
									),
									className: searchInput
								})}
							/>
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
				) : null} */}
			</Grid>
			{showResourceSelector && (
				<Grid item md={4} sm={12} xs={12} className="hide--on-print">
					<ResourceTypeSelector
						containerWidth={containerWidth}
						onChange={handleResourceTypeSelect}
						selectedResourceTypes={selectedResourceTypes}
						clearResourceTypes={clearResourceTypes}
						locale={locale}
						t={t}
						moveSearchButton={moveSearchButton}
					/>
				</Grid>
			)}
		</Grid>
	);
};

export default withStyles(styles)(Dimensions({containerStyle: {}})(SearchBar));
