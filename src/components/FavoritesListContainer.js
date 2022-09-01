import PropTypes from 'prop-types';
import React from 'react';
import {withRouter} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import FavoritesList from './FavoritesList';
import FavoritesListMobile from './FavoritesListMobile';
import withWidth from './withWidth';
import {breakpoints} from '../theme';
import {deleteListFavorite, fetchOrganizations, fetchList} from '../utils/api';
import {belongsToUser, hasAccessToList, VISIBILITY} from '../utils/utils';

class FavoritesListContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			anchorEl: null,
			loadingResources: this.props.match.params.listId ? true : false,
			open: false,
			resources: [],
			list: null
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
		const {resources} = this.state;
		if (listId) {
			fetchList(listId).then((list) => {
				this.setState({list: list});
				if (list && !resources.length) {
					this.fetchListResources(list);
				}
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		const {locale} = this.props;
		if (!nextProps.match.params.listId) {
			this.setState({list: null});
		}
		if (nextProps.lists.length && !nextProps.match.params.listId) {
			this.setState({publicList: null});
		}
		if (
			nextProps.match.params.listId &&
			this.props.match.params.listId !== nextProps.match.params.listId
		) {
			fetchList(nextProps.match.params.listId).then((list) => {
				this.setState({loadingResources: true, list: list});
				this.fetchListResources(list);
			});
		}
	}

	fetchListResources(list) {
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
				this.props.handleMessageNew(
					<FormattedMessage
						id="error.unspecified"
						defaultMessage="Oops! Something went wrong."
						description="Message saying there was an error deleting the favorites list"
					/>
				);
			});
	}

	render() {
		const {userData} = this.props;
		const currentList = this.state.list || null;
		const publicList = currentList
			? currentList.visibility === VISIBILITY.PUBLIC
			: false;
		// check if the current user has access to list
		// true when list belongs to user, list has been shared with user, or list is public list
		const isOwner = currentList ? belongsToUser(userData, currentList) : true;
		const hasAccess =
			publicList || isOwner
				? true
				: currentList
				? hasAccessToList(userData, currentList)
				: false;
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
					publicList={publicList}
					hasAccess={hasAccess}
					isOwner={isOwner}
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
					publicList={publicList}
					hasAccess={hasAccess}
					isOwner={isOwner}
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
	handleFavoriteUpdate: PropTypes.func,
	handleLogOut: PropTypes.func.isRequired,
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestOpen: PropTypes.func.isRequired,
	lists: PropTypes.arrayOf(PropTypes.object).isRequired,
	session: PropTypes.string,
	user: PropTypes.string
};

export default withRouter(withWidth(FavoritesListContainer));
