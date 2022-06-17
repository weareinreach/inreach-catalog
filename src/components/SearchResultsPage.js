import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import {FormattedMessage} from 'react-intl';

import AsylumConnectBackButton from './AsylumConnectBackButton';
import AsylumConnectCheckbox from './AsylumConnectCheckbox';
import AsylumConnectInfographicButton from './AsylumConnectInfographicButton';
import AsylumConnectMap from './AsylumConnectMap';
import Loading from './Loading';
import ResourceListItem from './ResourceListItem';
import SearchRefinementControls from './SearchRefinementControls';
import Disclaimer from './Disclaimer';
import withWidth from './withWidth';
import {boldFont, breakpoints, mobilePadding} from '../theme';
import SearchForm from './SearchForm';
import language from '../utils/language';
import {getLocale} from '../utils/locale';
import {returnNativeLanguageData} from '../utils/utils';

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
			backgroundColor: theme.palette.common.white,
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

const langCode = language.getLanguageCode();
const provider = language.getLanguageProvider();

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
		<>
			<Disclaimer {...disclaimerProps} />
			<div
				className={
					searching && !searchResults.length
						? loadingColor
						: containerSearchResults
				}
			>
				{searchResults.length > 0
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
						<FormattedMessage
							id="search.no-results-for-location"
							values={{
								br: <br />
							}}
						/>
					</Typography>
				)}
			</div>
		</>
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
	}

	componentWillUnmount() {
		window.removeEventListener('popstate', this.doSearch.bind(this));
		window.removeEventListener('scroll', this.addPage.bind(this));
	}

	doSearch(ev) {
		this.props.clearSearchStatus();
		this.props.fetchSearchResults();
	}

	addPage(ev) {
		let searchContainer = document.querySelectorAll('#container--search');
		if (
			searchContainer.length &&
			window.innerHeight + window.scrollY >=
				searchContainer[0].offsetTop + searchContainer[0].offsetHeight
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
			fullBottomMargin,
			halfBottomMargin,
			indicatorColor,
			loadingColor,
			noResults,
			shrinkTab,
			tabContainer
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
			searchResults:
				langCode !== 'en' && provider === 'inreach'
					? returnNativeLanguageData(this.props.searchResults, langCode)
					: this.props.searchResults,
			searching: this.props.searching,
			user: this.props.user,
			userData: this.props.userData
		};

		const {showWalkinCheckbox} = this.props;
		const toolbarClass = showWalkinCheckbox
			? halfBottomMargin
			: fullBottomMargin;
		const isMobile = this.props.width < breakpoints['sm'];

		let leftPadding = '';
		if (this.props.width > 1364) {
			leftPadding = Math.abs(32 + (this.props.width - 1364) / 2);
		} else {
			leftPadding = Math.abs((this.props.width * 0.06) / 2);
		}

		return (
			<Grid
				container
				alignItems="flex-start"
				justify={
					this.props.width >= breakpoints['xl'] ? 'flex-start' : 'center'
				}
				spacing={0}
				className={container}
				id="container--search"
			>
				<Grid
					item
					xs={12}
					sm={11}
					md={10}
					lg={10}
					xl={11}
					style={!isMobile ? {paddingLeft: leftPadding + 'px'} : null}
				>
					<div className={containerSearchForm + ' no-background'}>
						{isMobile ? (
							<div className={backButton}>
								<AsylumConnectBackButton
									color="primary"
									onClick={() => {
										this.props.history.push('/');
									}}
								/>
							</div>
						) : null}
						<SearchForm {...this.props} />
						<Grid container spacing={0} alignItems="flex-start">
							<Grid item xs={12} md={8} className={toolbarClass}>
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
							{showWalkinCheckbox ? (
								<Grid
									item
									xs={12}
									className={centerText + ' ' + halfBottomMargin}
								>
									<AsylumConnectCheckbox
										label={<FormattedMessage id="search.show-walk-in-orgs" />}
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
								<Tab label={<FormattedMessage id="navigation.tab-list" />} />
								<Tab label={<FormattedMessage id="navigation.tab-map" />} />
								<Tab label={<FormattedMessage id="navigation.tab-filter" />} />
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
