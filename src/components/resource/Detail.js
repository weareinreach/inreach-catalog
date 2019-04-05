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

import Visit from './ResourceVisit';
import Reviews from './Reviews';

import OneDegreeResourceClient from '../../helpers/OneDegreeResourceClient';


import {bodyLink, boldFont, italicFont, dividerSpacing, mobilePadding} from '../../theme/sharedClasses';
import ShareDialog from '../share/ShareDialog';
import ActionButton from '../ActionButton';


const styles = (theme) => ({
  tabRoot: {
    minWidth: '0'
  },
  tabLabelContainer: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  },
  tabLabel: {
    fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif"
  },
  tabIndicator: {
    height: "4px"
  },
  container: {
    minHeight: '500px',
    paddingTop: '60px',
    paddingBottom: '60px',
    [theme.breakpoints.down('xs')]: Object.assign(mobilePadding(theme), {
      /*height: "100%",*/
      paddingTop: '0px',
      paddingBottom: '0px'
      /*marginBottom: '91px'*/
    })
  },
  cushion: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  separator: {
    padding: "0 "+theme.spacing.unit,
    fontSize: "1.25rem",
    "&:after": {
      content: "\" \"",
    }
  },
  header: {
    borderBottom: "1px solid "+theme.palette.common.darkGrey
  },
  contentSpacing: {
    margin: "1.5rem 0"
  },
  bottomSpacing: {
    marginBottom: "0.9rem"
  },
  mobileSpacing: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit * 3
    }
  },
  lineSpacing: {
    lineHeight: "1.4rem"
  },
  sectionSpacing: {
    marginBottom: theme.spacing.unit * 0
  },
  dividerSpacing: dividerSpacing(theme),
  orgName: {
    fontSize: "21px",
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  serviceBadge: {
    position: "absolute",
    marginLeft: theme.spacing.unit * -1
  },
  serviceText: {
    display: 'block',
    lineHeight: (theme.spacing.unit * 0.5 + 45).toString() + 'px',
    paddingLeft: theme.spacing.unit * 7,
    //marginTop: theme.spacing.unit * 2,
    //marginBottom: theme.spacing.unit * 2
    //paddingTop:"10px"
  },
  serviceTooltip: {
    top: theme.spacing.unit
  },
  boldFont: boldFont(theme),
  italicFont: italicFont(theme),
  moreInfo: Object.assign({
    color: theme.palette.secondary[500],
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  }, boldFont(theme)),
  bodyLink: bodyLink(theme),
  listLink: {
    '& + &:before': {
      content: '\", \"'
    }
  },
  dialogBody: {
    minWidth: '600px',
    overflowY: 'auto',
    padding: '5.5rem',
  },
  toolbarRoot: {
    justifyContent: 'space-between'
  },
  toolbarGutters: {
    paddingLeft: '0',
    paddingRight: '0',
  }
});

class Detail extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.odClient = new OneDegreeResourceClient();
    this.state = {
      tab: 0,
      orgLoading: true,
      oppLoading: true,
      reviewLoading: true,
      reviewList: {
        organization: false,
        opportunities: false
      },
      //this will be the organization or opportunity whose details are being viwed - potentially confusing terminology, but nothing stands out as a clearer option
      resource: props.resource, 
      acFilter: false,
      userReview: null,
      userComment: null
    };

    this.tabs = [
      {label: "ABOUT", value: "about"},
      {label: "VISIT", mobileLabel: "VISIT (MAP)", value: "visit"},
      {label: "REVIEWS", value: "reviews"}
    ]

    this.handleTabClickDesktop = this.handleTabClickDesktop.bind(this);
    this.handleTabClickMobile = this.handleTabClickMobile.bind(this);
    this.handleSwipeChange = this.handleSwipeChange.bind(this);

    this.handleResourceRequest = this.handleResourceRequest.bind(this);
    this.handleOpportunityRequest = this.handleOpportunityRequest.bind(this);
    this.handleCommentRequest = this.handleCommentRequest.bind(this);
    this.handleRatingRequest = this.handleRatingRequest.bind(this);
    this.handleNewReview = this.handleNewReview.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);

    /*this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);*/
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
        callback: this.handleResourceRequest
      });
    } else {
      this.odClient.getOpportunities({
        id: this.state.resource.id,
        per_page: this.state.resource.opportunity_count,
        callback: this.handleOpportunityRequest
      })
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
    if(nextProps.user !== this.props.user) {
      //TODO: handle login while on the form
    }
  }

  handleResourceRequest(response) {
    if(response.status && response.status == 'error') {
      //redirect
    } else {
      this.resourceProperties = this.odClient.collectOpportunityProperties(response.opportunities);
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
    if(response.status && response.status == 'error') {
      //redirect
    } else {
      this.resourceProperties = this.odClient.collectOpportunityProperties(response.opportunities);
      this.getReviews(this.state.resource);
      this.getUserRating(this.state.resource);
      this.setState(prevState => ({
        resource: Object.assign(prevState.resource, {opportunities: response.opportunities}),
        oppLoading: false
      }))
    }
  }

  /*handleDialogOpen(dialog) {
    this.setState({dialog});
  }

  handleDialogClose() {
    this.setState({dialog: 'none'});
  }*/

  handleNewReview({resourceType = 'organization', type, data } = {}) {
    let reviewList = this.state.reviewList
    reviewList[resourceType] = [data].concat(reviewList[resourceType].filter(comment => comment.client_user_id !== data.client_user_id));
    this.setState({
      reviewList: reviewList
    });
  }

  getReviews(resource) {
    const { handleCommentRequest } = this;
    if(resource.opportunity_comment_count) {
      this.odClient.getCommentsFromOrganizationId({
        resourceType: 'opportunities',
        id: resource.id,
        per_page: resource.opportunity_comment_count,
        callback: (response) => { handleCommentRequest('opportunities', response) }
      })
    } else {
      this.setState({
        reviewList: {
          opportunities: [],
          organization: this.state.reviewList.organization
        }
      });
    }

    if(resource.comment_count) {
      this.odClient.getCommentsFromOrganizationId({
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
    }
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

  handleCommentRequest(type, response) {
    //find user's comment
    let userComment = false;
    if(this.props.user && type=="organization") {
      response.comments.forEach((comment) => {
        if(comment.client_user_id == this.props.user.toString()) {
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
    if(response) {
      userReview = response;
    }
    this.setState({
      userReview
    });
  }

  handleFilterChange(event, acFilter) {
    this.setState({acFilter});
  }

  handleTabClickDesktop (e, tab) {
    this.setState({
      tab
    });
    scroller.scrollTo(this.tabs[tab].value, {
      duration: 500,
      delay: 100,
      smooth: true
    })
  }

  handleTabClickMobile (e, tab) {
    this.setState({
      tab
    });
  }

  handleSwipeChange(index, indexLatest) {
    this.setState({
      tab: index
    });
  }

  render() {
    const { classes, session, handleMessageNew, history } = this.props;
    const { props } = this;
    const { resource } = this.state;
    const languages = (this.resourceProperties && this.resourceProperties.length ? 
                        this.resourceProperties
                          .filter((item) => ( item.slug.indexOf('lang') === 0))
                      : null);
    const communities = (this.resourceProperties && this.resourceProperties.length ? 
                        this.resourceProperties
                          .filter((item) => ( item.slug.indexOf('community') === 0))
                      : null);

    const sharePath = props.type //+ '/' + resource.id+'/' + props.resource.name;

    const isMobile = this.props.width < breakpoints['sm'];
    return (
      <Grid container alignItems='flex-start' justify='center' spacing={0} className={classes.container}>
        <Grid item xs={12} sm={11} md={10} lg={10} xl={11} >
          { this.state.orgLoading ? <Loading /> :
          <div> {/******* MOBILE *******/}
            {isMobile ?
              <div>  
                <Toolbar classes={{ root: classes.toolbarRoot, gutters: classes.toolbarGutters }}>
                  <AsylumConnectBackButton onClick={() => {history.goBack()}} />
                  <AsylumConnectButton 
                    variant="primary"
                    className="center-align"
                    onClick={() => (
                      props.session 
                      ? props.handleRequestOpen('share/'+sharePath) 
                      : props.handleMessageNew('You must be logged in to share resources') )}
                    >share
                  </AsylumConnectButton> 
                  <SaveToFavoritesButton
                    handleListAddFavorite={props.handleListAddFavorite}
                    handleListRemoveFavorite={props.handleListRemoveFavorite}
                    handleListNew={props.handleListNew}
                    handleLogOut={props.handleLogOut}
                    handleRequestOpen={props.handleRequestOpen}
                    handleMessageNew={props.handleMessageNew}
                    lists={props.lists}
                    resourceId={resource.id}
                    session={props.session}
                    user={props.user}
                  />
                </Toolbar>
                <DetailHeader 
                  classes={classes}
                  website={resource.website}
                  name={resource.name}
                  rating={resource.rating}
                  totalRatings={resource.opportunity_comments.length}
                  phones={resource.phones}
                  resource={resource}
                  isMobile={isMobile}
                />
                <DetailHeaderTabs
                  tabs={this.tabs}
                  tab={this.state.tab}
                  classes={classes}
                  handleTabClick={this.handleTabClickMobile}
                  isMobile={isMobile}
                />
                <Divider />
                <SwipeableViews
                  index={this.state.tab}
                  onChangeIndex={this.handleSwipeChange}
                >
                  <div>
                  {this.state.oppLoading ? 
                    <Loading />
                  : 
                    <About communities={communities} languages={languages} classes={classes} resource={resource} />
                  }
                  </div>
                  <div className={classes.mobileSpacing}>
                    <Visit 
                      resource={resource}
                      isMobile={isMobile}
                    />
                    <AsylumConnectMap
                      resources={this.props.mapResources}
                      loadingElement={<div style={{ width:"100%", height: window.innerHeight/2+"px" }} />}
                      containerElement={<div style={{ width:"100%",height: window.innerHeight/2+"px" }} />}
                      mapElement={<div style={{ width:"100%",height: window.innerHeight/2+"px" }} />} 
                      mapMaxDistance={this.props.mapMaxDistance}
                    />
                  </div>
                  <div className={classes.mobileSpacing}>
                    {session 
                      && (this.state.userReview === false || this.state.userReview === null)
                      && (this.state.userComment === false ||  this.state.userComment === null) ?
                      <ReviewForm 
                        resource={resource}
                        session={props.session}
                        user={props.user}
                        onSubmit={this.handleNewReview}
                      />
                    : null}
                    <Reviews
                      orgReviews={this.state.reviewList.organization}
                      oppReviews={this.state.reviewList.opportunities}
                      acFilter={this.state.acFilter}
                      handleFilterChange={this.handleFilterChange}
                      isMobile={isMobile}
                    />
                  </div>
                </SwipeableViews>
              </div>
            : 
            <div> {/******* DESKTOP *******/}
              <Tools 
                {...props}
                classes={classes} 
                handleTabClick={this.handleTabClickDesktop}
                handleRequestOpen={this.props.handleRequestOpen}
                resource={resource}
                sharePath={sharePath}
                tab={this.state.tab}
                tabs={this.tabs}
              />
              <DetailHeader 
                classes={classes}
                website={resource.website}
                name={resource.name}
                rating={resource.rating}
                totalRatings={resource.opportunity_comments.length}
                phones={resource.phones}
                resource={resource}
              />
              <Element name="visit"></Element>
              <About classes={classes} resource={resource} />
              {this.state.oppLoading ? 
                <Loading />
              : null}
              {this.state.oppLoading && props.communities && props.communities.length ? 
                null
              : <AsylumConnectCollapsibleSection title={'Who this '+props.type+' serves'} content={<Communities list={communities} classes={classes} />} />}
              {this.state.oppLoading && resource.opportunities && resource.opportunities.length ? 
                null
              : <AsylumConnectCollapsibleSection title='Services' content={<Services resource={resource} list={resource.opportunities} classes={classes} />} />}
              {this.state.oppLoading && languages && languages.length ? 
                null
              : <AsylumConnectCollapsibleSection title='Non-English services' content={<Languages list={languages} classes={classes} />} />}
              <Element name="visit"></Element>
              <AsylumConnectCollapsibleSection title={'Visit'} content={<Visit resource={resource} />} />
              <Element name="reviews"></Element>
              {session 
                && (this.state.userReview === false || this.state.userReview === null)
                && (this.state.userComment === false ||  this.state.userComment === null) ?
                <AsylumConnectCollapsibleSection title={'Leave a review'} content={<ReviewForm 
                    resource={resource}
                    session={props.session}
                    user={props.user}
                    onSubmit={this.handleNewReview}
                  />} 
                />
              : null}
              <AsylumConnectCollapsibleSection title={'Reviews'} content={<Reviews
                  orgReviews={this.state.reviewList.organization}
                  oppReviews={this.state.reviewList.opportunities}
                  acFilter={this.state.acFilter}
                  handleFilterChange={this.handleFilterChange}
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

Detail.propTypes = {
  handleMessageNew: PropTypes.func.isRequired
}

export default withWidth(withStyles(styles)(Detail));
