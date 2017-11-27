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
import ACBadge from '../Badge';

import FavoritesLink from '../FavoritesLink';
import RatingControl from './RatingControl';
import ReviewForm from './ReviewForm';
import RatingAndReviews from './RatingAndReviews';
import SaveToFavoritesButton from '../SaveToFavoritesButton';
import Loading from '../Loading';
import Phone from './Phone';

import About from './ResourceAbout';
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
    paddingLeft: "10px",
    paddingRight: "10px"
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
    paddingBottom: '60px'
  },
  separator: {
    padding: "0 0.75rem",
    fontSize: "1.25rem",
    "&:after": {
      content: "\" \"",
      borderLeft: "1px solid "+theme.palette.common.minBlack 
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
  mobileSpacing: {},
  lineSpacing: {
    lineHeight: "1.4rem"
  },
  sectionSpacing: {
    marginBottom: "1.7rem"
  },
  dividerSpacing: dividerSpacing(theme),
  orgName: {
    fontSize: "21px"
  },
  serviceBadge: {
    position: "absolute"
  },
  serviceText: {
    paddingLeft:"45px",
    paddingTop:"10px"
  },
  serviceTooltip: {
    top: "6px"
  },
  boldFont: boldFont(theme),
  italicFont: italicFont(theme),
  moreInfo: Object.assign({
    color: theme.palette.primary[500]
  }, boldFont(theme)),
  bodyLink: bodyLink(theme),
  listLink: {
    '& + &:before': {
      content: '\", \"'
    }
  },
  [theme.breakpoints.down('sm')]: {
    container: Object.assign(mobilePadding(theme), {
      /*height: "100%",*/
      paddingTop: '0px',
      paddingBottom: '0px'
      /*marginBottom: '91px'*/
    }),
    orgName: {
      textAlign: 'center'
    },
    moreInfo: {
      textAlign: 'center'
    },
    mobileSpacing: {
      marginTop: "1.5rem"
    },
    reviewField: {
      height: "15%"
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

const ResourceHeader = ({classes, resource, isMobile}) => (
  <Grid container spacing={0} alignItems='center'>
    <Grid item xs={12} >
      <Grid container alignItems="flex-start" justify="space-between" spacing={0}>
        <Grid item xs md lg xl >
          <Typography type="subheading" className={classes.orgName + ' ' + classes.boldFont}>{resource.name}</Typography>
        </Grid>
        {isMobile ? null :
        <Grid item xs={5} className="pull-right">
          <RatingAndReviews total={resource.opportunity_comments.length} rating={resource.rating} />
        </Grid>}
      </Grid>
    </Grid>
    <Grid item xs={12} >
      <Typography type="body1" className={classes.moreInfo+' '+classes.bottomSpacing} >
        <a href={resource.website} className={classes.bodyLink}>{isMobile ? url.parse(resource.website).hostname : resource.website}</a> {resource.phones && resource.phones.length ? '| ' : null}{resource.phones && resource.phones.length ? <Phone phone={resource.phones[0]} classes={classes} /> : null}
      </Typography>
    </Grid>
  </Grid>
);

const HeaderTabs = (props) => (
  <Tabs
    value={props.tab}
    onChange={props.handleTabClick}
    indicatorColor="primary"
    textColor="black"
    fullWidth={true}
    scrollable={false}
    indicatorClassName={props.classes.tabIndicator}
  >
    {props.tabs.map((tab) => 
      (<Tab key={tab.value} label={props.isMobile && tab.mobileLabel ? tab.mobileLabel : tab.label} classes={{root: props.classes.tabRoot, label: props.classes.tabLabel, labelContainer: props.classes.tabLabelContainer}} />)
    )}
  </Tabs>
);

const Tools = (props) => (
  <Grid container spacing={0} alignItems='center' justify='center' className={props.classes.header+' '+props.classes.dividerSpacing}>
    <Grid item xs={12} sm={12} md={5} lg={5}>
      <HeaderTabs tabs={props.tabs} tab={props.tab} handleTabClick={props.handleTabClick} classes={props.classes} />
    </Grid>
    <Grid item xs={12} sm={12} md={7} className="pull-right">
      <div className="center-align">
        <SaveToFavoritesButton
          handleListAddFavorite={props.handleListAddFavorite}
          handleListRemoveFavorite={props.handleListRemoveFavorite}
          handleListNew={props.handleListNew}
          handleLogOut={props.handleLogOut}
          handleMessageNew={props.handleMessageNew}
          handleRequestOpen={props.handleRequestOpen}
          lists={props.lists}
          resourceId={props.resource.id}
          session={props.session}
          user={props.user}
        />
      </div>
      <div className={props.classes.separator + " center-align"} ></div>
      <AsylumConnectButton 
        variant="secondary"
        className="center-align"
        onClick={() => props.handleRequestOpen('share/resource/'+props.resource.id+'/'+props.resource.name)}
        >share</AsylumConnectButton> 
    </Grid>
  </Grid>
);

class Resource extends React.Component {
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
      resource: props.resource,
      acFilter: false
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
    this.handleNewReview = this.handleNewReview.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);

    /*this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);*/
  }

  componentWillMount() { console.log(this.props.resource);
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

  handleResourceRequest(response) {
    if(response.status && response.status == 'error') {
      //redirect
    } else {
      this.resourceProperties = this.odClient.collectOpportunityProperties(response.opportunities);
      this.getOpportunityReviews(response);
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
      this.getOpportunityReviews(this.state.resource);
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

  getOpportunityReviews(resource) {
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

  handleCommentRequest(type, response) {
    let list = this.state.reviewList;
    list[type] = response.comments;
    //console.log(list);
    this.setState({
      reviewList: list
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
                <ResourceHeader 
                  classes={classes}
                  resource={resource}
                  isMobile={isMobile}
                />
                <HeaderTabs
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
                    />
                  </div>
                  <div className={classes.mobileSpacing}>
                    {session ? 
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
                tab={this.state.tab}
                tabs={this.tabs}
              />
              <ResourceHeader 
                classes={classes}
                resource={resource}
              />
              {this.state.oppLoading ? 
                <Loading />
              : 
                <About communities={communities} languages={languages} classes={classes} resource={resource} />
              }
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Divider className={classes.dividerSpacing} /><Element name="visit"></Element>
                </Grid>
              </Grid>
              <Visit 
                resource={resource}
              />
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Divider className={classes.dividerSpacing} /><Element name="reviews"></Element>
                </Grid>
              </Grid>
              {session ? 
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
              />
            </div>}
          </div>
          }
        </Grid>       
      </Grid>
    )
  } 
}

Resource.propTypes = {
  handleMessageNew: PropTypes.func.isRequired
}

export default withWidth(withStyles(styles)(Resource));
