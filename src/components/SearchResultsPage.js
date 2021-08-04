import React from 'react';
import Fa from 'react-fontawesome';
import SwipeableViews from 'react-swipeable-views';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import IconButton from '@material-ui/core/IconButton';
import {FormattedMessage} from 'react-intl';

import AsylumConnectBackButton from './AsylumConnectBackButton';
import AsylumConnectButton from './AsylumConnectButton';
import AsylumConnectCheckbox from './AsylumConnectCheckbox';
import AsylumConnectInfographicButton from './AsylumConnectInfographicButton';
import AsylumConnectMap from './AsylumConnectMap';
import Loading from './Loading';
import ResourceListItem from './ResourceListItem';
import SearchBar from './SearchBar';
import SearchRefinementControls from './SearchRefinementControls';
import Disclaimer from './Disclaimer';
import withWidth from './withWidth';
import {boldFont, breakpoints, mobilePadding} from '../theme';

const styles = (theme) => ({
	tooltip: {fontFamily: 'sans-serif'},
	container: {
		minHeight: '500px',
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8)
	},
	tabContainer: {
		backgroundColor: theme.palette.secondary[500],
		justifyContent: 'space-evenly',
		color: theme.palette.common.white
	},
	indicatorColor: {
		backgroundColor: theme.palette.common.white
	},
	centerText: {
		textAlign: 'center'
	},
	noResults: Object.assign(boldFont(theme), {
		textAlign: 'center'
	}),
	fullBottomMargin: {
		marginBottom: theme.spacing(4),
		[theme.breakpoints.down('xs')]: {
			marginBottom: 0
		}
	},
	halfBottomMargin: {
		marginBottom: theme.spacing(2)
	},
	secondary: {
		color: theme.palette.secondary[500],
		'&:hover': {
			backgroundColor: 'inherit'
		}
	},
	loadingColor: {
		color: theme.palette.secondary[500]
	},
	[theme.breakpoints.up('sm')]: {
		filterContainer: {
			marginTop: '-0.8rem'
		}
	},
	[theme.breakpoints.down('xs')]: {
		nationalOrgCheckboxContainer: {
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(2)
		},
		container: {
			paddingTop: '0px',
			paddingBottom: '0px'
		},
		containerSearchForm: Object.assign(mobilePadding(theme), {
			backgroundColor: theme.palette.secondary[500],
			paddingTop: '20px',
			paddingBottom: '20px'
		}),
		containerSearchResults: Object.assign(mobilePadding(theme), {
			backgroundColor: theme.palette.common.white,
			paddingTop: '20px'
		}),
		formRow: {
			marginBottom: '0'
		},
		checkboxDefault: {
			color: theme.palette.common.white,
			alignItems: 'flex-start'
		},
		checkboxLabel: {
			color: theme.palette.common.white
		},
		shrinkTab: {
			overflowY: 'hidden',
			height: 0
		},
		noResults: {
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(2)
		},
		loadingColor: {
			backgroundColor: 'transparent',
			color: theme.palette.common.white
		}
	},
	[theme.breakpoints.down('xl')]: {
		nationalOrgCheckboxContainer: {
			paddingBottom: theme.spacing(3)
		},
		lowerButton: {
			marginTop: theme.spacing(53)
		}
	},
	backButton: {
		paddingBottom: '0.83em'
	}
});

const ResultsContainer = (props) => {
	const {
		containerSearchResults,
		locale,
		searching,
		searchResults,
		noResults,
		loadingColor,
		userData
	} = props;
	const disclaimerProps = {};
	disclaimerProps.children = (
		<FormattedMessage id="search.covid-disclaimer-default" />
	);

	return (
		<div
			className={
				searching && !searchResults.length
					? loadingColor
					: containerSearchResults
			}
		>
			<Disclaimer {...disclaimerProps} />
			{searchResults.length
				? searchResults.map((organization) => {
						return (
							<ResourceListItem
								data-test-id="search-form-result"
								key={organization._id}
								resource={organization}
								userData={userData}
								{...props}
							/>
						);
				  })
				: null}
			{searching ? (
				<Loading colorClass={searchResults.length ? null : loadingColor} />
			) : searchResults.length ? null : (
				<Typography variant="body2" className={noResults}>
					We didn't currently find any verified resources within your search
					criteria.
					<br />
					Try choosing different resource types or searching for a different
					location.
				</Typography>
			)}
		</div>
	);
};

class SearchResultsContainer extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			tab: 0,
			moveButton: false
		};

		this.handleSwipeChange = this.handleSwipeChange.bind(this);
		this.handleTabChange = this.handleTabChange.bind(this);
		this.onMoveSearchButton = this.onMoveSearchButton.bind(this);
	}

	componentDidMount() {
		this.doSearch();
		window.addEventListener('popstate', this.doSearch.bind(this));
		window.addEventListener('scroll', this.addPage.bind(this));
		let mapContainer = document.querySelector('.container--map');
		if (mapContainer) {
			mapContainer.addEventListener('scroll', this.addPage.bind(this));
		}
	}

	componentWillUnmount() {
		window.removeEventListener('popstate', this.doSearch.bind(this));
		window.removeEventListener('scroll', this.addPage.bind(this));
		let mapContainer = document.querySelector('.container--map');
		if (mapContainer) {
			mapContainer.removeEventListener('scroll', this.addPage.bind(this));
		}
	}

	doSearch(ev) {
		this.props.clearSearchStatus();
		this.props.fetchSearchResults();
	}

	addPage(ev) {
		let searchContainer = document.querySelectorAll('.container--search');
		let mapContainer = document.querySelector('.container--map');
		if (
			(searchContainer.length &&
				window.innerHeight + window.scrollY >=
					searchContainer[0].offsetTop + searchContainer[0].offsetHeight) ||
			(mapContainer &&
				mapContainer.scrollTop + mapContainer.clientHeight >=
					searchContainer[0].offsetTop + searchContainer[0].offsetHeight)
		) {
			this.props.fetchNextSearchResultsPage();
		}
	}

	componentDidUpdate(prevProps) {
		if (
			this.props.searchStatus === 'refresh' &&
			prevProps.searchStatus === null
		) {
			this.doSearch();
		}
	}

	handleTabChange(event, value) {
		this.setState({
			tab: value
		});
	}

	handleSwipeChange(index, indexLatest) {
		this.setState({
			tab: index
		});
	}

	onMoveSearchButton(newPosition) {
		this.setState({
			moveButton: !this.state.moveButton
		});
	}

	render() {
		const {
			backButton,
			centerText,
			checkboxDefault,
			checkboxLabel,
			container,
			containerSearchForm,
			containerSearchResults,
			filterContainer,
			fullBottomMargin,
			halfBottomMargin,
			indicatorColor,
			loadingColor,
			lowerButton,
			noResults,
			secondary,
			shrinkTab,
			tabContainer,
			tooltip,
			nationalOrgCheckboxContainer
		} = this.props.classes;
		const searchResultsProps = {
			containerSearchResults:
				containerSearchResults + (this.state.tab !== 0 ? ' ' + shrinkTab : ''),
			handleListRemoveFavorite: this.props.handleListRemoveFavorite,
			handleFavoriteUpdate: this.props.handleFavoriteUpdate,
			handleListNew: this.props.handleListNew,
			handleLogOut: this.props.handleLogOut,
			handleMessageNew: this.props.handleMessageNew,
			handleRequestOpen: this.props.handleRequestOpen,
			history: this.props.history,
			lists: this.props.lists,
			loadingColor: loadingColor,
			locale: this.props.locale,
			noResults: noResults,
			session: this.props.session,
			searchResults: this.props.searchResults,
			searching: this.props.searching,
			user: this.props.user,
			userData: this.props.userData
		};

		const {showWalkinCheckbox} = this.props;
		const toolbarClass = showWalkinCheckbox
			? halfBottomMargin
			: fullBottomMargin;
		const isMobile = this.props.width < breakpoints['sm'];
		return (
			<Grid
				container
				alignItems="flex-start"
				justify={
					this.props.width >= breakpoints['xl'] ? 'flex-start' : 'center'
				}
				spacing={0}
				className={container}
			>
				<Grid item xs={12} sm={11} md={10} lg={10} xl={11}>
					<div className={containerSearchForm + ' no-background'}>
						{isMobile ? (
							<div className={backButton}>
								<AsylumConnectBackButton
									color="contrast"
									onClick={() => {
										this.props.history.push('/');
									}}
								/>
							</div>
						) : null}
						<SearchBar
							{...this.props}
							classes={null}
							inlineSearchButton={isMobile}
							moveSearchButton={this.onMoveSearchButton}
						/>
						<Grid
							container
							spacing={0}
							className={nationalOrgCheckboxContainer}
						>
							<Grid item>
								<AsylumConnectCheckbox
									label={
										this.props.locale
											? this.props.t(
													'Show me national organizations who can help anyone located in the United States'
											  )
											: this.props.t(
													'Show me national organizations who can help anyone located in the country'
											  )
									}
									checked={this.props.isNational}
									onChange={this.props.handleNationalCheckBox}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={0} alignItems="flex-start">
							<Grid item xs={12} md={8} className={toolbarClass}>
								{isMobile ? null : (
									<Grid container spacing={0} justify="space-between">
										<Grid item xs>
											<AsylumConnectButton
												variant="primary"
												onClick={this.props.handleSearchButtonClick}
												disabled={this.props.searchDisabled}
												className={this.state.moveButton ? lowerButton : null}
											>
												Search
												{this.props.searchDisabled ? (
													<Fa
														name="spinner"
														spin
														style={{marginLeft: '0.5rem'}}
													/>
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
									</Grid>
								)}
								{this.props.infographic ? (
									<Grid container spacing={0} justify="space-between">
										<Grid item xs>
											<AsylumConnectInfographicButton
												type="link"
												url={this.props.infographic.url}
												text={this.props.infographic.name}
											/>
										</Grid>
									</Grid>
								) : null}
							</Grid>
							{!isMobile ? (
								<Grid
									item
									xs={12}
									md={4}
									className={filterContainer + ' ' + toolbarClass}
								>
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
							) : null}
							{showWalkinCheckbox ? (
								<Grid
									item
									xs={12}
									className={centerText + ' ' + halfBottomMargin}
								>
									<AsylumConnectCheckbox
										label="Only show me resources that provide walk-in hours"
										value="time-walk-in"
										onChange={this.props.handleFilterSelect}
										checked={
											this.props.selectedFilters.indexOf('time-walk-in') >= 0
										}
										additionalClasses={{
											checkboxDefault: checkboxDefault,
											label: checkboxLabel
										}}
									/>
								</Grid>
							) : null}
						</Grid>
					</div>
					{isMobile ? (
						<div>
							<Tabs
								value={this.state.tab}
								onChange={this.handleTabChange}
								indicatorColor="primary"
								textColor="inherit"
								centered
								classes={{
									flexContainer: tabContainer,
									indicator: indicatorColor
								}}
							>
								<Tab label="List" />
								<Tab label="Map" />
								<Tab label="Filter" />
							</Tabs>
							<SwipeableViews
								index={this.state.tab}
								onChangeIndex={this.handleSwipeChange}
							>
								<ResultsContainer {...searchResultsProps} />
								<div
									className={
										'position-relative' +
										(this.state.tab !== 1 ? ' ' + shrinkTab : '')
									}
								>
									<AsylumConnectMap
										containerElement={
											<div
												style={{
													width: '100%',
													height: window.innerHeight - 91 + 'px'
												}}
											/>
										}
										country={this.props.country}
										history={this.props.history}
										loadingElement={
											<div
												style={{
													width: '100%',
													height: window.innerHeight - 91 + 'px'
												}}
											/>
										}
										locale={this.props.locale}
										mapElement={
											<div
												style={{
													width: '100%',
													height: window.innerHeight - 91 + 'px'
												}}
											/>
										}
										mapMaxDistance={this.props.mapMaxDistance}
										resources={this.props.mapResources}
										searchCenter={this.props.searchCenter}
										t={this.props.t}
									/>
								</div>
								<div
									className={
										'position-relative' +
										(this.state.tab !== 2 ? ' ' + shrinkTab : '')
									}
								>
									<SearchRefinementControls
										clearSearchFilters={this.props.clearSearchFilters}
										handleFilterSelect={this.props.handleFilterSelect}
										handleSortSelect={this.props.handleSortSelect}
										selectedFilters={this.props.selectedFilters.filter(
											(item) => item !== 'time-walk-in'
										)}
										selectedSort={this.props.selectedSort}
									/>
								</div>
							</SwipeableViews>
						</div>
					) : (
						<ResultsContainer {...searchResultsProps} />
					)}
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(withWidth(SearchResultsContainer));
