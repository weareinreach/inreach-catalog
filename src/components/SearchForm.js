import React from 'react';
import Fa from 'react-fontawesome';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {FormattedMessage} from 'react-intl';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import TabContext from '@material-ui/lab/TabContext';
import Tab from '@material-ui/core/Tab';
import TabPanel from '@material-ui/lab/TabPanel';
import TabList from '@material-ui/lab/TabList';
import Tooltip from '@material-ui/core/Tooltip';

import AsylumConnectButton from './AsylumConnectButton';
import AsylumConnectCheckbox from './AsylumConnectCheckbox';
import LocaleSelector from './LocaleSelector';
import AsylumConnectInfographicButton from './AsylumConnectInfographicButton';
import SearchBar from './SearchBar';
import SearchByLocation from './SearchByLocation';
import SearchByOrgName from './SearchByOrgName';
import SearchRefinementControls from './SearchRefinementControls';
import withWidth from './withWidth';
import {breakpoints} from '../theme';

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
	secondary: {
		color: theme.palette.secondary[500],
		'&:hover': {
			backgroundColor: 'inherit'
		}
	},
	tooltip: {fontFamily: 'sans-serif'},
	filterContainer: {
		marginTop: '-0.8rem'
	},
	fullBottomMargin: {
		marginBottom: theme.spacing(4),
		[theme.breakpoints.down('xs')]: {
			marginBottom: 0
		}
	},
	halfBottomMargin: {
		marginBottom: theme.spacing(2)
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
	infographicContainer: {
		paddingBottom: theme.spacing(12),
		paddingTop: theme.spacing(3)
	}
});

class SearchForm extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			moveButton: false,
			tabValue: props.orgName ? 1 : 0
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
		this.setState({tabValue: newValue});
	};
	a11yProps = (index) => {
		return {
			id: `search-tab-${index}`,
			'aria-controls': `search-tabpanel-${index}`
		};
	};

	render() {
		const {
			nationalOrgCheckboxContainer,
			searchButton,
			searchButtonContainer,
			lowerButton,
			tabs,
			infographicContainer,
			secondary,
			tooltip,
			filterContainer,
			fullBottomMargin,
			halfBottomMargin
		} = this.props.classes;
		const {
			handleOrgSelection,
			handleSearchByOrgName,
			showWalkinCheckbox,
			locale
		} = this.props;
		const variant = 'primary';
		const localeLabel = 'Select country';
		const isMobile = this.props.width < breakpoints['sm'];
		const toolbarClass = showWalkinCheckbox
			? halfBottomMargin
			: fullBottomMargin;

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
				<TabContext value={this.state.tabValue}>
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
							<SearchByLocation {...this.props} />
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
								xs
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

							<Grid item xs className="pull-right">
								<Tooltip
									className={tooltip}
									classes={{tooltipPlacementTop: 'badge-tooltipTop'}}
									title="Print Results"
									placement="top"
								>
									<IconButton
										className={secondary}
										style={{height: 'auto'}}
										onClick={this.props.handlePrintClick}
										disabled={this.props.printDisabled}
									>
										<Fa name="print" />
									</IconButton>
								</Tooltip>
							</Grid>
							{!isMobile && (
								<Grid item xs className={filterContainer + ' ' + toolbarClass}>
									<SearchRefinementControls
										clearSearchFilters={this.props.clearSearchFilters}
										handleFilterSelect={this.props.handleFilterSelect}
										handleSortSelect={this.props.handleSortSelect}
										selectedFilters={this.props.selectedFilters.filter(
											(item) => item !== 'time-walk-in'
										)}
										selectedSort={this.props.selectedSort}
									/>
								</Grid>
							)}
						</Grid>
					</TabPanel>
					<TabPanel value={1} index={1}>
						<SearchBar
							{...this.props}
							classes={null}
							moveSearchButton={this.onMoveSearchButton}
							data-test-id="serchbar"
							showResourceSelector={false}
						>
							<SearchByOrgName
								handleOrgSelection={handleOrgSelection}
								orgName={this.props.orgName}
								locale={locale}
							/>
						</SearchBar>
						<Grid container spacing={0} className={searchButtonContainer}>
							<Grid
								item
								xs
								className={searchButton}
								style={{paddingBottom: '10px'}}
							>
								<AsylumConnectButton
									variant={variant}
									onClick={handleSearchByOrgName}
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
					<Grid container className={infographicContainer}>
						<Grid item xs={12} className={searchButton}>
							<AsylumConnectInfographicButton
								testIdName="search-form-download-link"
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
