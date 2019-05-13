import React from 'react';
import PropTypes from 'prop-types';
import url from 'url';

import Toolbar from 'material-ui/Toolbar';
import Tabs, { Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';

import { Element, scroller } from 'react-scroll';
import SwipeableViews from 'react-swipeable-views';

import withWidth from '../withWidth';
import breakpoints from '../../theme/breakpoints';
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
import DetailPropertyList from './DetailPropertyList';
import DetailServiceType from './DetailServiceType';
import DetailAccessInstructions from './DetailAccessInstructions';
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

import Visit from './ResourceVisit';
import Reviews from './Reviews';

import OneDegreeResourceClient from '../../helpers/OneDegreeResourceClient';
import propertyMap from '../../helpers/OneDegreePropertyMap';
import resourceTypes from '../../helpers/ResourceTypes';


import {bodyLink, boldFont, italicFont, dividerSpacing, mobilePadding} from '../../theme/sharedClasses';
import ShareDialog from '../share/ShareDialog';
import ActionButton from '../ActionButton';


const styles = (theme) => ({
});

class Service extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.odClient = new OneDegreeResourceClient();
    this.state = {
      tab: 0,
      orgLoading: true,
      oppLoading: true,
      reviewLoading: true,
      reviewList: false,
      resource: props.resource, 
      service: props.service,
      acFilter: false,
      userReview: null,
      userComment: null
    };

    this.tabs = [
      {label: "ABOUT", value: "about"},
      {label: "VISIT", mobileLabel: "VISIT (MAP)", value: "visit"},
      {label: "REVIEWS", value: "reviews"}
    ]

    this.handleOrganizationRequest = this.handleOrganizationRequest.bind(this);
    this.handleOpportunityRequest = this.handleOpportunityRequest.bind(this);
    this.handleCommentRequest = this.handleCommentRequest.bind(this);
    this.handleRatingRequest = this.handleRatingRequest.bind(this);
    this.handleNewReview = this.handleNewReview.bind(this);

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.handleTabClickDesktop = this.handleTabClickDesktop.bind(this);
  }

  componentWillMount() {
    window.scroll(0,0);
    if(this.props.resource == null) {
      this.setState({
        orgLoading: true,
        oppLoading: true
      });
      this.odClient.getOrganization({
        id: this.props.match.params.id,
        orgOnly: true,
        callback: this.handleOrganizationRequest
      });
    } else {
      this.odClient.getOpportunities({
        idType: 'opportunity',
        id: this.props.match.params.serviceId,
        per_page: 1,
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
    this.props.setSelectedService(null);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user !== this.props.user) {
      //TODO: handle login while on the form
    }
  }

  handleOrganizationRequest(response) {
    if(response.status && response.status == 'error') {
      //redirect
    } else {
      this.props.setSelectedResource(response);
      this.setState({
        resource: response,
        orgLoading: false
      });
      this.odClient.getOpportunities({
        idType: 'opportunity',
        id: this.props.match.params.serviceId,
        per_page: 1,
        callback: this.handleOpportunityRequest
      })
      
    }
  }

  handleOpportunityRequest(response) {
    if(response.status && response.status == 'error') {
      //redirect
    } else {
      this.props.setSelectedService(response);
      this.setState(prevState => ({
        service: response,
        oppLoading: false
      }))
      this.getReviews();
    }
  }

  handleNewReview({resourceType = 'organization', type, data } = {}) {
    let reviewList = this.state.reviewList
    reviewList = [data].concat(reviewList.filter(comment => comment.client_user_id !== data.client_user_id));
    this.setState({
      reviewList: reviewList
    });
  }

  getReviews() {
    const { handleCommentRequest } = this;
    if(this.state.resource && this.state.service) {
      this.odClient.getCommentsFromId({
        resourceType: 'opportunity',
        id: this.state.resource.id,
        serviceId: this.state.service.id,
        callback: handleCommentRequest
      })
    } else {
      this.setState({
        reviewList: []
      });
    }

    /*if(resource.comment_count) {
      this.odClient.getCommentsFromId({
        resourceType: 'organization',
        id: resource.id,
        per_page: resource.comment_count,
        callback: (response) => { handleCommentRequest('organization', response) }
      })
    } else {
      this.setState({
        reviewList: {
          opportunities: this.state.reviewList.opportunities,
          organization: []
        }
      });
    }*/
  }

  getUserRating(resource) {
    if(resource.rating && this.props.user) {
      this.odClient.getOrganizationRatingByUserId({
        resourceType: 'organization',
        id: resource.id,
        user_id: this.props.user,
        callback: this.handleRatingRequest
      })
    }
  }

  /*** consider moving all of these to Detail.js ***/
  handleCommentRequest(response) {
    //find user's comment
    let userComment = false;
    if(this.props.user) {
      response.comments.forEach((comment) => {
        if(comment.client_user_id == this.props.user.toString()) {
          userComment = comment;
        }
      });
    }

    this.setState({
      reviewList: response.comments,
      userComment
    });
  }

  handleRatingRequest(response) {
    let userReview = false;
    if(response) {
      userReview = response;
    }
    this.setState({
      userReview
    });
  }

  handleBackButtonClick() {
    this.props.history.push('/resource/'+this.state.resource.slug);
  }

  handleTabClickDesktop(e, tab) {
    scroller.scrollTo(this.tabs[tab].value, {
      duration: 500,
      delay: 100,
      smooth: true
    })
    this.props.handleTabClickDesktop(e, tab);
  }

  filterProperties(properties, map) {
    return Object.keys(properties)
      .filter(item => (typeof map[item] !== 'undefined'))
      .map(item => ({
        slug: item,
        text: map[item],
        value: properties[item]
      }));
  }

  render() {
    const { session, handleMessageNew, history, locale, t } = this.props;
    const classes = this.props.defaultClasses;
    const { props } = this;
    const { resource, service } = this.state;
    const languages = (service && service.properties ? 
                        this.filterProperties(service.properties, propertyMap['language'])
                      : null);
    const communities = (service && service.properties ? 
                        this.filterProperties(service.properties, propertyMap['community'])
                      : null);
    const additionalinfo = (service && service.properties ? this.filterProperties(service.properties, propertyMap['additional-info']) : null);
    const eligibility = (service && service.properties ? this.filterProperties(service.properties, propertyMap['eligibility']) : null);
    const moreabout = (service && service.properties ? this.filterProperties(service.properties, propertyMap['more-about']) : null);
    const notrequired = (service && service.properties ? this.filterProperties(service.properties, propertyMap['not-required']) : null);

    const sharePath = service ? 'resource' + '/' + service.id + '/' + service.title : '';
    const showReviewForm = session 
                && (this.state.userReview === false || this.state.userReview === null)
                && (this.state.userComment === false ||  this.state.userComment === null);

    const isMobile = this.props.width < breakpoints['sm'];
    return (
      <Grid container alignItems='flex-start' justify='center' spacing={0} className={classes.container}>
        <Grid item xs={12} sm={11} md={10} lg={10} xl={11} >
          { this.state.orgLoading || this.state.oppLoading ? <Loading /> :
          <div> {/******* MOBILE *******/}
            {isMobile ?
              <div>  
                <Toolbar classes={{ root: classes.toolbarRoot, gutters: classes.toolbarGutters }}>
                  <AsylumConnectBackButton onClick={this.handleBackButtonClick} />
                  <div>
                    <SaveToFavoritesButton className="center-align"
                      handleListAddFavorite={props.handleListAddFavorite}
                      handleListRemoveFavorite={props.handleListRemoveFavorite}
                      handleListNew={props.handleListNew}
                      handleLogOut={props.handleLogOut}
                      handleRequestOpen={props.handleRequestOpen}
                      handleMessageNew={props.handleMessageNew}
                      lists={props.lists}
                      resourceId={service.id}
                      session={props.session}
                      user={props.user}
                    />
                    <IconButton className="center-align" onClick={() => (
                        props.session 
                        ? props.handleRequestOpen('share/'+sharePath) 
                        : props.handleMessageNew('You must be logged in to share resources') )}>
                      <ShareIcon />
                    </IconButton>
                  </div>
                </Toolbar>
                <DetailHeader 
                  classes={classes}
                  website={resource.website}
                  name={service.title}
                  rating={service.rating}
                  totalRatings={null}
                  phones={service.phones}
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
                    {!this.state.oppLoading && communities && communities.length ? 
                      <AsylumConnectCollapsibleSection title={'Who this service helps'} content={<Communities list={communities} classes={classes} />} />
                    : null}
                    {!this.state.oppLoading && service && service.tags ? <AsylumConnectCollapsibleSection title={'Service type'} content={<DetailServiceType list={resourceTypes.combineTags(service)} classes={classes} />} />
                    : null}
                    {!this.state.oppLoading && moreabout && moreabout.length ? <AsylumConnectCollapsibleSection title={'More about this service'} content={<DetailPropertyList list={moreabout} classes={classes} />} />
                    : null}
                    {!this.state.oppLoading && eligibility && eligibility.length ? <AsylumConnectCollapsibleSection title={'Requirements'} content={<DetailPropertyList list={eligibility} classes={classes} />} />
                    : null}
                    {!this.state.oppLoading && notrequired && notrequired.length ? <AsylumConnectCollapsibleSection title={'Not required'} content={<DetailPropertyList list={notrequired} classes={classes} />} />
                    : null}
                    {!this.state.oppLoading && additionalinfo && additionalinfo.length ? <AsylumConnectCollapsibleSection title={'Additional information'} content={<DetailPropertyList list={additionalinfo} classes={classes} />} />
                    : null}
                    {!this.state.oppLoading && languages && languages.length ? 
                      <AsylumConnectCollapsibleSection title='Non-English services' content={<Languages list={languages} classes={classes} />} />
                    : null}
                  </div>
                  <div className={classes.mobileSpacing}>
                    <AsylumConnectCollapsibleSection borderTop={false} title={'Visit'} content={<DetailAccessInstructions 
                      list={service.access_instructions}
                      rawSchedule={service.schedule}
                       />} />
                    <AsylumConnectMap
                      resources={this.props.mapResources}
                      loadingElement={<div style={{ width:"100%", height: window.innerHeight/2+"px" }} />}
                      containerElement={<div style={{ width:"100%",height: window.innerHeight/2+"px" }} />}
                      mapElement={<div style={{ width:"100%",height: window.innerHeight/2+"px" }} />} 
                      mapMaxDistance={this.props.mapMaxDistance}
                    />
                  </div>
                  <div className={classes.mobileSpacing}>
                    {showReviewForm ?
                      <AsylumConnectCollapsibleSection borderTop={false} title={'Leave a review'} content={<ReviewForm 
                          resource={resource}
                          session={props.session}
                          user={props.user}
                          onSubmit={this.handleNewReview}
                        />} 
                      />
                    : null}
                    <AsylumConnectCollapsibleSection borderTop={showReviewForm} title={'Reviews'} content={<Reviews
                        includeOrgReviews={false}
                        oppReviews={this.state.reviewList}
                        acFilter={this.props.acFilter}
                        handleFilterChange={this.props.handleFilterChange}
                      />} 
                    />
                  </div>
                </SwipeableViews>
              </div>
            : 
            <div> {/******* DESKTOP *******/}
              <Tools 
                {...props}
                backText={"Back to Organization"}
                classes={classes} 
                handleBackButtonClick={this.handleBackButtonClick}
                handleTabClick={this.handleTabClickDesktop}
                handleRequestOpen={this.props.handleRequestOpen}
                resource={service}
                sharePath={sharePath}
                tabs={null}
              />
              <DetailHeader 
                classes={classes}
                website={resource.website}
                name={service.title}
                rating={service.rating}
                totalRatings={null}
                phones={service.phones}
              />
              <Element name="about"></Element>
              <About classes={classes} resource={service} />
              {!this.state.oppLoading && communities && communities.length ? 
                <AsylumConnectCollapsibleSection title={'Who this service helps'} content={<Communities list={communities} classes={classes} />} />
              : null}
              {!this.state.oppLoading && service && service.tags ? <AsylumConnectCollapsibleSection title={'Service type'} content={<DetailServiceType list={resourceTypes.combineTags(service)} classes={classes} />} />
              : null}
              {!this.state.oppLoading && moreabout && moreabout.length ? <AsylumConnectCollapsibleSection title={'More about this service'} content={<DetailPropertyList list={moreabout} classes={classes} />} />
              : null}
              {!this.state.oppLoading && eligibility && eligibility.length ? <AsylumConnectCollapsibleSection title={'Requirements'} content={<DetailPropertyList list={eligibility} classes={classes} />} />
              : null}
              {!this.state.oppLoading && notrequired && notrequired.length ? <AsylumConnectCollapsibleSection title={'Not required'} content={<DetailPropertyList list={notrequired} classes={classes} />} />
              : null}
              {!this.state.oppLoading && additionalinfo && additionalinfo.length ? <AsylumConnectCollapsibleSection title={'Additional information'} content={<DetailPropertyList list={additionalinfo} classes={classes} />} />
              : null}
              {!this.state.oppLoading && languages && languages.length ? 
                <AsylumConnectCollapsibleSection title='Non-English services' content={<Languages list={languages} classes={classes} />} />
              : null}
              <Element name="visit"></Element>
              <AsylumConnectCollapsibleSection title={'Visit'} content={<DetailAccessInstructions 
                list={service.access_instructions}
                rawSchedule={service.schedule}
                 />} />
              <Element name="reviews"></Element>
              {showReviewForm ?
                <AsylumConnectCollapsibleSection title={'Leave a review'} content={<ReviewForm 
                    resource={resource}
                    session={props.session}
                    user={props.user}
                    onSubmit={this.handleNewReview}
                  />} 
                />
              : null}
              <AsylumConnectCollapsibleSection title={'Reviews'} content={<Reviews
                  includeOrgReviews={false}
                  oppReviews={this.state.reviewList}
                  acFilter={this.props.acFilter}
                  handleFilterChange={this.props.handleFilterChange}
                />} 
              />
            </div>}
          </div>
          }
        </Grid>       
      </Grid>
    )
  } 
}

Service.propTypes = {
  handleMessageNew: PropTypes.func.isRequired
}

export default withWidth(withStyles(styles)(Service));
