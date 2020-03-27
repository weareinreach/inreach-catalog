import React from 'react';
import PropTypes from 'prop-types';
import url from 'url';

import Toolbar from 'material-ui/Toolbar';
import Tabs, {Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import {withStyles} from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';

import {Element, scroller} from 'react-scroll';
import SwipeableViews from 'react-swipeable-views';

import withWidth from '../withWidth';
import {breakpoints} from '../../theme';
import AsylumConnectButton from '../AsylumConnectButton';
import AsylumConnectBackButton from '../AsylumConnectBackButton';
import AsylumConnectSwitch from '../AsylumConnectSwitch';
import AsylumConnectMap from '../AsylumConnectMap';
import AsylumConnectCollapsibleSection from '../AsylumConnectCollapsibleSection';
import ACBadge from '../Badge';
import IconButton from 'material-ui/IconButton';
import ShareIcon from '../icons/ShareIcon';

import DetailHeader from './DetailHeader';
import DetailHeaderTabs from './DetailHeaderTabs';
import About from './DetailAbout';
import Communities from './DetailCommunities';
import Languages from './DetailLanguages';
import Services from './DetailServices';

import Tools from './Tools';
import FavoritesLink from '../FavoritesLink';
import RatingControl from './RatingControl';
import ReviewForm from './ReviewForm';
import RatingAndReviews from './RatingAndReviews';
import SaveToFavoritesButton from '../SaveToFavoritesButton';
import Loading from '../Loading';
import Phone from './Phone';

import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';

import Visit from './ResourceVisit';
import Reviews from './Reviews';

import {getResourceAlertMessage} from '../../helpers/alertMessages';
import OneDegreeResourceClient from '../../helpers/oneDegreeResourceClient';

import {
  bodyLink,
  boldFont,
  italicFont,
  dividerSpacing,
  mobilePadding
} from '../../theme';
import ShareDialog from '../share/ShareDialog';
import ActionButton from '../ActionButton';

const styles = theme => ({});

class Resource extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modal: false
    };
    this.odClient = new OneDegreeResourceClient();
    this.state = {
      orgLoading: true,
      oppLoading: true,
      reviewLoading: true,
      reviewList: {
        organization: false,
        opportunities: false
      },
      //this will be the organization or opportunity whose details are being viwed - potentially confusing terminology, but nothing stands out as a clearer option
      resource: props.resource,
      userReview: null,
      userComment: null
    };

    this.tabs = [
      {label: 'ABOUT', value: 'about'},
      {label: 'VISIT', mobileLabel: 'VISIT (MAP)', value: 'visit'},
      {label: 'REVIEWS', value: 'reviews'}
    ];

    this.handleOrganizationRequest = this.handleOrganizationRequest.bind(this);
    this.handleOpportunityRequest = this.handleOpportunityRequest.bind(this);
    this.handleCommentRequest = this.handleCommentRequest.bind(this);
    this.handleRatingRequest = this.handleRatingRequest.bind(this);
    this.handleNewReview = this.handleNewReview.bind(this);

    this.handleTabClickDesktop = this.handleTabClickDesktop.bind(this);
  }

  componentWillMount() {
    window.scroll(0, 0);
    if (this.props.resource == null) {
      this.setState({
        orgLoading: true,
        oppLoading: true
      });
      this.odClient.getOrganization({
        id: this.props.match.params.id,
        callback: this.handleOrganizationRequest
      });
    } else {
      this.odClient.getOpportunities({
        id: this.state.resource.id,
        per_page: this.state.resource.opportunity_count,
        callback: this.handleOpportunityRequest
      });
      this.setState({
        orgLoading: false,
        oppLoading: true
      });
    }
  }

  componentWillUnmount() {
    this.props.setSelectedResource(null);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      //TODO: handle login while on the form
    }
  }

  handleOrganizationRequest(response) {
    if (response.status && response.status == 'error') {
      //redirect
    } else {
      this.resourceProperties = this.odClient.collectOpportunityProperties(
        response.opportunities
      );
      this.getReviews(response);
      this.getUserRating(response);
      this.props.setSelectedResource(response);
      this.setState({
        resource: response,
        orgLoading: false,
        oppLoading: false
      });
    }
  }

  handleOpportunityRequest(response) {
    if (response.status && response.status == 'error') {
      //redirect
    } else {
      this.resourceProperties = this.odClient.collectOpportunityProperties(
        response.opportunities
      );
      this.getReviews(this.state.resource);
      this.getUserRating(this.state.resource);
      this.setState(prevState => ({
        resource: Object.assign(prevState.resource, {
          opportunities: response.opportunities
        }),
        oppLoading: false
      }));
    }
  }

  handleNewReview({resourceType = 'organization', type, data} = {}) {
    let reviewList = this.state.reviewList;
    reviewList[resourceType] = [data].concat(
      reviewList[resourceType].filter(
        comment => comment.client_user_id !== data.client_user_id
      )
    );
    this.setState({
      reviewList: reviewList
    });
  }

  getReviews(resource) {
    const {handleCommentRequest} = this;
    if (resource.opportunity_comment_count) {
      this.odClient.getCommentsFromId({
        resourceType: 'opportunities',
        id: resource.id,
        per_page: resource.opportunity_comment_count,
        callback: response => {
          handleCommentRequest('opportunities', response);
        }
      });
    } else {
      this.setState({
        reviewList: {
          opportunities: [],
          organization: this.state.reviewList.organization
        }
      });
    }

    if (resource.comment_count) {
      this.odClient.getCommentsFromId({
        resourceType: 'organization',
        id: resource.id,
        per_page: resource.comment_count,
        callback: response => {
          handleCommentRequest('organization', response);
        }
      });
    } else {
      this.setState({
        reviewList: {
          opportunities: this.state.reviewList.opportunities,
          organization: []
        }
      });
    }
  }

  getUserRating(resource) {
    if (resource.rating && this.props.user) {
      this.odClient.getOrganizationRatingByUserId({
        resourceType: 'organization',
        id: resource.id,
        user_id: this.props.user,
        callback: this.handleRatingRequest
      });
    }
  }

  handleCommentRequest(type, response) {
    //find user's comment
    let userComment = false;
    if (this.props.user && type == 'organization') {
      response.comments.forEach(comment => {
        if (comment.client_user_id == this.props.user.toString()) {
          userComment = comment;
        }
      });
    }

    let list = this.state.reviewList;
    list[type] = response.comments;

    this.setState({
      reviewList: list,
      userComment
    });
  }

  handleRatingRequest(response) {
    let userReview = false;
    if (response) {
      userReview = response;
    }
    this.setState({
      userReview
    });
  }

  handleTabClickDesktop(e, tab) {
    scroller.scrollTo(this.tabs[tab].value, {
      duration: 500,
      delay: 100,
      smooth: true
    });
    this.props.handleTabClickDesktop(e, tab);
  }

  render() {
    const {session, handleMessageNew, history, locale} = this.props;
    const classes = this.props.defaultClasses;
    const {props} = this;
    const {resource} = this.state;
    const languages =
      this.resourceProperties && this.resourceProperties.length
        ? this.resourceProperties.filter(
            item => item.slug.indexOf('lang') === 0
          )
        : null;
    const communities =
      this.resourceProperties && this.resourceProperties.length
        ? this.resourceProperties.filter(
            item => item.slug.indexOf('community') === 0
          )
        : null;

    const sharePath = resource
      ? 'resource' + '/' + resource.id + '/' + resource.name
      : '';
    const showReviewForm =
      session &&
      (this.state.userReview === false || this.state.userReview === null) &&
      (this.state.userComment === false || this.state.userComment === null);

    const isMobile = this.props.width < breakpoints['sm'];
    const alertMessage = getResourceAlertMessage(props.resource);

    return (
      <Grid
        container
        alignItems="flex-start"
        justify="center"
        spacing={0}
        className={classes.container}
      >
        <Grid item xs={12} sm={11} md={10} lg={10} xl={11}>
          {this.state.orgLoading ? (
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
                      onClick={this.props.handleResourceBackButton}
                    />
                    <div>
                      <SaveToFavoritesButton
                        className="center-align"
                        handleListAddFavorite={props.handleListAddFavorite}
                        handleListRemoveFavorite={
                          props.handleListRemoveFavorite
                        }
                        handleListNew={props.handleListNew}
                        handleLogOut={props.handleLogOut}
                        handleRequestOpen={props.handleRequestOpen}
                        handleMessageNew={props.handleMessageNew}
                        lists={props.lists}
                        resourceId={resource.id}
                        session={props.session}
                        user={props.user}
                      />
                      <IconButton
                        className="center-align"
                        onClick={() =>
                          props.session
                            ? props.handleRequestOpen('share/' + sharePath)
                            : this.setState({modal: true})
                        }
                      >
                        <ShareIcon />
                      </IconButton>
                      <Modal
                        ariaHideApp={false}
                        style={{
                          content: {
                            position: 'absolute',
                            bottom: 'auto',
                            padding: 0,
                            fontFamily: '"Open Sans", sans-serif',
                            background: '#FFFFFF'
                          }
                        }}
                        isOpen={this.state.modal}
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
                            Oops! You need to be logged in to share resources.
                          </p>
                          <p
                            style={{
                              fontWeight: 'bold'
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
                              paddingTop: '5px'
                            }}
                            onClick={() => props.handleRequestOpen('signup')}
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
                              paddingTop: '5px'
                            }}
                            onClick={() => {
                              this.setState({modal: false});
                              this.state.modal;
                            }}
                          >
                            close
                          </Button>
                        </div>
                      </Modal>
                    </div>
                  </Toolbar>
                  <DetailHeader
                    classes={classes}
                    alertMessage={alertMessage}
                    website={resource.website}
                    name={resource.name}
                    rating={
                      resource.rating
                        ? resource.rating
                        : resource.opportunity_aggregate_ratings
                    }
                    totalRatings={resource.opportunity_comments.length}
                    phones={resource.phones}
                    isMobile={isMobile}
                  />
                  <DetailHeaderTabs
                    tabs={this.tabs}
                    tab={this.props.tab}
                    classes={classes}
                    handleTabClick={this.props.handleTabClickMobile}
                    isMobile={isMobile}
                  />
                  <Divider />
                  <SwipeableViews
                    index={this.props.tab}
                    onChangeIndex={this.props.handleSwipeChange}
                  >
                    <div>
                      <About classes={classes} resource={resource} />
                      {this.state.oppLoading ? <Loading /> : null}
                      {!this.state.oppLoading &&
                      props.communities &&
                      props.communities.length ? (
                        <AsylumConnectCollapsibleSection
                          title={'Who this ' + props.type + ' serves'}
                          content={
                            <Communities list={communities} classes={classes} />
                          }
                        />
                      ) : null}
                      {!this.state.oppLoading &&
                      resource.opportunities &&
                      resource.opportunities.length ? (
                        <AsylumConnectCollapsibleSection
                          title="Services"
                          content={
                            <Services
                              resource={resource}
                              list={resource.opportunities}
                              classes={classes}
                              locale={locale}
                              isMobile={isMobile}
                            />
                          }
                        />
                      ) : null}
                      {!this.state.oppLoading &&
                      languages &&
                      languages.length ? (
                        <AsylumConnectCollapsibleSection
                          title="Non-English services"
                          content={
                            <Languages list={languages} classes={classes} />
                          }
                        />
                      ) : null}
                    </div>
                    <div className={classes.mobileSpacing}>
                      <AsylumConnectCollapsibleSection
                        borderTop={false}
                        title={'Visit'}
                        content={
                          <Visit
                            emails={resource.emails}
                            locations={resource.locations}
                            phones={resource.phones}
                            website={resource.website}
                            isMobile={isMobile}
                          />
                        }
                      />
                      <AsylumConnectMap
                        resources={this.props.mapResources}
                        country={this.props.country}
                        loadingElement={
                          <div
                            style={{
                              width: '100%',
                              height: window.innerHeight / 2 + 'px'
                            }}
                          />
                        }
                        locale={this.props.locale}
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
                        mapMaxDistance={this.props.mapMaxDistance}
                        t={this.props.t}
                      />
                    </div>
                    <div className={classes.mobileSpacing}>
                      {showReviewForm ? (
                        <AsylumConnectCollapsibleSection
                          borderTop={false}
                          title={'Leave a review'}
                          content={
                            <ReviewForm
                              resource={resource}
                              session={props.session}
                              user={props.user}
                              onSubmit={this.handleNewReview}
                            />
                          }
                        />
                      ) : null}
                      <AsylumConnectCollapsibleSection
                        borderTop={showReviewForm}
                        title={'Reviews'}
                        content={
                          <Reviews
                            orgReviews={this.state.reviewList.organization}
                            oppReviews={this.state.reviewList.opportunities}
                            reviews={this.state.reviewList.organization}
                            isMobile={isMobile}
                          />
                        }
                      />
                    </div>
                  </SwipeableViews>
                </div>
              ) : (
                <div>
                  {' '}
                  {/******* DESKTOP *******/}
                  <Tools
                    {...props}
                    backText={'Back to Search Results'}
                    classes={classes}
                    handleBackButtonClick={this.props.handleResourceBackButton}
                    handleTabClick={this.handleTabClickDesktop}
                    handleRequestOpen={this.props.handleRequestOpen}
                    resource={resource}
                    sharePath={sharePath}
                    tab={this.props.tab}
                    tabs={this.tabs}
                  />
                  <DetailHeader
                    alertMessage={alertMessage}
                    classes={classes}
                    website={resource.website}
                    name={resource.name}
                    rating={
                      resource.rating
                        ? resource.rating
                        : resource.opportunity_aggregate_ratings
                    }
                    totalRatings={resource.opportunity_comments.length}
                    phones={resource.phones}
                  />
                  <Element name="about"></Element>
                  <About classes={classes} resource={resource} />
                  {this.state.oppLoading ? <Loading /> : null}
                  {!this.state.oppLoading &&
                  props.communities &&
                  props.communities.length ? (
                    <AsylumConnectCollapsibleSection
                      title={'Who this ' + props.type + ' serves'}
                      content={
                        <Communities list={communities} classes={classes} />
                      }
                    />
                  ) : null}
                  {!this.state.oppLoading &&
                  resource.opportunities &&
                  resource.opportunities.length ? (
                    <AsylumConnectCollapsibleSection
                      title="Services"
                      content={
                        <Services
                          resource={resource}
                          list={resource.opportunities}
                          classes={classes}
                          locale={locale}
                        />
                      }
                    />
                  ) : null}
                  {!this.state.oppLoading && languages && languages.length ? (
                    <AsylumConnectCollapsibleSection
                      title="Non-English services"
                      content={<Languages list={languages} classes={classes} />}
                    />
                  ) : null}
                  <Element name="visit"></Element>
                  <AsylumConnectCollapsibleSection
                    title={'Visit'}
                    content={
                      <Visit
                        emails={resource.emails}
                        locations={resource.locations}
                        phones={resource.phones}
                        website={resource.website}
                      />
                    }
                  />
                  <Element name="reviews"></Element>
                  {showReviewForm ? (
                    <AsylumConnectCollapsibleSection
                      title={'Leave a review'}
                      content={
                        <ReviewForm
                          resource={resource}
                          session={props.session}
                          user={props.user}
                          onSubmit={this.handleNewReview}
                        />
                      }
                    />
                  ) : null}
                  <AsylumConnectCollapsibleSection
                    title={'Reviews'}
                    content={
                      <Reviews
                        orgReviews={this.state.reviewList.organization}
                        oppReviews={this.state.reviewList.opportunities}
                        reviews={this.state.reviewList.organization}
                      />
                    }
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

Resource.propTypes = {
  handleMessageNew: PropTypes.func.isRequired
};

export default withWidth(withStyles(styles)(Resource));
