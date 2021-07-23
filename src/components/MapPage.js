import React from 'react';
import ReactDOM from 'react-dom';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import {Route, Switch} from 'react-router-dom';
import Sticky from 'react-sticky-state';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';

import DetailPage from './DetailPage';
import SearchFormPage from './SearchFormPage';
import SearchResultsPage from './SearchResultsPage';
import AsylumConnectMap from './AsylumConnectMap';
import withWidth from './withWidth';
import {breakpoints} from '../theme';
import {fetchOrganizations} from '../utils/api';
import infograph from '../utils/infographics';
import ResourceTypes from '../utils/tags';

const styles = (theme) => ({
	searchArea: {
		padding: '2rem'
	},
	containerMap: {
		maxWidth: theme.maxColumnWidth,
		margin: '0 auto',
		[theme.breakpoints.down('xs')]: {
			overflowY: 'auto',
			height: '100%',
			backgroundColor: theme.palette.secondary[500]
		}
	}
});

class MapPage extends React.Component {
	constructor(props, context) {
		super(props, context);

		let {
			inState,
			nearAddress,
			nearLatLng,
			isNational,
			selectedResourceTypes,
			selectedFilters,
			selectedSort,
			name
		} = this.parseParams(props.match.params);
		this.props.handleAddressChange(nearAddress);
		this.state = {
			nearLatLng,
			inState,
			isNational,
			mapWidth: '100%',
			page: 1,
			endOfList: false,
			searchStatus: null,
			selectedResourceTypes,
			selectedFilters,
			selectedSort,
			searching: false,
			searchDisabled: false,
			printDisabled: false,
			searchResults: [],
			searchResultsIndex: [],
			searchResultSlugs: [],
			selectedResource: null,
			selectedService: null,
			lastSearch: null,
			orgName: name ?? null
		};

		this.recentResourceCache = {};

		this.handlePlaceChange = this.handlePlaceChange.bind(this);
		this.handleNationalCheckBox = this.handleNationalCheckBox.bind(this);
		this.handleResourceTypeSelect = this.handleResourceTypeSelect.bind(this);
		this.handleResourceBackButton = this.handleResourceBackButton.bind(this);
		this.handleFilterSelect = this.handleFilterSelect.bind(this);
		this.handleSortSelect = this.handleSortSelect.bind(this);
		this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
		this.fetchSearchResults = this.fetchSearchResults.bind(this);
		this.fetchNextSearchResultsPage =
			this.fetchNextSearchResultsPage.bind(this);
		this.handlePrintClick = this.handlePrintClick.bind(this);
		this.processSearchResults = this.processSearchResults.bind(this);
		this.setSelectedResource = this.setSelectedResource.bind(this);
		this.setSelectedService = this.setSelectedService.bind(this);
		this.clearResourceTypes = this.clearResourceTypes.bind(this);
		this.clearSearchFilters = this.clearSearchFilters.bind(this);
		this.clearSearchStatus = this.clearSearchStatus.bind(this);
		this.handleSearchByOrgName = this.handleSearchByOrgName.bind(this);
		this.handleOrgSelection = this.handleOrgSelection.bind(this);
	}

	componentDidMount() {
		window.addEventListener('resize', this.resizeMap.bind(this));

		this.resizeMap();

		if (
			this.props.match.path ===
				'/:locale/search/:in/:place/:near/:national/:for/:filter/:sort' ||
			this.props.match.path === '/:locale/search/:name/:sort'
		) {
			localStorage.setItem('lastSearch', this.props.history.location.pathname);
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resizeMap.bind(this));
	}

	componentWillUpdate(nextProps, nextState) {
		// TODO: drastically slowed the page down by causing constant re-rendering
		// if (
		//   nextProps.match.path === '/:locale/resource/:id' &&
		//   (this.props.match.path !== '/:locale/resource/:id' ||
		//     (this.props.match.params &&
		//       nextProps.match.params &&
		//       this.props.match.params.id !== nextProps.match.params.id &&
		//       this.props.match.path === '/:locale/resource/:id'))
		// ) {
		//   this.setSelectedResource(
		//     this.getCachedResource(nextProps.match.params.id)
		//   );
		// }
		// if (
		//   nextProps.match.path === '/:locale/resource/:id/service/:serviceId' &&
		//   (this.props.match.path !== '/:locale/resource/:id/service/:serviceId' ||
		//     (this.props.match.params &&
		//       nextProps.match.params &&
		//       this.props.match.params.serviceId !==
		//         nextProps.match.params.serviceId &&
		//       this.props.match.path === '/:locale/resource/:id/service/:serviceId'))
		// ) {
		//   this.setSelectedResource(
		//     this.getCachedResource(nextProps.match.params.id)
		//   );
		// }
		// if (
		//   nextProps.match.path ===
		//   '/:locale/search/:in/:place/:near/:national/:for/:filter/:sort'
		// ) {
		//   localStorage.setItem('lastSearch', nextProps.history.location.pathname);
		// }
	}

	clearSearchStatus() {
		this.setState({
			searchStatus: null
		});
	}

	clearSearchFilters() {
		this.setState({
			selectedFilters: []
		});
	}

	clearResourceTypes(ev) {
		if (ev) {
			ev.preventDefault();
		}

		this.setState({
			selectedResourceTypes: []
		});
	}

	getCachedResource(slug) {
		let resourceIndex = this.state.searchResultSlugs.indexOf(
			slug.toLowerCase()
		);
		if (resourceIndex > -1) {
			return this.findResource(slug);
		} else if (
			typeof this.recentResourceCache[slug.toLowerCase()] !== 'undefined'
		) {
			return this.recentResourceCache[slug.toLowerCase()];
		}
		return null;
	}

	getInfographic() {
		let {nearLatLng} = this.parseParams(this.props.match.params);
		const center = nearLatLng;
		if (center) {
			return infograph.fetchNearestInfographic(center.lat, center.lng);
		} else if (this.props.match && this.props.match.path === '/') {
			return infograph.getDefaultInfographic(this.props.locale);
		} else {
			return null;
		}
	}

	handleResourceBackButton() {
		let lastSearch = localStorage.getItem('lastSearch');
		if (lastSearch) {
			this.props.history.push(lastSearch);
		} else {
			this.props.history.push('/');
		}
	}

	handlePlaceChange(address) {
		this.setState({nearLatLng: null});
		this.props.handleAddressChange(address);
	}

	handleNationalCheckBox(event) {
		this.setState({isNational: event.target.checked});
	}

	handleResourceTypeSelect(event, checked) {
		var index;
		const target = event.target;
		var selectedResourceTypes = this.state.selectedResourceTypes.slice();

		if (checked && selectedResourceTypes.indexOf(target.value) < 0) {
			selectedResourceTypes.push(target.value);
			selectedResourceTypes.sort();
			this.setState({
				selectedResourceTypes: selectedResourceTypes,
				searchStatus: null
			});
		} else if (
			!checked &&
			(index = selectedResourceTypes.indexOf(target.value)) >= 0
		) {
			selectedResourceTypes.splice(index, 1);
			this.setState({
				selectedResourceTypes: selectedResourceTypes,
				searchStatus: null
			});
		}
	}

	handleFilterSelect(event, checked) {
		var index;
		const target = event.target;
		var selectedFilters = this.state.selectedFilters.slice();

		if (checked && selectedFilters.indexOf(target.value) < 0) {
			selectedFilters.push(target.value);
			selectedFilters.sort();
			this.setState({
				selectedFilters: selectedFilters
			});
		} else if (
			!checked &&
			(index = selectedFilters.indexOf(target.value)) >= 0
		) {
			selectedFilters.splice(index, 1);
			this.setState({
				selectedFilters: selectedFilters
			});
		}
	}

	handleSortSelect(event, value) {
		this.setState({
			selectedSort: event.target.value
		});
	}

	handlePrintClick() {
		var self = this;
		if (
			typeof this.queryOneDegree !== 'undefined' &&
			!this.state.searching &&
			!this.queryOneDegree.areAllResultsReturned()
		) {
			this.queryOneDegree.nextPage();
			this.setState({
				searching: true,
				searchDisabled: true,
				printDisabled: true
			});
			this.queryOneDegree.fetchOrganizations({
				callback: (results) => {
					self.processSearchResults(results);
					window.print();
					this.setState({
						searchDisabled: false,
						printDisabled: false
					});
				}
			});
		} else {
			window.print();
		}
	}

	handleSearchButtonClick() {
		this.setState({searchDisabled: true});

		const redirect = ({latLng, state}) => {
			const resourceTypes = encodeURIComponent(
				this.state.selectedResourceTypes.length
					? this.state.selectedResourceTypes.join(',')
					: 'any'
			);
			const inState = encodeURIComponent(state.long_name);
			const nearAddress = encodeURIComponent(this.props.nearAddress);
			const nearLatLng = encodeURIComponent(latLng.lat + ',' + latLng.lng);
			const isNational = encodeURIComponent(
				this.state.isNational ? 'national' : 'local'
			);
			const filters = encodeURIComponent(
				this.state.selectedFilters.length
					? this.state.selectedFilters.join(',')
					: 'all'
			);
			const sort = encodeURIComponent(this.state.selectedSort);
			const url = `/${this.props.locale}/search/${inState}/${nearAddress}/${nearLatLng}/${isNational}/${resourceTypes}/${filters}/${sort}`;
			this.props.history.push(url);
			this.setState({
				searchStatus: 'refresh',
				nearLatLng: latLng,
				inState: state,
				searchDisabled: false
			});
		};

		if (this.state.nearLatLng === null) {
			geocodeByAddress(this.props.nearAddress)
				.then((results) => {
					let state = {};
					if (results.length && results[0].address_components) {
						results[0].address_components.forEach((piece) => {
							if (
								piece.types &&
								piece.types.indexOf('administrative_area_level_1') >= 0
							) {
								state = piece;
							}
						});
					}
					return getLatLng(results[0]).then((latLng) => ({latLng, state}));
				})
				.then(redirect)
				.catch((error) => {
					this.props.handleMessageNew(
						'Unable to find your location, please try entering your city, state in the box above.'
					);
					//console.error('Error', error)
					this.setState({
						searchDisabled: false
					});
				});
		} else {
			redirect({latLng: this.state.nearLatLng, state: this.state.inState});
		}
	}

	handleSearchByOrgName() {
		this.setState({searchDisabled: true});
		const name = encodeURIComponent(this.state.orgName);
		const sort = encodeURIComponent(this.state.selectedSort);
		const url = `/${this.props.locale}/search/${name}/${sort}`;
		this.props.history.push(url);
		this.setState({
			searchStatus: 'refresh',
			nearLatLng: null,
			inState: null,
			searchDisabled: false
		});
	}

	handleOrgSelection(orgName) {
		this.setState({orgName: orgName});
	}

	resizeMap() {
		const node = ReactDOM.findDOMNode(this.ACMap);
		if (node && node.getBoundingClientRect) {
			const nodeDimensions = node.getBoundingClientRect();
			let width = document.body.clientWidth - nodeDimensions.x;
			this.setState({mapWidth: width + 'px'});
		}
	}

	fetchSearchResults(nextPage) {
		if ((nextPage && this.state.endOfList) || this.state.searching) {
			return;
		}

		let {
			inState,
			nearAddress,
			nearLatLng,
			isNational,
			selectedResourceTypes,
			selectedFilters,
			selectedSort,
			name,
			updated,
			stringified
		} = this.checkForURLUpdates();
		let nextState,
			params = {};
		this.setState({
			searching: true,
			searchDisabled: true,
			printDisabled: true
		});
		const page = nextPage ? this.state.page + 1 : 1;
		if (nearLatLng !== null) {
			this.props.handleAddressChange(nearAddress);

			geocodeByAddress(nearAddress)
				.then((results) => {
					let state = '';
					let city = '';

					if (results.length && results[0].address_components) {
						results[0].address_components.forEach((piece) => {
							if (piece?.types?.indexOf('administrative_area_level_1') !== -1) {
								state = piece?.long_name;
							} else if (piece?.types?.indexOf('locality') !== -1) {
								city = piece?.long_name;
							}
						});
					}
					nextState = {
						inState,
						nearAddress,
						nearLatLng,
						isNational,
						page,
						selectedResourceTypes,
						selectedFilters,
						selectedSort,
						updated,
						stringified
					};
					params = {
						city,
						locale: this.props.locale,
						nearLatLng,
						page,
						selectedFilters,
						selectedResourceTypes: selectedResourceTypes.reduce(
							(result, resource) => {
								result = [...result, ...resource.split(',')];

								return result;
							},
							[]
						),
						state,
						isNational
					};
				})
				.catch((error) => {
					this.props.handleMessageNew('An error occured. Please try again');
				});
		} else if (name !== null && name !== 'undefined') {
			nextState = {
				name,
				page,
				selectedSort,
				updated,
				stringified
			};
			params = {
				name: name,
				locale: this.props.locale,
				page,
				isNational: false
			};
		}
		this.setState(nextState);
		localStorage.setItem('lastSearch', this.props.history.location.pathname);
		fetchOrganizations(params).then((data) =>
			this.processSearchResults(data, nextPage)
		);
	}

	fetchNextSearchResultsPage() {
		this.fetchSearchResults(true);
	}

	findResource(slug) {
		const searchResults = this.state.searchResults.slice();
		for (let i = 0; i < this.state.searchResults.length; i++) {
			if (searchResults[i].slug === slug) {
				return searchResults[i];
			}
		}
		return null;
	}

	processSearchResults(data, nextPage) {
		const newOrgs = (data?.organizations || []).map((org) => ({
			...org,
			resource_type: 'Organization'
		}));

		this.setState((prevState) => ({
			endOfList: newOrgs.length === 0,
			searching: false,
			searchDisabled: false,
			printDisabled: false,
			searchResults: nextPage
				? prevState.searchResults.concat(newOrgs)
				: newOrgs
		}));
	}

	setSelectedResource(resource) {
		this.setState({
			selectedResource: resource
		});
	}

	setSelectedService(service) {
		this.setState({
			selectedService: service
		});
	}

	parseParams(params) {
		var inState = {},
			nearAddress = '',
			nearLatLng = null,
			isNational = true,
			selectedResourceTypes = [],
			selectedFilters = [],
			selectedSort = 'best',
			name = null;
		if (params.in) {
			inState = {long_name: decodeURIComponent(params.in)};
		}

		if (params.place) {
			nearAddress = decodeURIComponent(params.place);
		}

		if (params.near) {
			var latLng = decodeURIComponent(params.near).split(',');
			nearLatLng = {
				lat: parseFloat(latLng[0]),
				lng: parseFloat(latLng[1])
			};
		}

		if (params.national && params.national == 'local') {
			isNational = false;
		}

		if (params.for && params.for !== 'any') {
			selectedResourceTypes = decodeURIComponent(params.for).split(',');
			selectedResourceTypes.sort();
		}

		if (params.filter && params.filter !== 'all') {
			selectedFilters = decodeURIComponent(params.filter).split(',');
			selectedFilters.sort();
		}

		if (params.sort) {
			selectedSort = params.sort;
		}

		if (params.name) {
			name = params.name;
		}

		return {
			selectedResourceTypes,
			inState,
			nearAddress,
			nearLatLng,
			isNational,
			selectedFilters,
			selectedSort,
			name
		};
	}

	checkForURLUpdates(ev) {
		let {
			inState,
			nearAddress,
			nearLatLng,
			isNational,
			selectedResourceTypes,
			selectedFilters,
			selectedSort,
			name
		} = this.parseParams(this.props.match.params);
		let updated = false;
		let stringified = JSON.stringify({
			nearLatLng,
			isNational,
			selectedResourceTypes,
			selectedFilters,
			selectedSort,
			name
		});
		if (stringified !== this.state.lastSearch) {
			updated = true;
		}
		return {
			inState,
			nearAddress,
			nearLatLng,
			isNational,
			selectedResourceTypes,
			selectedFilters,
			selectedSort,
			name,
			updated,
			stringified
		};
	}

	render() {
		let mapResources = [];

		if (
			this.state.searchResults ||
			this.state.selectedResource ||
			this.state.selectedService
		) {
			switch (this.props.match.path) {
				case '/:locale/resource/:id':
					mapResources = this.state.selectedResource
						? [this.state.selectedResource]
						: [];
					break;
				case '/:locale/resource/:id/service/:serviceId':
					mapResources = this.state.selectedService
						? [this.state.selectedService]
						: [];
					break;
				default:
					mapResources = this.state.searchResults;
					break;
			}
		}

		const isMobile = this.props.width < breakpoints['sm'];
		const infographic = this.getInfographic();
		const selectedResourceTypes =
			typeof this.state.selectedResourceTypes !== 'undefined' &&
			this.state.selectedResourceTypes.length
				? this.state.selectedResourceTypes
				: [];
		//on the search results, enforce a distance limitation of 100 miles
		const mapMaxDistance =
			this.props.match.path ===
			'/:locale/search/:in/:place/:near/:national/:for/:filter/:sort'
				? 100
				: null;

		return (
			<div className={'container--map ' + this.props.classes.containerMap}>
				<Grid container spacing={0} alignItems="stretch">
					<Grid item xs={12} sm={8}>
						<div className="container--search">
							<Switch>
								<Route
									exact
									path="/"
									render={(props) => (
										<SearchFormPage
											{...props}
											{...this.props}
											{...this.state}
											clearResourceTypes={this.clearResourceTypes}
											handlePlaceChange={this.handlePlaceChange}
											handleSearchButtonClick={this.handleSearchButtonClick}
											handleNationalCheckBox={this.handleNationalCheckBox}
											handleResourceTypeSelect={this.handleResourceTypeSelect}
											infographic={infographic}
											nearAddress={this.props.nearAddress}
											searching={this.state.searching}
											searchDisabled={this.state.searchDisabled}
											classes={null}
											handleSearchByOrgName={this.handleSearchByOrgName}
											handleOrgSelection={this.handleOrgSelection}
										/>
									)}
								/>
								<Route
									path="/:locale/search/:name/:sort"
									render={(props) => (
										<SearchResultsPage
											{...props}
											{...this.state}
											clearResourceTypes={this.clearResourceTypes}
											clearSearchFilters={this.clearSearchFilters}
											clearSearchStatus={this.clearSearchStatus}
											country={this.props.country}
											fetchNextSearchResultsPage={
												this.fetchNextSearchResultsPage
											}
											fetchSearchResults={this.fetchSearchResults}
											handleListRemoveFavorite={
												this.props.handleListRemoveFavorite
											}
											handleFavoriteUpdate={this.props.handleFavoriteUpdate}
											handleListNew={this.props.handleListNew}
											handleLogOut={this.props.handleLogOut}
											handleMessageNew={this.props.handleMessageNew}
											handlePlaceChange={this.handlePlaceChange}
											handlePrintClick={this.handlePrintClick}
											handleSearchButtonClick={this.handleSearchButtonClick}
											handleNationalCheckBox={this.handleNationalCheckBox}
											handleResourceTypeSelect={this.handleResourceTypeSelect}
											handleRequestOpen={this.props.handleRequestOpen}
											handleSortSelect={this.handleSortSelect}
											infographic={isMobile && infographic}
											lists={this.props.lists}
											locale={this.props.locale}
											mapResources={mapResources}
											mapMaxDistance={mapMaxDistance}
											printDisabled={this.state.printDisabled}
											searchDisabled={this.state.searchDisabled}
											searching={this.state.searching}
											session={this.props.session}
											t={this.props.t}
											user={this.props.user}
											userData={this.props.userData}
										/>
									)}
								/>
								<Route
									path="/:locale/search/:in/:place/:near/:national/:for/:filter/:sort"
									render={(props) => (
										<SearchResultsPage
											{...props}
											{...this.state}
											clearResourceTypes={this.clearResourceTypes}
											clearSearchFilters={this.clearSearchFilters}
											clearSearchStatus={this.clearSearchStatus}
											country={this.props.country}
											fetchNextSearchResultsPage={
												this.fetchNextSearchResultsPage
											}
											fetchSearchResults={this.fetchSearchResults}
											handleListRemoveFavorite={
												this.props.handleListRemoveFavorite
											}
											handleFavoriteUpdate={this.props.handleFavoriteUpdate}
											handleListNew={this.props.handleListNew}
											handleLogOut={this.props.handleLogOut}
											handleMessageNew={this.props.handleMessageNew}
											handlePlaceChange={this.handlePlaceChange}
											handlePrintClick={this.handlePrintClick}
											handleSearchButtonClick={this.handleSearchButtonClick}
											handleNationalCheckBox={this.handleNationalCheckBox}
											handleResourceTypeSelect={this.handleResourceTypeSelect}
											handleRequestOpen={this.props.handleRequestOpen}
											handleFilterSelect={this.handleFilterSelect}
											handleSortSelect={this.handleSortSelect}
											infographic={isMobile && infographic}
											lists={this.props.lists}
											locale={this.props.locale}
											mapResources={mapResources}
											mapMaxDistance={mapMaxDistance}
											nearAddress={this.props.nearAddress}
											printDisabled={this.state.printDisabled}
											searchDisabled={this.state.searchDisabled}
											searching={this.state.searching}
											searchCenter={this.state.nearLatLng}
											session={this.props.session}
											showWalkinCheckbox={
												false &&
												selectedResourceTypes.filter((item) => {
													return (
														typeof ResourceTypes.resourceCategoryIndex[item] !==
															'undefined' &&
														ResourceTypes.resourceCategoryIndex[item]
															.category === 'Legal'
													);
												}).length > 0
											}
											t={this.props.t}
											user={this.props.user}
											userData={this.props.userData}
										/>
									)}
								/>
								<Route
									exact
									path="/:locale/resource/:id"
									render={(props) => (
										<DetailPage
											{...props}
											handleFavoriteUpdate={this.props.handleFavoriteUpdate}
											handleListRemoveFavorite={
												this.props.handleListRemoveFavorite
											}
											handleListNew={this.props.handleListNew}
											handleLogOut={this.props.handleLogOut}
											handleMessageNew={this.props.handleMessageNew}
											handleRequestOpen={this.props.handleRequestOpen}
											handleResourceBackButton={this.handleResourceBackButton}
											lists={this.props.lists}
											locale={this.props.locale}
											mapResources={mapResources}
											resource={this.getCachedResource(props.match.params.id)}
											service={this.state.selectedService}
											setSelectedResource={this.setSelectedResource}
											setSelectedService={this.setSelectedService}
											session={this.props.session}
											t={this.props.t}
											user={this.props.user}
											userData={this.props.userData}
										/>
									)}
								/>
								<Route
									path="/:locale/resource/:id/service/:serviceId"
									render={(props) => (
										<DetailPage
											{...props}
											handleFavoriteUpdate={this.props.handleFavoriteUpdate}
											handleListRemoveFavorite={
												this.props.handleListRemoveFavorite
											}
											handleListNew={this.props.handleListNew}
											handleLogOut={this.props.handleLogOut}
											handleMessageNew={this.props.handleMessageNew}
											handleRequestOpen={this.props.handleRequestOpen}
											handleResourceBackButton={this.handleResourceBackButton}
											lists={this.props.lists}
											locale={this.props.locale}
											mapMaxDistance={mapMaxDistance}
											mapResources={mapResources}
											resource={this.getCachedResource(props.match.params.id)}
											service={this.state.selectedService}
											setSelectedResource={this.setSelectedResource}
											setSelectedService={this.setSelectedService}
											session={this.props.session}
											t={this.props.t}
											user={this.props.user}
											userData={this.props.userData}
										/>
									)}
								/>
							</Switch>
						</div>
					</Grid>
					{!isMobile && (
						<Grid item xs={12} sm={4} className="hide--on-print">
							<Sticky>
								<div>
									<AsylumConnectMap
										containerElement={
											<div
												style={{
													width: this.state.mapWidth,
													height: window.innerHeight + 'px'
												}}
											/>
										}
										country={this.props.country}
										history={this.props.history}
										infographic={
											this.props.match.path ===
												'/:locale/search/:in/:place/:near/:national/:for/:filter/:sort' &&
											infographic
										}
										loadingElement={
											<div
												style={{
													width: '100%',
													height: window.innerHeight + 'px'
												}}
											/>
										}
										locale={this.props.locale}
										mapElement={
											<div
												style={{
													width: this.state.mapWidth,
													height: window.innerHeight + 'px'
												}}
											/>
										}
										mapMaxDistance={mapMaxDistance}
										ref={(el) => (this.ACMap = el)}
										resources={mapResources}
										searchCenter={this.state.nearLatLng}
										t={this.props.t}
									/>
								</div>
							</Sticky>
						</Grid>
					)}
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(withWidth(MapPage));
