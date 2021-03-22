import PropTypes from 'prop-types';
import React from 'react';
import {withRouter} from 'react-router-dom';

import FavoritesList from './FavoritesList';
import FavoritesListMobile from './FavoritesListMobile';
import withWidth from './withWidth';
import {breakpoints} from '../theme';
import {deleteListFavorite, fetchOrganizations} from '../utils/api';

class FavoritesListContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			anchorEl: null,
			loadingResources: this.props.match.params.listId ? true : false,
			open: false,
			publicList: null,
			resources: []
		};

		this.fetchListResources = this.fetchListResources.bind(this);
		this.fetchResources = this.fetchResources.bind(this);
		this.handleListSelect = this.handleListSelect.bind(this);
		this.handleMenuOpen = this.handleMenuOpen.bind(this);
		this.handleMenuClose = this.handleMenuClose.bind(this);
		this.handleRemoveFavorite = this.handleRemoveFavorite.bind(this);
	}

	componentDidMount() {
		const {listId} = this.props.match.params;
		const {lists, locale} = this.props;
		const {resources} = this.state;

		if (listId && !resources.length) {
			this.fetchListResources(listId);
		}
	}

	componentWillReceiveProps(nextProps) {
		const {locale} = this.props;
		if (nextProps.lists.length && !nextProps.match.params.listId) {
			this.setState({publicList: null});
			// this.props.history.replace(
			// 	`/${locale}/favorites/${nextProps.lists[0]._id}`
			// );
		}
		if (this.props.match.params.listId !== nextProps.match.params.listId) {
			this.setState({loadingResources: true});
			this.fetchListResources(nextProps.match.params.listId);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.state.loadingResources &&
			this.props.match.params.listId &&
			!prevProps.lists.length &&
			this.props.lists.length
		) {
			this.fetchListResources(this.props.match.params.listId);
		}
	}

	fetchListResources(listId) {
		const list = this.props.lists.find(
			(collection) => collection._id === listId
		);

		if (list && list.items.length) {
			this.fetchResources(list.items);
		} else if (list && !list.items.length) {
			this.setState({
				loadingResources: false,
				resources: []
			});
		}
	}

	fetchResources(resources) {
		// determine which org ids to search for
		const ids = resources.map(({fetchable_id, orgId}) =>
			orgId ? orgId : fetchable_id
		);

		fetchOrganizations({ids}).then(({organizations}) => {
			const orgDict = organizations?.reduce((result, org) => {
				result[org?._id] = org;

				return result;
			}, {});

			const orgs =
				resources?.map((resource) => {
					const org =
						orgDict?.[resource?.orgId] || orgDict?.[resource?.fetchable_id];
					// extract list items that are services
					if (resource.orgId && org) {
						const service = org?.services?.find(
							(service) => service._id === resource.fetchable_id
						);

						if (service) {
							service.organization = org;
						}

						return service || null;
					}

					return org;
				}) || [];

			this.setState({
				loadingResources: false,
				resources: orgs
			});
		});
	}

	handleListSelect(list) {
		const {history, locale} = this.props;
		history.push(`/${locale}/favorites/${list._id}`);
		this.handleMenuClose();
	}

	handleMenuOpen(event) {
		this.setState({open: true, anchorEl: event.currentTarget});
	}

	handleMenuClose() {
		this.setState({open: false, anchorEl: null});
	}

	handleRemoveFavorite(resourceId) {
		const {listId} = this.props.match.params;

		deleteListFavorite({
			listId,
			itemId: resourceId,
			userId: this.props?.userData?._id
		})
			.then(() => {
				this.setState((prevState) => ({
					resources: prevState.resources.filter(
						(resource) => resource._id !== resourceId
					)
				}));
				this.props.handleListRemoveFavorite(parseInt(listId), resourceId);
			})
			.catch((error) => {
				this.props.handleMessageNew('Oops! Something went wrong.');
			});
	}

	render() {
		const currentList = this.props.match.params.listId
			? this.props.lists.find(
					(list) => list._id === this.props.match.params.listId
			  )
			: null;
		const isMobile = this.props.width < breakpoints['sm'];
		if (isMobile) {
			return (
				<FavoritesListMobile
					{...this.state}
					{...this.props}
					list={currentList}
					handleListSelect={this.handleListSelect}
					handleMenuOpen={this.handleMenuOpen}
					handleMenuClose={this.handleMenuClose}
					handleRemoveFavorite={this.handleRemoveFavorite}
					userData={this.props.userData}
				/>
			);
		} else {
			return (
				<FavoritesList
					{...this.state}
					{...this.props}
					list={currentList}
					handleListSelect={this.handleListSelect}
					handleMenuOpen={this.handleMenuOpen}
					handleMenuClose={this.handleMenuClose}
					handleRemoveFavorite={this.handleRemoveFavorite}
					userData={this.props.userData}
				/>
			);
		}
	}
}

FavoritesListContainer.defaultProps = {
	session: null,
	user: null
};

FavoritesListContainer.propTypes = {
	// handleListRemoveFavorite: PropTypes.func.isRequired,
	handleFavoriteUpdate: PropTypes.func.isRequired,
	handleLogOut: PropTypes.func.isRequired,
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestOpen: PropTypes.func.isRequired,
	lists: PropTypes.arrayOf(PropTypes.object).isRequired,
	session: PropTypes.string,
	user: PropTypes.string
};

export default withRouter(withWidth(FavoritesListContainer));
