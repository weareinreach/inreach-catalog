import React from 'react';
import PropTypes from 'prop-types';

import Fa from 'react-fontawesome';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

import AsylumConnectButton from './AsylumConnectButton';
import AsylumConnectBackButton from './AsylumConnectBackButton';
import Loading from './Loading';
import ResourceListItem from './ResourceListItem';

const styles = (theme) => ({
	container: {
		maxWidth: '720px',
		margin: '3rem 0 5rem'
	},
	footer: {
		backgroundColor: theme.palette.common.blue,
		color: theme.palette.common.darkWhite,
		minHeight: '180px',
		padding: '3rem 0'
	},
	minHeight350: {minHeight: '350px'},
	marginBottom: {marginBottom: '2rem'},
	marginLeft: {marginLeft: '1rem'},
	marginRight: {marginRight: '1rem'},
	marginTop: {marginTop: '1.5rem'},
	mainRow: {
		borderBottom: `1px solid ${theme.palette.common.darkGrey}`,
		margin: '1rem 0px .5rem',
		paddingBottom: '1rem'
	},
	textWhite: {color: theme.palette.common.darkWhite},
	tooltip: {fontFamily: 'sans-serif'},
	favoritesList: {
		listStyle: 'none',
		display: 'flex',
		flexDirection: 'column',
		padding: 0
	},
	favoriteItem: {
		display: 'flex',
		padding: theme.spacing(1, 0)
	},
	listItem: {
		textTransform: 'capitalize',
		'&:hover': {
			color: theme.palette.common.blue
		}
	},
	listName: {
		textTransform: 'capitalize'
	},
	rightMenu: {
		display: 'flex',
		justifyContent: 'flex-end'
	},
	backButton: {
		marginLeft: theme.spacing(-1),
		marginBottom: theme.spacing(2)
	},
	pullRight: {
		alignSelf: 'flex-end'
	}
});

const FavoritesList = ({
	anchorEl,
	classes,
	handleListSelect,
	handleMenuOpen,
	handleMenuClose,
	handleMessageNew,
	handleRemoveFavorite,
	handleRequestOpen,
	history,
	loadingResources,
	locale,
	list,
	lists,
	match,
	open,
	publicList,
	resources,
	session,
	userData,
	hasAccess,
	isOwner
}) => {
	if (!session) {
		return (
			<Typography
				className={classes.minHeight350}
				variant="body1"
				align="center"
				data-test-id="favorites-page-header-text"
			>
				You must be logged in to use favorites.
			</Typography>
		);
	}

	if (list && !hasAccess && !publicList) {
		return (
			<Grid
				container
				className={null}
				direction="column"
				alignItems="center"
				spacing={1}
			>
				<Grid item xs={12} md={6}>
					<Typography
						className={classes.marginTop}
						variant="body1"
						align="center"
					>
						Sorry! It seems you don't have access to this list!
					</Typography>
				</Grid>
			</Grid>
		);
	}
	return (
		<Grid
			container
			className={null}
			direction="column"
			alignItems="center"
			spacing={1}
		>
			<Grid item xs={12} md={6}>
				<Typography
					className={classes.marginTop}
					variant="h1"
					align="center"
					data-test-id="favorites-page-title-text"
				>
					{publicList ? publicList : 'Favorites'}
				</Typography>
				{!publicList && isOwner && (
					<Typography
						className={classes.marginTop}
						variant="body1"
						align="center"
						data-test-id="favorites-page-header-text"
					>
						Your favorites lists are only visible to you and anyone you choose
						to share your lists with.
					</Typography>
				)}
				{!publicList && !isOwner && (
					<Typography
						className={classes.marginTop}
						variant="body1"
						align="center"
						data-test-id="favorites-page-header-text"
					>
						This list was shared with you.
					</Typography>
				)}

				{!list && (
					<>
						<Grid
							item
							xs={12}
							container
							direction="row"
							justify="space-between"
							alignItems="center"
							spacing={1}
							className={classes.marginTop}
						>
							<Grid item xs={12} md={6}>
								{lists.length > 0 && (
									<Typography className={classes.listName} variant="h3">
										Select A List
									</Typography>
								)}
							</Grid>
							<Grid item xs={12} md={6} className={classes.rightMenu}>
								<AsylumConnectButton
									className={classes.pullRight}
									onClick={() => handleRequestOpen('listNew/favoritesList')}
									variant="secondary"
									testIdName="favorites-page-create-new-list-button"
								>
									<Fa className={classes.marginRight} name="plus" /> Create New
									List
								</AsylumConnectButton>
							</Grid>
						</Grid>
						{lists.length > 0 ? (
							<ul className={classes.favoritesList}>
								{lists.map((listOption) => (
									<li
										key={listOption._id}
										onClick={() => handleListSelect(listOption)}
										selected={list && listOption._id === list._id}
										className={classes.favoriteItem}
										data-test-id={'favorites-page-list-item-' + listOption}
									>
										<Typography variant="h4" className={classes.listItem}>
											{listOption.name}
										</Typography>
									</li>
								))}
							</ul>
						) : (
							<Typography
								className={classNames(classes.marginBottom, classes.marginTop)}
								variant="body1"
								align="center"
								data-test-id="favorites-page-body-text"
							>
								You haven't created any lists yet.
							</Typography>
						)}
					</>
				)}
			</Grid>

			{list && (
				<Grid container item xs={12} md={6} className={classes.marginTop}>
					<Grid item xs={12}>
						<AsylumConnectBackButton
							className={classes.backButton}
							color="default"
							text="Back"
							onClick={() => history.goBack()}
						/>
					</Grid>
					<Grid container direction="row" justify="space-between" spacing={1}>
						<Grid item xs={12} md={6}>
							<Typography className={classes.listName} variant="h3">
								{list.name}
							</Typography>
						</Grid>
						<Grid item xs={12} md={6} className={classes.rightMenu}>
							<Tooltip
								className={classes.tooltip + ' hide--on-print'}
								classes={{tooltipPlacementTop: 'badge-tooltipTop'}}
								title="Print Favorites"
								placement="top"
							>
								<IconButton
									color="secondary"
									style={{height: 'auto'}}
									onClick={() => {
										window.print();
									}}
								>
									<Fa name="print" />
								</IconButton>
							</Tooltip>
							{isOwner && (
								<AsylumConnectButton
									className={classes.marginLeft}
									onClick={() =>
										session
											? handleRequestOpen(
													'share/collection/' + list._id + '/' + list.name
											  )
											: handleMessageNew(
													'You must be logged in to share resources'
											  )
									}
									variant="secondary"
								>
									Share
								</AsylumConnectButton>
							)}
						</Grid>
					</Grid>
					<Grid container justify="center">
						<div className={classes.minHeight350}>
							{loadingResources ? (
								<Loading />
							) : (
								<div>
									{resources.map(
										(resource) =>
											resource && (
												<ResourceListItem
													isOnFavoritesList={true}
													isOnPublicList={publicList}
													handleMessageNew={handleMessageNew}
													handleListRemoveFavorite={handleRemoveFavorite}
													history={history}
													key={resource._id}
													resource={resource}
													format="favorites"
													userData={userData}
													locale={locale}
													isOwner={isOwner}
												/>
											)
									)}
								</div>
							)}
							{!loadingResources && list && resources.length === 0 && (
								<Typography className={classes.marginTop} variant="body1">
									You haven't added any resources to this list yet.
								</Typography>
							)}
						</div>
					</Grid>
				</Grid>
			)}
		</Grid>
	);
};

FavoritesList.defaultProps = {
	anchorEl: null,
	list: null,
	publicList: null,
	session: null
};

FavoritesList.propTypes = {
	anchorEl: PropTypes.object,
	classes: PropTypes.object.isRequired,
	handleListSelect: PropTypes.func.isRequired,
	handleMenuOpen: PropTypes.func.isRequired,
	handleMenuClose: PropTypes.func.isRequired,
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestOpen: PropTypes.func.isRequired,
	handleRemoveFavorite: PropTypes.func.isRequired,
	loadingResources: PropTypes.bool.isRequired,
	list: PropTypes.object,
	lists: PropTypes.arrayOf(PropTypes.object).isRequired,
	open: PropTypes.bool.isRequired,
	publicList: PropTypes.bool,
	resources: PropTypes.arrayOf(PropTypes.object).isRequired,
	session: PropTypes.string,
	hasAccess: PropTypes.bool.isRequired,
	isOwner: PropTypes.bool.isRequired
};

export default withStyles(styles)(FavoritesList);
