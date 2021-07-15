import React from 'react';
import Fa from 'react-fontawesome';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {FormattedMessage} from 'react-intl';

import AppBar from '@material-ui/core/AppBar';
import TabContext from '@material-ui/lab/TabContext';
import Tab from '@material-ui/core/Tab';
import TabPanel from '@material-ui/lab/TabPanel';
import TabList from '@material-ui/lab/TabList';

import PlacesAutocomplete from 'react-places-autocomplete';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlaceIcon from '@material-ui/icons/Place';
import IconButton from '@material-ui/core/IconButton';

import AsylumConnectButton from './AsylumConnectButton';
import AsylumConnectCheckbox from './AsylumConnectCheckbox';
import LocaleSelector from './LocaleSelector';
import AsylumConnectInfographicButton from './AsylumConnectInfographicButton';
import SearchBar from './SearchBar';
import withWidth from './withWidth';
import {breakpoints, searchInput, searchInputMobile} from '../theme';

const styles = (theme) => ({
	formRow: {
		marginBottom: theme.spacing(3)
	},
	callout: {
		color: theme.palette.primary[500]
	},
	underline: {
		textDecoration: 'underline',
		'&:hover': {
			color: theme.palette.primary[900]
		}
	},
	[theme.breakpoints.down('xs')]: {
		nationalOrgCheckboxContainer: {
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(2)
		},
		searchButtonContainer: {
			paddingTop: theme.spacing(4),
			paddingBottom: theme.spacing(10)
		},
		searchButton: {
			textAlign: 'center'
		},
		body2: {
			color: theme.palette.common.white
		},
		link: {
			color: theme.palette.common.white,
			textDecoration: 'underline'
		}
	},
	[theme.breakpoints.down('xl')]: {
		nationalOrgCheckboxContainer: {
			paddingBottom: theme.spacing(3)
		},
		lowerButton: {
			marginTop: theme.spacing(53),
			marginBottom: theme.spacing(3)
		}
	},
	tabs: {display: 'flex', flex: 1, minWidth: '350px'},
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

class SearchForm extends React.Component {
	constructor() {
		super();

		this.state = {
			moveButton: false,
			value: 0
		};
		this.onMoveSearchButton = this.onMoveSearchButton.bind(this);
	}

	onMoveSearchButton(newPosition) {
		if (newPosition !== this.state.moveButton) {
			this.setState({
				moveButton: !this.state.moveButton
			});
		} else if (newPosition === this.state.moveButton) {
			this.setState({
				moveButton: !this.state.moveButton
			});
		}
	}
	handleChange = (event, newValue) => {
		this.setState({value: newValue});
	};
	a11yProps = (index) => {
		return {
			id: `search-tab-${index}`,
			'aria-controls': `search-tabpanel-${index}`
		};
	};

	searchByLocation = () => {
		const {
			searchInputContainer,
			searchInput,
			placesContainer,
			inlineSearchButton,
			inlineSearchButtonDisabled
		} = this.props.classes;
		const {width, handleSearchButtonClick, searchDisabled} = this.props;
		const isMobile = width < breakpoints['sm'];

		return (
			<>
				<PlacesAutocomplete
					onChange={this.props.handlePlaceChange}
					onSelect={this.props.handlePlaceChange}
					searchOptions={this.props.searchOptions}
					value={this.props.nearAddress}
				>
					{({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
						<div
							className={searchInputContainer}
							data-test-id="search-bar-input"
						>
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
				) : null}
			</>
		);
	};

	searchByName = () => {
		return <></>;
	};
	render() {
		const {
			nationalOrgCheckboxContainer,
			searchButton,
			searchButtonContainer,
			lowerButton,
			tabs
		} = this.props.classes;
		const variant = 'primary';
		const localeLabel = 'Select country';
		const isMobile = this.props.width < breakpoints['sm'];

		return (
			<div>
				{isMobile ? (
					<Grid container>
						<Grid item xs={12}>
							<LocaleSelector
								label={localeLabel}
								setOnChange={true}
								handleSelectLocale={this.props.onLocaleSelect}
								changeLocale={this.props.changeLocale}
							/>
						</Grid>
					</Grid>
				) : null}
				<TabContext value={this.state.value}>
					<AppBar position="static">
						<TabList
							onChange={this.handleChange}
							aria-label="search panel tabs"
						>
							<Tab
								label={
									<FormattedMessage
										id="search.search-by-location-tab-heading"
										defaultMessage="Find services near you"
									/>
								}
								{...this.a11yProps(0)}
								className={tabs}
							/>
							<Tab
								label={
									<FormattedMessage
										id="search.search-by-name-tab-heading"
										defaultMessage="Find an organization by name"
									/>
								}
								{...this.a11yProps(1)}
								className={tabs}
							/>
						</TabList>
					</AppBar>
					<TabPanel value={0} index={0}>
						<SearchBar
							{...this.props}
							classes={null}
							moveSearchButton={this.onMoveSearchButton}
							data-test-id="serchbar"
						>
							{this.searchByLocation()}
						</SearchBar>
						<Grid
							container
							spacing={0}
							className={nationalOrgCheckboxContainer}
						>
							<Grid item>
								<AsylumConnectCheckbox
									label={
										<FormattedMessage
											id="search.show-national-organisations-country"
											defaultMessage="Show me national organizations who can help anyone located in the country"
										/>
									}
									checked={this.props.isNational}
									onChange={this.props.handleNationalCheckBox}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={0} className={searchButtonContainer}>
							<Grid
								item
								xs={12}
								md={4}
								className={searchButton}
								style={{paddingBottom: '10px'}}
							>
								<AsylumConnectButton
									variant={variant}
									onClick={this.props.handleSearchButtonClick}
									disabled={this.props.searchDisabled}
									className={this.state.moveButton ? lowerButton : null}
									testIdName="search-bar-search-button"
								>
									<FormattedMessage
										id="navigation.search"
										defaultMessage="Search"
									/>
									{this.props.searchDisabled ? (
										<Fa name="spinner" spin style={{marginLeft: '0.5rem'}} />
									) : null}
								</AsylumConnectButton>
							</Grid>
						</Grid>
					</TabPanel>
					<TabPanel value={1} index={1}>
						hey bud
						<Grid container spacing={0} className={searchButtonContainer}>
							<Grid
								item
								xs={12}
								md={4}
								className={searchButton}
								style={{paddingBottom: '10px'}}
							>
								<AsylumConnectButton
									variant={variant}
									onClick={this.props.handleSearchButtonClick}
									disabled={this.props.searchDisabled}
									className={this.state.moveButton ? lowerButton : null}
									testIdName="search-bar-search-button"
								>
									<FormattedMessage
										id="navigation.search"
										defaultMessage="Search"
									/>
									{this.props.searchDisabled ? (
										<Fa name="spinner" spin style={{marginLeft: '0.5rem'}} />
									) : null}
								</AsylumConnectButton>
							</Grid>
						</Grid>
					</TabPanel>
				</TabContext>
				{this.props.infographic && (
					<Grid container spacing={0}>
						<Grid item xs={12} className={searchButton}>
							<AsylumConnectInfographicButton
								type="link"
								url={
									this.props.infographic.url ? this.props.infographic.url : null
								}
								list={
									this.props.infographic.list
										? this.props.infographic.list
										: null
								}
								text={this.props.t(
									'Download Legal Guides on LGBTQ Asylum in the U.S.'
								)}
							/>
						</Grid>
					</Grid>
				)}
			</div>
		);
	}
}

export default withStyles(styles)(withWidth(SearchForm));
