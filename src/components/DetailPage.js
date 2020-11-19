import React from 'react';
import Modal from 'react-modal';
import {Element, scroller} from 'react-scroll';
import SwipeableViews from 'react-swipeable-views';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import {withStyles} from '@material-ui/core/styles';

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
import PropertyList from './ResourcePropertyList';
import Visit from './ResourceVisit';
import SaveToFavoritesButton from './SaveToFavoritesButton';
import {ShareIcon} from './icons';
import withWidth from './withWidth';
import {
  getCommentsAndReview,
  getOrganizationBySlug,
  getServiceBySlug,
} from '../utils/api';
import {combineProperties, seperatePropsByType} from '../utils/propertyMap';
import {getTags} from '../utils/tags';
import {
  bodyLink,
  boldFont,
  breakpoints,
  italicFont,
  dividerSpacing,
  mobilePadding,
} from '../theme';

const formatOrganization = (organization) => {
  return {
    ...organization,
    alertMessage: organization?.alert_message,
  };
};

const formatService = (service) => {
  const organization = service?.organization;

  return {
    ...service,
    alertMessage: organization?.alert_message,
    emails: [getOrgItem(service?.email_id, organization?.emails)],
    locations: [getOrgItem(service?.location_id, organization?.locations)],
    phones: [getOrgItem(service?.phone_id, organization?.phones)],
    schedules: [getOrgItem(service?.schedule_id, organization?.schedules)],
    website: organization?.website,
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
    minWidth: '0',
  },
  tabLabelContainer: {
    padding: theme.spacing(0, 3),
  },
  tabLabel: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  tabIndicator: {
    height: '4px',
  },
  container: {
    minHeight: '500px',
    paddingTop: '60px',
    paddingBottom: '60px',
    [theme.breakpoints.down('xs')]: Object.assign(mobilePadding(theme), {
      paddingTop: '0px',
      paddingBottom: '0px',
      backgroundColor: theme.palette.common.white,
    }),
  },
  cushion: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  separator: {
    padding: theme.spacing(0, 1),
    fontSize: '1.25rem',
    '&:after': {
      content: '" "',
    },
  },
  header: {
    borderBottom: '1px solid ' + theme.palette.common.darkGrey,
  },
  contentSpacing: {
    margin: theme.spacing(3, 0),
  },
  bottomSpacing: {
    marginBottom: theme.spacing(2),
  },
  mobileSpacing: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(3),
    },
  },
  lineSpacing: {
    lineHeight: '1.4rem',
  },
  sectionSpacing: {
    marginBottom: theme.spacing(0),
  },
  dividerSpacing: dividerSpacing(theme),
  orgName: Object.assign(
    {
      fontSize: '24px',
      display: 'inline-block',
      [theme.breakpoints.down('xs')]: {
        textAlign: 'center',
        fontSize: '24px',
      },
    },
    boldFont(theme)
  ),
  headerBadge: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(0.5),
  },
  bottomHeaderBadge:{
    [theme.breakpoints.down('xs')]:{
      marginLeft: 0
    },
  },
  bottomVerifiedBadge: {
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      width: '100%',
    },
  },
  verifiedHeaderText: {
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.text.secondary,
  },
  serviceOrg: {
    [theme.breakpoints.down('xs')]: {
      color: theme.palette.common.darkBlack,
      textTransform: 'none',
      fontWeight: 400,
      textAlign: 'center',
    },
  },
  serviceOrgContainer: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
    },
  },
  serviceBadge: {
    [theme.breakpoints.down('xs')]: {
      position: 'absolute',
      marginLeft: theme.spacing(-1),
    }
  },
  serviceText: {
    display: 'inline-block',
    lineHeight: `${theme.spacing(0.5) + 45}px`,
    marginTop: 0,
    marginBottom: 0,
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      verticalAlign: 'top',
      lineHeight: 1.6,
      paddingLeft: 0,
      marginBottom: theme.spacing(1),
    },
  },
  serviceTooltip: {
    top: theme.spacing(1),
  },
  boldFont: boldFont(theme),
  italicFont: italicFont(theme),
  moreInfo: Object.assign(
    {
      color: theme.palette.common.darkGrey,
      [theme.breakpoints.down('xs')]: {
        color: theme.palette.common.darkBlack,
        textAlign: 'center',
      },
    },
    boldFont(theme)
  ),
  bodyLink: bodyLink(theme),
  mobileRatingSummary: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      marginTop: theme.spacing(2),
    },
  },
  listLink: {
    '& + &:before': {
      content: '", "',
    },
  },
  dialogBody: {
    minWidth: '600px',
    overflowY: 'auto',
    padding: '5.5rem',
  },
  toolbarRoot: {
    justifyContent: 'space-between',
  },
  toolbarGutters: {
    paddingLeft: '0',
    paddingRight: '0',
  },
  badge: {
   display: 'inline-block',
   width: '18%'
  },
  editButton: {
    width: '44px',
  }
});

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
    };

    this.isServicePage = Boolean(id && serviceId);

    this.tabs = [
      {label: 'ABOUT', value: 'about'},
      {label: 'VISIT', mobileLabel: 'VISIT (MAP)', value: 'visit'},
      {label: 'REVIEWS', value: 'reviews'},
    ];

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.handleNewReview = this.handleNewReview.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleOrganizationRequest = this.handleOrganizationRequest.bind(this);
    this.handleServiceRequest = this.handleServiceRequest.bind(this);
    this.handleSupplementalInfoRequest = this.handleSupplementalInfoRequest.bind(
      this
    );
    this.handleSwipeChange = this.handleSwipeChange.bind(this);
    this.handleTabClickDesktop = this.handleTabClickDesktop.bind(this);
    this.handleTabClickMobile = this.handleTabClickMobile.bind(this);
    this.requestData = this.requestData.bind(this);
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
      const formattedOrg = formatOrganization(organization);

      this.setState({
        loading: false,
        organization: formattedOrg,
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
      const formattedService = formatService(service);

      this.setState({
        loading: false,
        organization: formattedService.organization,
        service: formattedService,
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
    if (this.isServicePage) {
      this.props.history.push(`/resource/${this.state.organization?.slug}`);
    } else {
      this.props.handleResourceBackButton();
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
      reviewList: reviewList,
    });
  }

  handleTabClickDesktop(e, tab) {
    scroller.scrollTo(this.tabs[tab].value, {
      duration: 500,
      delay: 100,
      smooth: true,
    });
    this.setState({tab});
  }

  handleTabClickMobile(e, tab) {
    this.setState({
      tab,
    });
  }

  handleSwipeChange(index, indexLatest) {
    this.setState({
      tab: index,
    });
  }

  handleOpen(type) {
    this.setState({modal: false});
    this.props.handleRequestOpen(type);
  }

  render() {
    const {
      classes,
      country,
      handleListAddFavorite,
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
      width,
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
      owners
    } = resource || {};
    const allProperties = this.isServicePage
      ? properties
      : combineProperties([resource, ...services]);
    const propsByType = seperatePropsByType(allProperties);
    const userComment =
      comments.find(
        (comment) => comment.userId === this.props?.userData?._id
      ) || null;
    const showReviewForm =
      session && (userComment === false || userComment === null);
    const whoThis = `Who this ${type} ${
      this.isServicePage ? 'helps' : 'serves'
    }`;
    const isMobile = width < breakpoints['sm'];
    let sharePath = `resource/${organization?._id}/${organization?.name}`;

    if (this.isServicePage) {
      sharePath += `/service/${service?.name}`;
    }

    const detailHeaderProps = {
      alertMessage,
      classes,
      isMobile,
      name,
      phones,
      rating: average_rating,
      totalRatings: ratings?.length,
      website,
      verified: organization?.updated_at,
      owners
    };
    const resourceTags = getTags(resource, locale);

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
                      gutters: classes.toolbarGutters,
                    }}
                  >
                    <AsylumConnectBackButton
                      onClick={this.handleBackButtonClick}
                    />
                    <div>
                      <SaveToFavoritesButton
                        className="center-align"
                        handleListAddFavorite={handleListAddFavorite}
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
                            zIndex: 9999,
                          },
                          content: {
                            position: 'absolute',
                            bottom: 'auto',
                            padding: 0,
                            fontFamily: '"Open Sans", sans-serif',
                            background: '#FFFFFF',
                          },
                        }}
                        isOpen={modal}
                      >
                        <div
                          style={{
                            textAlign: 'left',
                            paddingTop: '13px',
                            height: '20px',
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              width: '100%',
                              height: 0,
                              top: '38px',
                              border: '1px solid #E9E9E9',
                              zIndex: 0,
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
                              boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.25)',
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
                            fontSize: '14px',
                          }}
                        >
                          <p>
                            Oops! You need to be logged in to share resources.
                          </p>
                          <p
                            style={{
                              fontWeight: 'bold',
                            }}
                          >
                            With a free AsylumConnect account you can unlock
                            additional features:
                          </p>
                          <div>
                            <li>Save and share personalized resources lists</li>
                            <br />
                            <li>Leave public rating/reviews on resources</li>
                            <br />
                            <li>Suggest new resources in your area</li>
                            <br />
                            <li>Claim your organization's profile page</li>
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
                              paddingTop: '5px',
                            }}
                            onClick={() => this.handleOpen('signup')}
                          >
                            sign up/sign in
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
                              paddingTop: '5px',
                            }}
                            onClick={() => {
                              this.setState({modal: false});
                            }}
                          >
                            close
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
                    phones={phones}
                    rating={average_rating}
                    tab={tab}
                    tabs={this.tabs}
                    totalRatings={null}
                    website={website}
                  />
                  <Divider />
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
                              title={whoThis}
                              content={
                                <Communities
                                  list={propsByType.community}
                                  classes={classes}
                                />
                              }
                            />
                          )}
                          {services?.length > 0 && (
                            <AsylumConnectCollapsibleSection
                              title="Services"
                              content={
                                <Services
                                  resource={resource}
                                  list={services}
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
                                  title="Cost"
                                  content={
                                    <PropertyList
                                      list={propsByType['cost']}
                                      classes={classes}
                                    />
                                  }
                                />
                              ) : null}
                              {propsByType?.eligibility?.length > 0 ? (
                                <AsylumConnectCollapsibleSection
                                  title="Requirements"
                                  content={
                                    <PropertyList
                                      list={propsByType.eligibility}
                                      classes={classes}
                                    />
                                  }
                                />
                              ) : null}
                              {propsByType?.['required']?.length > 0 ? (
                                <AsylumConnectCollapsibleSection
                                  title="Required"
                                  content={
                                    <PropertyList
                                      list={propsByType['required']}
                                      classes={classes}
                                    />
                                  }
                                />
                              ) : null}
                              {propsByType?.['additional-info']?.length > 0 ? (
                                <AsylumConnectCollapsibleSection
                                  title="Additional information"
                                  content={
                                    <PropertyList
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
                              title="Non-English services"
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
                        borderTop={false}
                        title="Visit"
                        content={
                          this.isServicePage ? (
                            <AccessInstructions
                              email={emails[0]}
                              list={service.access_instructions}
                              location={locations[0]}
                              phone={phones[0]}
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
                              height: window.innerHeight / 2 + 'px',
                            }}
                          />
                        }
                        locale={locale}
                        containerElement={
                          <div
                            style={{
                              width: '100%',
                              height: window.innerHeight / 2 + 'px',
                            }}
                          />
                        }
                        mapElement={
                          <div
                            style={{
                              width: '100%',
                              height: window.innerHeight / 2 + 'px',
                            }}
                          />
                        }
                        mapMaxDistance={mapMaxDistance}
                        t={t}
                      />
                    </div>
                    <div className={classes.mobileSpacing}>
                      {showReviewForm ? (
                        <AsylumConnectCollapsibleSection
                          borderTop={false}
                          title="Leave a review"
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
                        borderTop={showReviewForm}
                        title="Reviews"
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
                      this.isServicePage
                        ? 'Back to Organization'
                        : 'Back to Search Results'
                    }
                    classes={classes}
                    handleBackButtonClick={this.handleBackButtonClick}
                    handleTabClick={this.handleTabClickDesktop}
                    handleRequestOpen={this.handleOpen}
                    resource={resource}
                    sharePath={sharePath}
                    tab={tab}
                    tabs={this.tabs}
                    userData={userData}
                  />
                  <Header {...detailHeaderProps} />
                  <Element name="about" />
                  <About classes={classes} resource={resource} />
                  {loading ? (
                    <Loading />
                  ) : (
                    <>
                      {propsByType?.community?.length > 0 && (
                        <AsylumConnectCollapsibleSection
                          title={whoThis}
                          content={
                            <Communities
                              list={propsByType.community}
                              classes={classes}
                            />
                          }
                        />
                      )}
                      {services?.length > 0 && (
                        <AsylumConnectCollapsibleSection
                          title="Services"
                          content={
                            <Services
                              resource={resource}
                              list={services}
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
                              title="Service Type"
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
                              title="Cost"
                              content={
                                <PropertyList
                                  list={propsByType['cost']}
                                  classes={classes}
                                />
                              }
                            />
                          ) : null}
                          {propsByType?.eligibility?.length > 0 ? (
                            <AsylumConnectCollapsibleSection
                              title="Requirements"
                              content={
                                <PropertyList
                                  list={propsByType.eligibility}
                                  classes={classes}
                                />
                              }
                            />
                          ) : null}
                          {propsByType?.['required']?.length > 0 ? (
                            <AsylumConnectCollapsibleSection
                              title="Required"
                              content={
                                <PropertyList
                                  list={propsByType['required']}
                                  classes={classes}
                                />
                              }
                            />
                          ) : null}
                          {propsByType?.['additional-info']?.length > 0 ? (
                            <AsylumConnectCollapsibleSection
                              title="Additional information"
                              content={
                                <PropertyList
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
                          title="Non-English services"
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
                    title="Visit"
                    content={
                      this.isServicePage ? (
                        <AccessInstructions
                          email={emails[0]}
                          list={service.access_instructions}
                          location={locations[0]}
                          phone={phones[0]}
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
                  <Element name="reviews" />
                  {showReviewForm && (
                    <AsylumConnectCollapsibleSection
                      title="Leave a review"
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
                    title="Reviews"
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
