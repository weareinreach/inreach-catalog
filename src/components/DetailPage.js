import React from 'react';
import {FormattedMessage} from 'react-intl';
import Modal from 'react-modal';
import {Element, scroller} from 'react-scroll';
import _ from 'lodash';
import SwipeableViews from 'react-swipeable-views';
import {
	Box,
	Button,
	Divider,
	Grid,
	IconButton,
	TextField,
	Toolbar,
	Typography
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {EditIcon} from './icons';
import classNames from 'classnames';
import AsylumConnectBackButton from './AsylumConnectBackButton';
import AsylumConnectCollapsibleSection from './AsylumConnectCollapsibleSection';
import AsylumConnectMap from './AsylumConnectMap';
import Loading from './Loading';
import About from './DetailAbout';
import Header from './DetailHeader';
import Communities from './DetailCommunities';
import Languages from './DetailLanguages';
import ServiceType from './DetailServiceType';
import Services from './DetailServices';
import Reviews from './DetailReviews';
import ReviewForm from './DetailReviewForm';
import Tools from './DetailTools';
import AccessInstructions from './ResourceAccessInstructions';
import HeaderTabs from './ResourceHeaderTabs';
import DetailPropertyList from './ResourcePropertyList';
import Visit from './ResourceVisit';
import SaveToFavoritesButton from './SaveToFavoritesButton';
import {ShareIcon} from './icons';
import withWidth from './withWidth';
import {
	getCommentsAndReview,
	getOrganizationBySlug,
	getServiceBySlug
} from '../utils/api';
import {combineProperties, seperatePropsByType} from '../utils/propertyMap';
import {getTags} from '../utils/tags';
import {
	bodyLink,
	boldFont,
	breakpoints,
	italicFont,
	dividerSpacing,
	mobilePadding
} from '../theme';
import {getSocialMediaLinks} from './ResourceSocialMedia';

import {
	returnOrgNativeLanguageData,
	returnServiceNativeLanguageData
} from '../utils/utils';
import language from '../utils/language';
import {useIntl} from '../config';
import {OrgPhotoGrid, PhotoGallery} from './OrgPhotos';
import {localeTagMap} from '../utils/locale';

const langCode = language.getLanguageCode();
const provider = language.getLanguageProvider();
const doNativeTranslation =
	langCode !== 'en' && provider === 'inreach' && useIntl ? true : false;

const formatOrganization = (organization) => {
	organization = doNativeTranslation
		? returnOrgNativeLanguageData(organization, langCode)
		: organization;
	return {
		...organization,
		alertMessage: organization?.alert_message
	};
};

const formatService = (service) => {
	service = doNativeTranslation
		? returnServiceNativeLanguageData(service, langCode)
		: service;
	var organization = doNativeTranslation
		? returnOrgNativeLanguageData(service?.organization, langCode)
		: service?.organization;

	return {
		...service,
		alertMessage: organization?.alert_message,
		emails: [getOrgItem(service?.email_id, organization?.emails)],
		locations: [getOrgItem(service?.location_id, organization?.locations)],
		phones: [getOrgItem(service?.phone_id, organization?.phones)],
		schedules: [getOrgItem(service?.schedule_id, organization?.schedules)],
		website: organization?.website
	};
};

const getOrgItem = (id, list = []) => {
	const itemWithId = list.find((item) => item._id === id);

	if (itemWithId) {
		return itemWithId;
	}

	const primaryItem = list.find((item) => item.is_primary);

	if (primaryItem) {
		return primaryItem;
	}

	return null;
};

const styles = (theme) => ({
	tabRoot: {
		minWidth: '0'
	},
	tabLabelContainer: {
		padding: theme.spacing(0, 3)
	},
	tabLabel: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
	},
	tabIndicator: {
		height: '4px'
	},
	container: {
		minHeight: '500px',
		paddingTop: '60px',
		paddingBottom: '60px',
		[theme.breakpoints.down('xs')]: Object.assign(mobilePadding(theme), {
			paddingTop: '0px',
			paddingBottom: '0px',
			backgroundColor: theme.palette.common.white
		})
	},
	cushion: {
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1)
	},
	separator: {
		padding: theme.spacing(0, 1),
		fontSize: '1.25rem',
		'&:after': {
			content: '" "'
		}
	},
	header: {
		borderBottom: '1px solid ' + theme.palette.common.darkGrey
	},
	contentSpacing: {
		margin: theme.spacing(3, 0)
	},
	bottomSpacing: {
		marginBottom: theme.spacing(2)
	},
	mobileSpacing: {
		[theme.breakpoints.down('xs')]: {
			marginTop: theme.spacing(3)
		}
	},
	lineSpacing: {
		lineHeight: '1.4rem'
	},
	sectionSpacing: {
		marginBottom: theme.spacing(0)
	},
	dividerSpacing: dividerSpacing(theme),
	orgName: Object.assign(
		{
			fontSize: '24px',
			display: 'inline-block',
			[theme.breakpoints.down('xs')]: {
				textAlign: 'center',
				fontSize: '24px'
			}
		},
		boldFont(theme)
	),
	headerBadge: {
		display: 'inline-block',
		verticalAlign: 'middle',
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(0.5)
	},
	iconLink: {
		paddingLeft: theme.spacing(0.5),
		paddingRight: theme.spacing(0.5)
	},
	bottomHeaderBadge: {
		[theme.breakpoints.down('xs')]: {
			marginLeft: 0
		}
	},
	bottomVerifiedBadge: {
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center',
			width: '100%'
		}
	},
	verifiedHeaderText: {
		display: 'inline-block',
		fontSize: '16px',
		fontWeight: theme.typography.fontWeightMedium,
		color: theme.palette.text.secondary
	},
	serviceOrg: {
		[theme.breakpoints.down('xs')]: {
			color: theme.palette.common.darkBlack,
			textTransform: 'none',
			fontWeight: 400,
			textAlign: 'center'
		}
	},
	serviceOrgContainer: {
		[theme.breakpoints.down('xs')]: {
			marginTop: theme.spacing(2)
		}
	},
	serviceItemContainer: {
		marginBottom: theme.spacing(2)
	},
	serviceBadge: {
		[theme.breakpoints.down('xs')]: {
			position: 'absolute',
			marginLeft: theme.spacing(-1)
		}
	},
	serviceText: {
		display: 'inline-block',
		marginTop: 0,
		lineHeight: 1.6,
		[theme.breakpoints.down('sm')]: {
			marginLeft: theme.spacing(1)
		},
		[theme.breakpoints.down('xs')]: {
			width: '90%',
			verticalAlign: 'top',
			lineHeight: 1.6,
			paddingLeft: 0,
			marginBottom: theme.spacing(1)
		}
	},
	serviceTooltip: {
		top: theme.spacing(1)
	},
	boldFont: boldFont(theme),
	italicFont: italicFont(theme),
	moreInfo: Object.assign(
		{
			color: theme.palette.common.darkGrey,
			[theme.breakpoints.down('xs')]: {
				color: theme.palette.common.darkBlack,
				textAlign: 'center'
			}
		},
		boldFont(theme)
	),
	bodyLink: bodyLink(theme),
	mobileRatingSummary: {
		[theme.breakpoints.down('xs')]: {
			textAlign: 'center',
			marginTop: theme.spacing(2)
		}
	},
	listLink: {
		'& + &:before': {
			content: '", "'
		}
	},
	dialogBody: {
		minWidth: '600px',
		overflowY: 'auto',
		padding: '5.5rem'
	},
	toolbarRoot: {
		justifyContent: 'space-between'
	},
	toolbarGutters: {
		paddingLeft: '0',
		paddingRight: '0'
	},
	badge: {
		display: 'inline-block'
	},
	editLabel: {
		display: 'inline-block',
		flexShrink: '1',
		alignItems: 'center',
		cursor: 'pointer'
	},
	editText: {
		display: 'inline-block',
		color: theme.palette.primary[400]
	},
	editButton: {
		width: '44px'
	},
	editOrgContainer: {
		maxWidth: '300px'
	},
	editDescription: {
		marginTop: '30px',
		maxWidth: '525px'
	},
	button: {
		margin: '25px 0',
		width: '170px',
		height: '30px',
		borderRadius: '100px',
		textTransform: 'uppercase',
		cursor: 'pointer',
		color: theme.palette.secondary[400]
	},
	red: {
		color: theme.palette.common.white,
		backgroundColor: theme.palette.primary[400],
		'&:hover': {
			backgroundColor: theme.palette.primary[200]
		}
	},
	inputLabel: {
		marginBottom: '3px',
		fontWeight: '600'
	},
	contactInfo: {
		color: theme.palette.secondary[500],
		fill: theme.palette.secondary[500]
	}
});

const EditFocuses = {
	EDIT_ABOUT: 'EDIT_ABOUT',
	EDIT_SERVICE: 'EDIT_SERVICE',
	EDIT_NON_ENG: 'EDIT_NON_ENG',
	EDIT_VISIT: 'EDIT_VISIT'
};

class Detail extends React.Component {
	constructor(props, context) {
		super(props, context);

		const {id, serviceId} = this.props?.match?.params;

		this.state = {
			average_rating: 0,
			comments: [],
			modal: false,
			loading: true,
			ratings: 0,
			organization: null,
			service: null,
			tab: 0,
			isEditing: false,
			editFocus: '',
			editedOrg: null
		};

		this.isServicePage = Boolean(id && serviceId);

		this.tabs = [
			{
				label: (
					<FormattedMessage
						id="resource.about-header"
						defaultMessage="About"
						description="section title for organization details"
					/>
				),
				value: 'about'
			},
			{
				label: (
					<FormattedMessage
						id="resource.visit"
						defaultMessage="Visit"
						description="section title for organization address details"
					/>
				),
				mobileLabel: (
					<FormattedMessage
						id="resource.visit-mobile"
						defaultMessage="Visit"
						description="section title for organization address details"
					/>
				),
				value: 'visit'
			},
			{
				label: (
					<FormattedMessage
						id="resource.photos"
						defaultMessage="Photos"
						description="section title for photos"
					/>
				),
				value: 'photos'
			},
			{
				label: (
					<FormattedMessage
						id="resource.reviews-heading"
						defaultMessage="Reviews"
						description="section title for organization reviews"
					/>
				),
				value: 'reviews'
			}
		];

		this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
		this.handleNewReview = this.handleNewReview.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
		this.handleOrganizationRequest = this.handleOrganizationRequest.bind(this);
		this.handleServiceRequest = this.handleServiceRequest.bind(this);
		this.handleSupplementalInfoRequest =
			this.handleSupplementalInfoRequest.bind(this);
		this.handleSwipeChange = this.handleSwipeChange.bind(this);
		this.handleTabClickDesktop = this.handleTabClickDesktop.bind(this);
		this.handleTabClickMobile = this.handleTabClickMobile.bind(this);
		this.requestData = this.requestData.bind(this);
		this.setIsEditing = this.setIsEditing.bind(this);
		this.renderEditButton = this.renderEditButton.bind(this);
		this.renderSaveButtons = this.renderSaveButtons.bind(this);
		this.handleEditOrgChange = this.handleEditOrgChange.bind(this);
		this.handleEditOrgSubmit = this.handleEditOrgSubmit.bind(this);
	}

	componentWillMount() {
		window.scroll(0, 0);

		this.requestData();
	}

	componentDidUpdate(prevProps, prevState) {
		const params = this.props?.match?.params;
		const oldParams = prevProps?.match?.params;

		if (
			params.id !== oldParams.id ||
			params.serviceId !== oldParams.serviceId
		) {
			this.isServicePage = Boolean(params.id && params.serviceId);

			this.requestData();
		}

		// Checks current path from url and compares to path from prev page url
		// If paths don't match, window will scroll to top
		const newPath = this.props?.match?.path;
		const oldPath = prevProps?.match?.path;
		if (
			newPath === '/:locale/resource/:id/service/:serviceId' &&
			oldPath !== '/:locale/resource/:id/service/:serviceId'
		) {
			window.scroll(0, 0);
		}
	}

	componentWillUnmount() {
		this.props.setSelectedResource(null);
	}

	requestData() {
		const {id, serviceId} = this.props?.match?.params;

		if (this.isServicePage) {
			this.handleServiceRequest(id, serviceId);
		} else {
			this.handleOrganizationRequest(id);
		}
	}

	handleOrganizationRequest(orgSlug) {
		this.setState({loading: true});

		getOrganizationBySlug(orgSlug).then((organization) => {
			var formattedOrg = formatOrganization(organization);

			formattedOrg = doNativeTranslation
				? returnOrgNativeLanguageData(formattedOrg, langCode)
				: formattedOrg;

			this.setState({
				loading: false,
				organization: formattedOrg
			});

			if (this.props.setSelectedResource) {
				this.props.setSelectedResource(formattedOrg);
			}
			this.handleSupplementalInfoRequest(organization);
		});
	}

	handleServiceRequest(orgSlug, serviceSlug) {
		this.setState({loading: true});

		getServiceBySlug(orgSlug, serviceSlug).then((service) => {
			var formattedService = formatService(service);

			formattedService = doNativeTranslation
				? returnServiceNativeLanguageData(formattedService, langCode)
				: formattedService;

			this.setState({
				loading: false,
				organization: formattedService.organization,
				service: formattedService
			});

			if (this.props.setSelectedService) {
				this.props.setSelectedService(formattedService);
			}
			this.handleSupplementalInfoRequest(
				formattedService.organization,
				formattedService
			);
		});
	}

	handleSupplementalInfoRequest(organization, service) {
		if (organization) {
			if (service) {
				getCommentsAndReview(organization, service).then((results) => {
					this.setState(results);
				});

				return;
			}

			getCommentsAndReview(organization).then((results) => {
				this.setState(results);
			});
		}
	}

	handleBackButtonClick() {
		const {locale} = this.props;
		if (this.isServicePage) {
			this.props.history.push(
				`/${locale}/resource/${this.state.organization?.slug}`
			);
		} else {
			if (this.state.isEditing) {
				this.setIsEditing(false);
				this.setState({editFocus: ''});
			} else {
				this.props.handleResourceBackButton();
			}
		}
	}

	handleNewReview({resourceType = 'organization', type, data} = {}) {
		let reviewList = this.state.reviewList;
		reviewList[resourceType] = [data].concat(
			reviewList[resourceType].filter(
				(comment) => comment.client_user_id !== data.client_user_id
			)
		);
		this.setState({
			reviewList: reviewList
		});
	}

	handleTabClickDesktop(e, tab) {
		scroller.scrollTo(this.tabs[tab].value, {
			duration: 500,
			delay: 100,
			smooth: true
		});
		this.setState({tab});
	}

	handleTabClickMobile(e, tab) {
		this.setState({
			tab
		});
	}

	handleSwipeChange(index, indexLatest) {
		this.setState({
			tab: index
		});
	}

	handleOpen(type) {
		this.setState({modal: false});
		this.props.handleRequestOpen(type);
	}

	handleEditOrgChange(event) {
		const {target} = event;
		const {name, value} = target;
		const {editedOrg} = this.state;
		const {locations = [{}], phones = [{}]} = editedOrg;
		switch (name) {
			case 'city':
			case 'state':
				locations[0][name] = value;
				editedOrg.locations = locations;
				break;
			case 'phone':
				phones[0].digits = value;
				editedOrg.phones = phones;
				break;
			default:
				editedOrg[name] = value;
		}
		this.setState({editedOrg});
	}

	handleEditOrgSubmit(event) {
		// TODO: handle edit submission
		event.preventDefault();
	}

	renderEditButton(onClick) {
		return (
			<div className={this.props.classes.editLabel} onClick={onClick}>
				<IconButton className={this.props.classes.editButton}>
					<EditIcon />
				</IconButton>
				<Typography className={this.props.classes.editText} variant="h5">
					<FormattedMessage
						id="action.edit"
						defaultMessage="Edit"
						description="button to open organization edit page"
					/>
				</Typography>
			</div>
		);
	}

	renderSaveButtons() {
		const {classes} = this.props;
		return (
			<Grid container direction="row" justify="flex-end">
				<Button
					className={classes.button}
					onClick={() => {
						this.setState({editFocus: ''});
					}}
				>
					<FormattedMessage
						id="action.cancel"
						defaultMessage="Cancel"
						description="button to cancel organization edits"
					/>
				</Button>
				<Button
					className={classNames(classes.button, classes.red)}
					onClick={() => {
						this.setState({editFocus: ''});
					}}
				>
					<FormattedMessage
						id="action.save-edits"
						defaultMessage="Save"
						description="button to save organization edits"
					/>
				</Button>
			</Grid>
		);
	}

	setIsEditing(isEditing) {
		this.setState({isEditing});
	}

	render() {
		const {
			classes,
			country,
			handleFavoriteUpdate,
			handleListRemoveFavorite,
			handleListNew,
			handleLogOut,
			handleMessageNew,
			lists,
			locale,
			mapResources,
			mapMaxDistance,
			session,
			t,
			user,
			userData,
			width
		} = this.props;
		const {
			average_rating,
			comments,
			modal,
			loading,
			ratings,
			organization = {},
			service = {},
			tab,
			isEditing,
			editFocus,
			editedOrg
		} = this.state;
		const type = this.isServicePage ? 'service' : 'organization';
		const resource = this.isServicePage ? service : organization;
		const {
			_id,
			alertMessage,
			emails,
			locations,
			name,
			phones,
			properties = {},
			schedules,
			services = [],
			website,
			owners,
			social_media
		} = resource || {};
		let services2 = services.filter(
			(service) => service.tags?.[localeTagMap?.[locale]]
		);

		const allProperties = this.isServicePage
			? properties
			: combineProperties([resource, ...services2]);
		const propsByType = seperatePropsByType(allProperties);
		const userComment =
			comments.find(
				(comment) => comment.userId === this.props?.userData?._id
			) || null;
		const showReviewForm =
			session && (userComment === false || userComment === null);
		const whoThis = this.isServicePage ? (
			<FormattedMessage
				id="resource.who-it-helps"
				defaultMessage="Who this resource serves"
				description="who this organization can help"
			/>
		) : (
			<FormattedMessage
				id="resource.who-it-serves"
				defaultMessage="Who this service helps"
				description="who this service can help"
			/>
		);

		const isMobile = width < breakpoints['sm'];
		let sharePath = `resource/${organization?._id}/${organization?.name}`;
		const primaryPhone =
			phones?.length > 0 ? phones?.filter((phone) => phone?.is_primary) : null;
		if (this.isServicePage) {
			sharePath += `/service/${service?.name}`;
		}

		const detailHeaderProps = {
			alertMessage,
			classes,
			isMobile,
			name,
			phones: primaryPhone || phones,
			rating: average_rating,
			totalRatings: ratings?.length,
			website,
			verified: organization?.updated_at
				? new Date(organization?.updated_at)
				: null,
			owners,
			socialMedia: social_media
		};
		const resourceTags = getTags(resource, this.props.locale);
		return (
			<Grid
				container
				alignItems="flex-start"
				justify="center"
				spacing={0}
				className={classes.container}
			>
				<Grid item xs={12} sm={11} md={10} lg={10} xl={11}>
					{loading ? (
						<Loading />
					) : (
						<div>
							{' '}
							{/******* MOBILE *******/}
							{isMobile ? (
								<div>
									<Toolbar
										classes={{
											root: classes.toolbarRoot,
											gutters: classes.toolbarGutters
										}}
									>
										<AsylumConnectBackButton
											onClick={this.handleBackButtonClick}
										/>
										<div>
											<SaveToFavoritesButton
												className="center-align"
												handleFavoriteUpdate={handleFavoriteUpdate}
												handleListRemoveFavorite={handleListRemoveFavorite}
												handleListNew={handleListNew}
												handleLogOut={handleLogOut}
												handleRequestOpen={this.handleOpen}
												handleMessageNew={handleMessageNew}
												lists={lists}
												parentResourceId={resource?.organization?._id}
												resourceId={_id}
												session={session}
												user={user}
												userData={userData}
											/>
											<IconButton
												className="center-align"
												onClick={() =>
													session
														? this.handleOpen('share/' + sharePath)
														: this.setState({modal: true})
												}
											>
												<ShareIcon />
											</IconButton>
											<Modal
												ariaHideApp={false}
												style={{
													overlay: {
														zIndex: 9999
													},
													content: {
														position: 'absolute',
														bottom: 'auto',
														padding: 0,
														fontFamily: '"Inter", sans-serif',
														background: '#FFFFFF'
													}
												}}
												isOpen={modal}
											>
												<div
													style={{
														textAlign: 'left',
														paddingTop: '13px',
														height: '20px'
													}}
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
														<div
															style={{paddingTop: '10px', textAlign: 'center'}}
														>
															<ShareIcon size={'19px'} />
														</div>
													</div>
												</div>
												<div
													style={{
														paddingTop: '40px',
														padding: '8%',
														fontSize: '14px'
													}}
												>
													<p>
														<FormattedMessage
															id="error.sign-in-to-share-resources"
															defaultMessage="Must be signed in to share this resource"
															description="error meesage when ot signed in"
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
															description="title for things you can unlock with an account"
														/>
													</p>
													<div>
														<li>
															<FormattedMessage
																id="app.feature-save-resource-lists"
																defaultMessage="Save and share personalised resources lists"
																description="list item - save and share resources"
															/>
														</li>
														<br />
														<li>
															<FormattedMessage
																id="app.feature-rate-review-resources"
																defaultMessage="Leave public rating/reviews on resources"
																description="list item - rate resources"
															/>
														</li>
														<br />
														<li>
															<FormattedMessage
																id="app.feature-suggest-resource"
																defaultMessage="Suggest resources in your area"
																description="list item - suggest resources"
															/>
														</li>
														<br />
														<li>
															<FormattedMessage
																id="app.feature-claim-resource-page"
																defaultMessage="Claim your organization's profile page"
																description="list item - claim a resource"
															/>
														</li>
													</div>
												</div>
												<div
													style={{textAlign: 'center', paddingBottom: '15px'}}
												>
													<Button
														style={{
															display: 'inline-block',
															background: '#CC4747',
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
															description="sign in button"
														/>
														/
														<FormattedMessage
															id="account.sign-up"
															defaultMessage="Sign Up"
															description="sign up button"
														/>
													</Button>
												</div>
												<div
													style={{paddingBottom: '20px', textAlign: 'center'}}
												>
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
															defaultMessage="Close"
															description="button to close the dialog"
														/>
													</Button>
												</div>
											</Modal>
										</div>
									</Toolbar>
									<Header {...detailHeaderProps} />
									<HeaderTabs
										alertMessage={alertMessage}
										classes={classes}
										handleTabClick={this.handleTabClickMobile}
										isMobile={isMobile}
										isService={true}
										name={name}
										orgLink={`/${locale}/resource/${organization?.slug}`}
										orgName={organization?.name}
										rating={average_rating}
										tab={tab}
										tabs={this.tabs}
										totalRatings={null}
										website={website}
									/>
									<Divider />
									{social_media && social_media.length > 0 ? (
										<Box p={2} className={classes.contactInfo}>
											<Grid container>
												{getSocialMediaLinks({
													socialMedia: social_media,
													iconWidth: '22px',
													isMobile: true
												}).map((link) => (
													<Grid item xs>
														{link}
													</Grid>
												))}
											</Grid>
										</Box>
									) : null}
									{social_media && social_media.length > 0 ? <Divider /> : null}
									<SwipeableViews
										index={tab}
										onChangeIndex={this.handleSwipeChange}
									>
										<div>
											<About classes={classes} resource={resource} />
											{loading ? (
												<Loading />
											) : (
												<>
													{propsByType?.community?.length > 0 && (
														<AsylumConnectCollapsibleSection
															testIdName="communities"
															title={whoThis}
															content={
																<Communities
																	list={propsByType.community}
																	classes={classes}
																/>
															}
														/>
													)}
													{services2?.length > 0 && (
														<AsylumConnectCollapsibleSection
															testIdName="services"
															title={
																<FormattedMessage
																	id="resource.services-heading"
																	defaultMessage="Services"
																	description="Services section title"
																/>
															}
															content={
																<Services
																	resource={resource}
																	list={services2}
																	classes={classes}
																	locale={locale}
																	isMobile={isMobile}
																/>
															}
														/>
													)}
													{this.isServicePage && (
														<>
															{resourceTags && (
																<AsylumConnectCollapsibleSection
																	title=""
																	content={
																		<ServiceType
																			list={resourceTags}
																			classes={classes}
																			isMobile={isMobile}
																			locale={locale}
																		/>
																	}
																/>
															)}
															{propsByType?.['cost']?.length > 0 ? (
																<AsylumConnectCollapsibleSection
																	testIdName="cost"
																	title={
																		<FormattedMessage
																			id="resource.cost-heading"
																			defaultMessage="Costs"
																			description="Costs section title"
																		/>
																	}
																	content={
																		<DetailPropertyList
																			list={propsByType['cost']}
																			classes={classes}
																		/>
																	}
																/>
															) : null}
															{propsByType?.eligibility?.length > 0 ? (
																<AsylumConnectCollapsibleSection
																	testIdName="requirements"
																	title={
																		<FormattedMessage
																			id="resource.requirements-heading"
																			defaultMessage="Additional requirements"
																			description="Additional requirements section title"
																		/>
																	}
																	content={
																		<DetailPropertyList
																			list={propsByType.eligibility}
																			classes={classes}
																		/>
																	}
																/>
															) : null}
															{propsByType?.['required']?.length > 0 ? (
																<AsylumConnectCollapsibleSection
																	testIdName="required"
																	title={
																		<FormattedMessage
																			id="resource.required-header"
																			defaultMessage="Required"
																			description="Section for a list of requirements"
																		/>
																	}
																	content={
																		<DetailPropertyList
																			list={propsByType['required']}
																			classes={classes}
																		/>
																	}
																/>
															) : null}
															{propsByType?.['additional-info']?.length > 0 ? (
																<AsylumConnectCollapsibleSection
																	testIdName="additional-information"
																	title={
																		<FormattedMessage
																			id="form.additional-information"
																			defaultMessage="Additional Information"
																			description="Additional Information section title"
																		/>
																	}
																	content={
																		<DetailPropertyList
																			list={propsByType['additional-info']}
																			classes={classes}
																		/>
																	}
																/>
															) : null}
														</>
													)}
													{propsByType?.language?.length > 0 && (
														<AsylumConnectCollapsibleSection
															testIdName="language-services"
															title={
																<FormattedMessage
																	id="resource.language-services"
																	defaultMessage="Supported Languages"
																	description="Supported Languages section title"
																/>
															}
															content={
																<Languages
																	list={propsByType.language}
																	classes={classes}
																/>
															}
														/>
													)}
												</>
											)}
										</div>
										<div className={classes.mobileSpacing}>
											<AsylumConnectCollapsibleSection
												testIdName="visit"
												borderTop={false}
												title={<FormattedMessage id="resource.visit" />}
												content={
													this.isServicePage ? (
														<AccessInstructions
															email={emails[0]}
															list={service.access_instructions}
															location={locations[0]}
															phone={primaryPhone[0] || phones[0]}
															rawSchedule={schedules[0]}
															website={website}
														/>
													) : (
														<Visit
															emails={emails}
															locations={locations}
															phones={phones}
															website={website}
														/>
													)
												}
											/>
											<AsylumConnectMap
												resources={mapResources}
												country={country}
												loadingElement={
													<div
														style={{
															width: '100%',
															height: window.innerHeight / 2 + 'px'
														}}
													/>
												}
												locale={locale}
												containerElement={
													<div
														style={{
															width: '100%',
															height: window.innerHeight / 2 + 'px'
														}}
													/>
												}
												mapElement={
													<div
														style={{
															width: '100%',
															height: window.innerHeight / 2 + 'px'
														}}
													/>
												}
												mapMaxDistance={mapMaxDistance}
												t={t}
											/>
										</div>
										<div className={classes.mobileSpacing}>
											<PhotoGallery photos={organization.photos} />
										</div>
										<div className={classes.mobileSpacing}>
											{showReviewForm ? (
												<AsylumConnectCollapsibleSection
													testIdName="leave-review"
													borderTop={false}
													title={
														<FormattedMessage
															id="resource.leave-review"
															defaultMessage="Leave Review"
															description="review box title"
														/>
													}
													content={
														<ReviewForm
															resource={resource}
															session={session}
															user={user}
															userData={userData}
															onSubmit={this.handleNewReview}
														/>
													}
												/>
											) : null}
											<AsylumConnectCollapsibleSection
												testIdName="review"
												borderTop={showReviewForm}
												title={
													<FormattedMessage
														id="resource.reviews-heading"
														defaultMessage="Reviews"
														description="Title for reviews section"
													/>
												}
												content={<Reviews reviews={comments} />}
											/>
										</div>
									</SwipeableViews>
								</div>
							) : (
								<div>
									{/******* DESKTOP *******/}
									<Tools
										{...this.props}
										backText={
											this.isServicePage ? (
												<FormattedMessage id="resource.back-to-organization" />
											) : this.state.isEditing ? (
												<FormattedMessage id="resource.back-to-view-mode" />
											) : (
												<FormattedMessage id="resource.back-to-search-results" />
											)
										}
										classes={classes}
										handleBackButtonClick={this.handleBackButtonClick}
										handleTabClick={this.handleTabClickDesktop}
										handleRequestOpen={this.handleOpen}
										isEditing={isEditing}
										setIsEditing={this.setIsEditing}
										resource={resource}
										sharePath={sharePath}
										tab={tab}
										tabs={this.tabs}
										userData={userData}
									/>
									{editFocus === EditFocuses.EDIT_ABOUT ? (
										<form>
											<Grid container direction="column">
												<Grid
													container
													spacing={3}
													className={classes.editOrgContainer}
												>
													<Grid item>
														<Typography variant="subtitle2">
															<FormattedMessage id="form.resource-edit-organization-help" />
														</Typography>
													</Grid>
													<Grid item xs={12}>
														<Typography
															variant="body1"
															classes={{body1: classes.inputLabel}}
														>
															<FormattedMessage id="form.organization-name-title" />
														</Typography>
														<TextField
															variant="outlined"
															color="secondary"
															fullWidth
															name="name"
															value={editedOrg?.name || ''}
															onChange={this.handleEditOrgChange}
														/>
													</Grid>
													<Grid item xs={8}>
														<Typography
															variant="body1"
															classes={{body1: classes.inputLabel}}
														>
															<FormattedMessage id="form.city" />
														</Typography>
														<TextField
															variant="outlined"
															color="secondary"
															fullWidth
															name="city"
															value={
																editedOrg?.locations
																	? editedOrg.locations[0]?.city || ''
																	: ''
															}
															onChange={this.handleEditOrgChange}
														/>
													</Grid>
													<Grid item xs={4}>
														<Typography
															variant="body1"
															classes={{body1: classes.inputLabel}}
														>
															<FormattedMessage id="form.state" />
														</Typography>
														<TextField
															variant="outlined"
															color="secondary"
															fullWidth
															name="state"
															value={
																editedOrg?.locations
																	? editedOrg.locations[0]?.state || ''
																	: ''
															}
															onChange={this.handleEditOrgChange}
														/>
													</Grid>
													<Grid item xs={12}>
														<Typography
															variant="body1"
															classes={{body1: classes.inputLabel}}
														>
															<FormattedMessage id="resource.website-label" />
														</Typography>
														<TextField
															variant="outlined"
															color="secondary"
															fullWidth
															name="website"
															value={editedOrg?.website || ''}
															onChange={this.handleEditOrgChange}
														/>
													</Grid>
													<Grid item xs={12}>
														<Typography
															variant="body1"
															classes={{body1: classes.inputLabel}}
														>
															<FormattedMessage id="resource.phone-numbers" />
														</Typography>
														<TextField
															variant="outlined"
															color="secondary"
															fullWidth
															name="phone"
															value={
																editedOrg?.phones
																	? editedOrg.phones[0]?.digits || ''
																	: ''
															}
															onChange={this.handleEditOrgChange}
														/>
													</Grid>
												</Grid>
												<Grid
													item
													xs={12}
													classes={{item: classes.editDescription}}
												>
													<Typography
														variant="body1"
														classes={{body1: classes.inputLabel}}
													>
														<FormattedMessage id="form.resource-description-placeholder" />
													</Typography>
													<TextField
														variant="outlined"
														color={
															editedOrg?.description?.length > 1000
																? 'primary'
																: 'secondary'
														}
														rows={6}
														multiline
														fullWidth
														name="description"
														value={editedOrg?.description || ''}
														onChange={this.handleEditOrgChange}
														error={editedOrg?.description?.length > 1000}
														helperText={
															editedOrg?.description?.length > 1000 ? (
																<FormattedMessage id="error.form-description-length" />
															) : (
																''
															)
														}
													/>
												</Grid>
												{this.renderSaveButtons()}
											</Grid>
										</form>
									) : (
										<>
											<Header
												{...detailHeaderProps}
												isEditing={isEditing}
												renderEditButton={() => {
													return this.renderEditButton(() => {
														this.setState({
															editedOrg: _.cloneDeep(organization),
															editFocus: EditFocuses.EDIT_ABOUT
														});
													});
												}}
											/>
											<Element name="about" />
											<About classes={classes} resource={resource} />
										</>
									)}
									{loading ? (
										<Loading />
									) : (
										<>
											{propsByType?.community?.length > 0 && (
												<AsylumConnectCollapsibleSection
													testIdName="communities"
													title={whoThis}
													content={
														<Communities
															list={propsByType.community}
															classes={classes}
														/>
													}
												/>
											)}
											{services2?.length > 0 && (
												<AsylumConnectCollapsibleSection
													testIdName="services"
													title={
														<FormattedMessage id="resource.services-heading" />
													}
													content={
														<Services
															resource={resource}
															list={services2}
															classes={classes}
															locale={locale}
															isMobile={isMobile}
														/>
													}
												/>
											)}
											{this.isServicePage && (
												<>
													{resourceTags && (
														<AsylumConnectCollapsibleSection
															testIdName="service-type"
															title={
																<FormattedMessage id="resource.service-type-heading" />
															}
															content={
																<ServiceType
																	list={resourceTags}
																	classes={classes}
																	isMobile={isMobile}
																	locale={locale}
																/>
															}
														/>
													)}
													{propsByType?.['cost']?.length > 0 ? (
														<AsylumConnectCollapsibleSection
															testIdName="cost"
															title={
																<FormattedMessage id="resource.cost-heading" />
															}
															content={
																<DetailPropertyList
																	list={propsByType['cost']}
																	classes={classes}
																/>
															}
														/>
													) : null}
													{propsByType?.eligibility?.length > 0 ? (
														<AsylumConnectCollapsibleSection
															testIdName="requirements"
															title={
																<FormattedMessage id="resource.requirements-heading" />
															}
															content={
																<DetailPropertyList
																	list={propsByType.eligibility}
																	classes={classes}
																/>
															}
														/>
													) : null}
													{propsByType?.['required']?.length > 0 ? (
														<AsylumConnectCollapsibleSection
															testIdName="required"
															title={
																<FormattedMessage id="resource.required-header" />
															}
															content={
																<DetailPropertyList
																	list={propsByType['required']}
																	classes={classes}
																/>
															}
														/>
													) : null}
													{propsByType?.['additional-info']?.length > 0 ? (
														<AsylumConnectCollapsibleSection
															testIdName="additional-information"
															title={
																<FormattedMessage id="resource.additional-information" />
															}
															content={
																<DetailPropertyList
																	list={propsByType['additional-info']}
																	classes={classes}
																/>
															}
														/>
													) : null}
												</>
											)}
											{propsByType?.language?.length > 0 && (
												<AsylumConnectCollapsibleSection
													testIdName="language-services"
													title={
														<FormattedMessage id="resource.language-services" />
													}
													content={
														<Languages
															list={propsByType.language}
															classes={classes}
														/>
													}
												/>
											)}
										</>
									)}
									<Element name="visit" />
									<AsylumConnectCollapsibleSection
										testIdName="visit"
										title={<FormattedMessage id="resource.visit" />}
										content={
											this.isServicePage ? (
												<AccessInstructions
													email={emails[0]}
													list={service.access_instructions}
													location={locations[0]}
													phone={primaryPhone[0] || phones[0]}
													rawSchedule={schedules[0]}
													website={website}
												/>
											) : (
												<Visit
													emails={emails}
													locations={locations}
													phones={phones}
													website={website}
												/>
											)
										}
									/>
									<Element name="photos" />
									<AsylumConnectCollapsibleSection
										title={<FormattedMessage id="resource.photos" />}
										content={<OrgPhotoGrid photos={organization.photos} />}
									/>
									<Element name="reviews" />
									{showReviewForm && (
										<AsylumConnectCollapsibleSection
											testIdName="leave-review"
											title={<FormattedMessage id="resource.leave-review" />}
											content={
												<ReviewForm
													resource={resource}
													session={session}
													user={user}
													userData={userData}
													onSubmit={this.handleNewReview}
												/>
											}
										/>
									)}
									<AsylumConnectCollapsibleSection
										testIdName="reviews"
										title={<FormattedMessage id="resource.reviews-heading" />}
										content={<Reviews reviews={comments} />}
									/>
								</div>
							)}
						</div>
					)}
				</Grid>
			</Grid>
		);
	}
}

Detail.propTypes = {};

export default withStyles(styles)(withWidth(Detail));
