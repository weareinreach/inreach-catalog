import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-modal';
import {FormattedMessage} from 'react-intl';
import MediaQuery from 'react-responsive';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';

import AsylumConnectPopUp from './AsylumConnectPopUp';
import {RedHeartIcon} from './icons';
import {createList, createListFavorite, deleteListFavorite} from '../utils/api';
import {isInList} from '../utils/utils';

const styles = (theme) => ({
	viewYourFavoritesText: {
		color: theme.palette.secondary[500],
		'&:hover': {
			color: theme.palette.secondary[900]
		},
		fontWeight: theme.typography.fontWeightMedium,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	textBlue: {color: theme.palette.common.blue},
	favoriteItem: {
		justifyContent: 'space-between'
	}
});

class SaveToFavoritesButton extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			modal: false
		};

		this.state = {
			anchorEl: null,
			open: false
		};

		this.handleCreateList = this.handleCreateList.bind(this);
		this.handleFetchError = this.handleFetchError.bind(this);
		this.handleMenuToggle = this.handleMenuToggle.bind(this);
		this.handleMenuClose = this.handleMenuClose.bind(this);
		this.handleRemoveFavorite = this.handleRemoveFavorite.bind(this);
		this.handleSaveToFavorites = this.handleSaveToFavorites.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
	}

	handleCreateList(currentTarget) {
		const {user} = this.props;

		createList({name: 'My List', userId: user})
			.then((data) => {
				if (data.status === 200 && data.list) {
					this.handleSaveToFavorites(data.list._id);
				} else {
					this.handleFetchError();
				}
			})
			.catch(this.handleFetchError);
	}

	handleFetchError(error) {
		const {handleLogOut, handleMessageNew} = this.props;
		if (error.response && error.response.status === 401) {
			handleMessageNew(
				<FormattedMessage
					id="app.inactivity-sign-in"
					defaultMessage="Due to inactivity, please sign in to confirm your identity."
					description="error, must sign in"
				/>
			);
			handleLogOut();
		} else if (error.response && error.response.status === 403) {
			this.handleOpen('password');
		} else {
			handleMessageNew(
				<FormattedMessage
					id="error.unspecified"
					defaultMessage="Oops! Something went wrong."
					description="generic error message"
				/>
			);
		}
	}

	handleMenuToggle(event) {
		const {currentTarget} = event;
		if (!this.props.session) {
			this.setState({modal: true});
		} else if (true && this.props.lists.length < 1) {
			this.handleCreateList(currentTarget);
		} else if (this.state.open) {
			this.setState({open: false, anchorEl: null});
		} else {
			this.setState({open: true, anchorEl: event.currentTarget});
		}
	}

	handleMenuClose() {
		this.setState({open: false, anchorEl: null});
	}

	handleRemoveFavorite(listId) {
		this.handleMenuClose();
		const {handleListRemoveFavorite, resourceId, user} = this.props;

		deleteListFavorite({listId, itemId: resourceId, userId: user}).then(() => {
			handleListRemoveFavorite(listId, resourceId);
		});
	}

	handleSaveToFavorites(listId) {
		this.handleMenuClose();
		const {
			resourceId,
			parentResourceId,
			user,
			lists,
			handleMessageNew,
			handleFavoriteUpdate
		} = this.props;
		const list = lists ? lists.find((it) => it._id === listId) : null;
		if (list && isInList(resourceId, list)) {
			handleMessageNew(
				<FormattedMessage
					id="app.feature-save-reseource-already-in-list"
					defaultMessage="resource already in list"
					description="warning message that resource is already in the favorites list"
				/>
			);
			return;
		}
		createListFavorite({
			listId,
			itemId: resourceId,
			orgId: parentResourceId || null,
			userId: user
		})
			.then((result) => {
				if (result.status === 200 && result.updated) {
					handleFavoriteUpdate(result.list);
				} else {
					this.handleFetchError();
				}
			})
			.catch(this.handleFetchError);
	}

	handleOpen(type) {
		this.setState({modal: false});
		this.props.handleRequestOpen(type);
	}

	render() {
		const {
			handleMenuClose,
			handleMenuToggle,
			handleRemoveFavorite,
			handleSaveToFavorites
		} = this;
		const {anchorEl, open} = this.state;
		const {classes, lists, resourceId} = this.props;
		const isFavorite =
			lists && lists.length > 0
				? lists.some((list) =>
						list.items.some((item) => item.fetchable_id === resourceId)
				  )
				: false;

		return (
			<div className={this.props.className}>
				<IconButton onClick={handleMenuToggle}>
					<RedHeartIcon width={'24px'} fill={isFavorite} />
				</IconButton>
				<MediaQuery minDeviceWidth={603}>
					<Modal
						ariaHideApp={false}
						style={{
							overlay: {
								zIndex: 9999
							},
							content: {
								position: 'absolute',
								top: '25%',
								left: '30%',
								bottom: 'auto',
								width: '40%',
								padding: 0,
								fontFamily: '"Inter", sans-serif',
								background: '#FFFFFF'
							}
						}}
						isOpen={this.state.modal}
					>
						<div
							style={{textAlign: 'left', paddingTop: '13px', height: '20px'}}
						>
							<div
								style={{
									position: 'absolute',
									width: '100%',
									height: 0,
									top: '38px',
									border: '1px solid #E9E9E9',
									zIndex: 0
								}}
							></div>
							<div
								style={{
									left: '46%',
									position: 'absolute',
									display: 'inline-block',
									borderRadius: '50%',
									width: '40px',
									height: '40px',
									backgroundColor: '#FFFFFF',
									zIndex: 1,
									boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.25)'
								}}
							>
								<div style={{paddingTop: '10px', textAlign: 'center'}}>
									<RedHeartIcon width={'24px'} />
								</div>
							</div>
						</div>
						<div style={{paddingTop: '40px', padding: '8%'}}>
							<p>
								<FormattedMessage
									id="error.sign-in-to-save-resources"
									defaultMessage="Must be signed in to save resource"
									description="error message - must be signed in"
								/>
							</p>
							<p
								style={{
									fontWeight: 'bold'
								}}
							>
								<FormattedMessage
									id="app.unlock-features-with-account-prompt"
									defaultMessage="With a free InReach account you can unlock additional features:"
									description="Options title"
								/>
							</p>
							<div>
								<li>
									<FormattedMessage
										id="app.feature-save-resource-lists"
										defaultMessage="Save and share personalised resources lists"
										description="list item - save and share"
									/>
								</li>
								<br />
								<li>
									<FormattedMessage
										id="app.feature-rate-review-resources"
										defaultMessage="Leave public rating/reviews on resources"
										description="list item - Leave ratings and reviews"
									/>
								</li>
								<br />
								<li>
									<FormattedMessage
										id="app.feature-suggest-resource"
										defaultMessage="Suggest resources in your area"
										description="list item - suggest a resource"
									/>
								</li>
								<br />
								<li>
									<FormattedMessage
										id="app.feature-claim-resource-page"
										defaultMessage="Claim your organisation's profile page"
										description="list item - claim your organisation"
									/>
								</li>
							</div>
						</div>
						<div style={{textAlign: 'center', paddingBottom: '15px'}}>
							<Button
								style={{
									display: 'inline-block',
									background: '#4792DA',
									borderRadius: '100px',
									fontWeight: 'bold',
									lineHeight: '22px',
									width: '220px',
									height: '34px',
									color: '#FFFFFF',
									letterSpacing: '1px',
									textTransform: 'uppercase',
									paddingTop: '5px'
								}}
								onClick={() => this.handleOpen('signup')}
							>
								<FormattedMessage
									id="account.sign-in"
									defaultMessage="Sign In"
									description="Sign in button"
								/>
								/
								<FormattedMessage
									id="account.sign-up"
									defaultMessage="Sign Up"
									description="Sign up button"
								/>
							</Button>
						</div>
						<div style={{paddingBottom: '20px', textAlign: 'center'}}>
							<Button
								style={{
									display: 'inline-block',
									background: '#FFFFFF',
									borderRadius: '100px',
									fontWeight: 'bold',
									lineHeight: '22px',
									width: '220px',
									height: '34px',
									letterSpacing: '1px',
									textTransform: 'uppercase',
									border: 'solid',
									color: '#5073B3',
									paddingTop: '5px'
								}}
								onClick={() => {
									this.setState({modal: false});
								}}
							>
								<FormattedMessage
									id="action.close"
									defaultMessage="close"
									description="close the dialog button"
								/>
							</Button>
						</div>
					</Modal>
				</MediaQuery>
				<MediaQuery maxDeviceWidth={602}>
					<Modal
						ariaHideApp={false}
						style={{
							overlay: {
								zIndex: 9999
							},
							content: {
								position: 'absolute',
								top: '5%',
								bottom: 'auto',
								padding: 0,
								fontFamily: '"Inter", sans-serif',
								background: '#FFFFFF'
							}
						}}
						isOpen={this.state.modal}
					>
						<div
							style={{textAlign: 'left', paddingTop: '13px', height: '20px'}}
						>
							<div
								style={{
									position: 'absolute',
									width: '100%',
									height: 0,
									top: '38px',
									border: '1px solid #E9E9E9',
									zIndex: 0
								}}
							></div>
							<div
								style={{
									left: '46%',
									position: 'absolute',
									display: 'inline-block',
									borderRadius: '50%',
									width: '40px',
									height: '40px',
									backgroundColor: '#FFFFFF',
									zIndex: 1,
									boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.25)'
								}}
							>
								<div style={{paddingTop: '10px', textAlign: 'center'}}>
									<RedHeartIcon width={'24px'} />
								</div>
							</div>
						</div>
						<div style={{paddingTop: '40px', padding: '8%', fontSize: '14px'}}>
							<p>
								<FormattedMessage
									id="error.sign-in-to-save-resources"
									defaultMessage="Must be signed in to save resource"
									description="error message - must be signed in"
								/>
							</p>
							<p
								style={{
									fontWeight: 'bold'
								}}
							>
								<FormattedMessage
									id="app.unlock-features-with-account-prompt"
									defaultMessage="With a free InReach account you can unlock additional features:"
									description="Options title"
								/>
							</p>
							<div>
								<li>
									<FormattedMessage
										id="app.feature-save-resource-lists"
										defaultMessage="Save and share personalised resources lists"
										description="list item - save and share"
									/>
								</li>
								<br />
								<li>
									<FormattedMessage
										id="app.feature-rate-review-resources"
										defaultMessage="Leave public rating/reviews on resources"
										description="list item - Leave ratings and reviews"
									/>
								</li>
								<br />
								<li>
									<FormattedMessage
										id="app.feature-suggest-resource"
										defaultMessage="Suggest resources in your area"
										description="list item - suggest a resource"
									/>
								</li>
								<br />
								<li>
									<FormattedMessage
										id="app.feature-claim-resource-page"
										defaultMessage="Claim your organisation's profile page"
										description="list item - claim your organisation"
									/>
								</li>
							</div>
						</div>
						<div style={{textAlign: 'center', paddingBottom: '15px'}}>
							<Button
								style={{
									display: 'inline-block',
									background: '#4792DA',
									borderRadius: '100px',
									fontWeight: 'bold',
									lineHeight: '22px',
									width: '220px',
									height: '34px',
									color: '#FFFFFF',
									letterSpacing: '1px',
									textTransform: 'uppercase',
									paddingTop: '5px'
								}}
								onClick={() => this.handleOpen('signup')}
							>
								<FormattedMessage
									id="account.sign-in"
									defaultMessage="Sign In"
									description="Sign in button"
								/>
								/
								<FormattedMessage
									id="account.sign-up"
									defaultMessage="Sign Up"
									description="Sign up button"
								/>
							</Button>
						</div>
						<div style={{paddingBottom: '20px', textAlign: 'center'}}>
							<Button
								style={{
									display: 'inline-block',
									background: '#FFFFFF',
									borderRadius: '100px',
									fontWeight: 'bold',
									lineHeight: '22px',
									width: '220px',
									height: '34px',
									letterSpacing: '1px',
									textTransform: 'uppercase',
									border: 'solid',
									color: '#5073B3',
									paddingTop: '5px'
								}}
								onClick={() => {
									this.setState({modal: false});
								}}
							>
								<FormattedMessage
									id="action.close"
									defaultMessage="close"
									description="close the dialog button"
								/>
							</Button>
						</div>
					</Modal>
				</MediaQuery>
				<AsylumConnectPopUp
					id="favorites-menu"
					className="stop-click-propagation"
					anchorEl={anchorEl}
					open={open}
					onClose={handleMenuClose}
					PaperProps={{style: {maxHeight: '300px', marginTop: '48px'}}}
				>
					{lists &&
						lists.length > 0 &&
						lists.map((list) => {
							const isFavoriteItem = list.items.some(
								(item) => item.fetchable_id === resourceId
							);
							return (
								<MenuItem
									data-test-id="search-result-favorite-list-item"
									className={classes.favoriteItem}
									key={list._id}
									onClick={() =>
										isFavoriteItem
											? handleRemoveFavorite(list._id)
											: handleSaveToFavorites(list._id)
									}
								>
									<span>{list.name}</span>
									<RedHeartIcon
										data-test-id="search-result-favorite-button"
										width={'24px'}
										fill={isFavoriteItem}
										style={{float: 'right'}}
									/>
								</MenuItem>
							);
						})}
					<MenuItem
						className={classes.textBlue}
						onClick={() =>
							this.handleOpen(`listNew/saveToFavorites/${resourceId}`)
						}
					>
						<span className={classes.textBlue}>
							<FormattedMessage
								id="favorites.create-new-list"
								defaultMessage="Create new list"
								description="link to create a new list action"
							/>
						</span>
					</MenuItem>
				</AsylumConnectPopUp>
			</div>
		);
	}
}

SaveToFavoritesButton.defaultProps = {
	session: null,
	user: null
};

SaveToFavoritesButton.propTypes = {
	classes: PropTypes.object.isRequired,
	handleLogOut: PropTypes.func.isRequired,
	handleFavoriteUpdate: PropTypes.func.isRequired,
	handleListRemoveFavorite: PropTypes.func.isRequired,
	handleListNew: PropTypes.func.isRequired,
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestOpen: PropTypes.func.isRequired,
	lists: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			id: PropTypes.number
		})
	).isRequired,
	resourceId: PropTypes.string.isRequired,
	session: PropTypes.string,
	user: PropTypes.string
};

export default withStyles(styles)(SaveToFavoritesButton);
