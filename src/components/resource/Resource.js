import React from 'react';
import PropTypes from 'prop-types';

import langs from 'langs';
import trim from 'trim';

import Tabs, { Tab } from 'material-ui/Tabs';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';

import { Element, scroller } from 'react-scroll';

import AsylumConnectButton from '../AsylumConnectButton';
import AsylumConnectSwitch from '../AsylumConnectSwitch';
import ACBadge from '../Badge';
import FavoritesLink from '../FavoritesLink';
import RatingControl from './RatingControl';
import RatingAndReviews from './RatingAndReviews';
import Reviews from './Reviews';
import SaveToFavoritesButton from '../SaveToFavoritesButton';
import Loading from '../Loading';

import OneDegreeResourceClient from '../../helpers/OneDegreeResourceClient';
import resourceTypes from '../../helpers/ResourceTypes';
import propertyMap from '../../helpers/OneDegreePropertyMap';
import { scheduleParser, addressParser } from '../../helpers/Parser';

import {bodyLink, boldFont, dividerSpacing} from '../../theme/sharedClasses';
import ShareDialog from '../share/ShareDialog';
import ActionButton from '../ActionButton';

let resourceIndex = resourceTypes.getTagIndex();

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
    container: {
      height: "100%",
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  },
  dialogBody: {
    minWidth: '600px',
    overflowY: 'auto',
    padding: '5.5rem',
  },
});



const ReviewForm = ({classes}) => (
  <Grid container spacing={0}>
    <Grid item xs={12}>
      <Typography type="subheading" className={classes.boldFont+' '+classes.bottomSpacing} >
        Leave a review
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <div>
      </div>
    </Grid>
    <Grid item xs={12}>
      <Divider className={classes.dividerSpacing} />
    </Grid>
  </Grid>
);

const Communities = (props) => (
  <Grid container spacing={0}>
    <Grid item xs={12} className={props.classes.sectionSpacing}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography type="subheading" className={props.classes.boldFont+' '+props.classes.bottomSpacing} >
            Who this resource serves
          </Typography>
        </Grid>
        <Grid item xs={12}>
        {props.list && props.list.length ? 
          <Typography type="body2" className={props.classes.bottomSpacing} > 
            { props.list.map((item) => {
                  if(typeof propertyMap['community'][item.slug] !== 'undefined') {
                    return propertyMap['community'][item.slug];
                  }
                })
                .join(', ')
            }
          </Typography>
        : null }
        </Grid>
      </Grid>
    </Grid>
  </Grid>
)

const Languages = (props) => (
  <Grid item xs={12} className={props.classes.sectionSpacing}>
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Typography type="subheading" className={props.classes.boldFont+' '+props.classes.bottomSpacing} >
          Non-English Services
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {(props.list && props.list ?
          props.list.map((item) => {
            if(typeof propertyMap['language'][item.slug] !== "undefined") {
              let property = propertyMap['language'][item.slug], text;
              if(typeof property.name !== "undefined") {
                text = property.name;
              } else {
                text = langs.where('1', property.code).name;
              }
              return (
                <Typography key={text} type="body2" className={props.classes.bottomSpacing} >
                  {text}
                </Typography>
              )
            } else {
              return null;
            }
          })
        : null)}
      </Grid>
    </Grid>
  </Grid>
)

const Services = (props) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} className={props.classes.sectionSpacing}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography type="subheading" className={props.classes.boldFont+' '+props.classes.bottomSpacing} >
              Services
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {(props.list && props.list ?
              props.list.map((item) => {
                return (
                  <Typography key={item.id} type="body2" >
                    {item.tags && item.tags.length ?
                      (() => {
                        let badges = [];
                        return item.tags.map((tag) => {
                          if(badges.length) {
                            return null
                          } else if(typeof resourceIndex[tag] !== 'undefined' && badges.indexOf(resourceIndex[tag].type) === -1) {
                            badges.push(resourceIndex[tag].type);
                            return (
                              <ACBadge extraClasses={{icon: props.classes.serviceBadge,tooltip:props.classes.serviceTooltip}} key={resourceIndex[tag].type} type={resourceIndex[tag].type} width='45px' height='45px' />
                            )
                          } else if(badges.indexOf('misc') === -1) {
                            badges.push('misc');
                            return (
                              <ACBadge extraClasses={{icon: props.classes.serviceBadge,tooltip:props.classes.serviceTooltip}} key='misc' type='misc' width='45px' height='45px' />
                            )
                          }
                        })
                      })()
                    : null}
                    <p className={props.classes.serviceText}>{item.title}</p>
                  </Typography>
                )
              })
            : null)}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const About = (props) => (
  <Grid container spacing={0}>
    <Grid item xs={12} className={props.classes.contentSpacing}>
      <Grid container spacing={0}>
        <Typography type="body2" className={props.classes.bottomSpacing+' '+props.classes.lineSpacing}>
          {props.resource.description}
        </Typography>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Divider className={props.classes.dividerSpacing} /><Element name="about"></Element>
    </Grid>
    <Grid item xs={12}>
      {props.communities && props.communities.length ? <Communities list={props.communities} classes={props.classes} /> : null}
      {props.resource.opportunities && props.resource.opportunities.length ? <Services list={props.resource.opportunities} classes={props.classes} /> : null}
      {props.languages && props.languages.length ? <Languages list={props.languages} classes={props.classes} /> : null}
    </Grid>
    {/*<Grid item xs={12}>
      <Typography type="subheading" className={props.classes.boldFont+' '+props.classes.bottomSpacing} >
        Additional Information
      </Typography>
    </Grid>*/}
  </Grid>
);

const Visit = ({resource, classes}) => (
  <Grid container spacing={0}>
    <Grid item xs={12}>
      <Typography type="subheading" className={classes.boldFont+' '+classes.bottomSpacing} >
        How to visit this resource
      </Typography>
    </Grid>
     <Grid item xs={12} className={classes.dividerSpacing}>
      <Typography type="body2" className={classes.lineSpacing} ><strong className={classes.boldFont}>Website: </strong>{resource.website ? <a href={resource.website} target="_blank" className={classes.bodyLink}>{resource.website}</a> : null}</Typography>
      {resource.emails && resource.emails.length ? 
        <Typography type="body2" className={classes.lineSpacing} >
          <strong className={classes.boldFont}>Email: </strong>{resource.emails.map((email) => {
            let name = trim(
              (email.title ? email.title : '')+ ' ' +
              (email.first_name ? email.first_name : '')+ ' ' +
              (email.last_name ? email.last_name : '')
            );
            return (
            <a href={"mailto:"+email.email} key={email.id} className={classes.bodyLink+' '+classes.listLink}>
              {email.email} 
              {name ? "("+name+")" : ''}
            </a>
        )})}
      </Typography> : null}
      {resource.phones && resource.phones.length ? 
      <Typography type="body2" className={classes.lineSpacing} >
        <strong className={classes.boldFont}>Phone number(s): </strong>{resource.phones.map((phone) => (
          <Phone key={phone.id} phone={phone} classes={classes} />
        )
      )}
      </Typography> : null }
      {resource.locations && resource.locations.length ? 
        resource.locations.map((location) => (
          <Typography key={location.id} type="body2" className={classes.lineSpacing} >
            <strong className={classes.boldFont}>Location: </strong>
            {addressParser({address: location})}
          </Typography>
        ))
      : null}
      {resource.schedule && Object.keys(resource.schedule).length > 1 ?
        <Typography type="body2" className={classes.lineSpacing} >
          {scheduleParser({schedule: resource.schedule})}
        </Typography>
      : null}
      {/*<Typography type="body2" className={classes.lineSpacing} >
        <strong className={classes.boldFont}>Public transportation: </strong>
      </Typography>*/}
    </Grid>
  </Grid>
);

const OrgHeader = ({classes, resource}) => (
  <Grid container spacing={0} alignItems='center'>
    <Grid item xs={12} >
      <Grid container alignItems="flex-start" justify="space-between" spacing={0}>
        <Grid item xs md lg xl >
          <Typography type="subheading" className={classes.orgName + ' ' + classes.boldFont}>{resource.name}</Typography>
        </Grid>
        <Grid item xs={5} className="pull-right">
          <RatingAndReviews total={resource.opportunity_comments.length} rating={resource.rating} />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12} >
      <Typography type="body1" className={classes.moreInfo+' '+classes.bottomSpacing} >
        <a href="{resource.website}" className={classes.bodyLink}>{resource.website}</a> {resource.phones && resource.phones.length ? "| "+resource.phones[0].digits : null}
      </Typography>
    </Grid>
  </Grid>
);

const Tools = (props) => (
  <Grid container spacing={0} alignItems='center' justify='center' className={props.classes.header+' '+props.classes.dividerSpacing}>
    <Grid item xs={12} sm={5} md={5} lg={5}>
      <Tabs
        value={props.tab}
        onChange={props.handleTabClick}
        indicatorColor="primary"
        textColor="black"
        fullWidth={true}
        scrollable={false}
        indicatorClassName={props.classes.tabIndicator}
      >
        <Tab value="about" label="ABOUT" classes={{root: props.classes.tabRoot, label: props.classes.tabLabel, labelContainer: props.classes.tabLabelContainer}} />
        <Tab value="visit" label="VISIT" classes={{root: props.classes.tabRoot, label: props.classes.tabLabel, labelContainer: props.classes.tabLabelContainer}} />
        <Tab value="reviews" label="REVIEWS" classes={{root: props.classes.tabRoot, label: props.classes.tabLabel, labelContainer: props.classes.tabLabelContainer}} />
      </Tabs>
    </Grid>
    <Grid item xs={12} sm={7} className="pull-right">
      <div className="center-align">
        <SaveToFavoritesButton
          handleListAddFavorite={props.handleListAddFavorite}
          handleListRemoveFavorite={props.handleListRemoveFavorite}
          handleListNew={props.handleListNew}
          handleMessageNew={props.handleMessageNew}
          lists={props.lists}
          resourceId={props.resourceId}
          session={props.session}
          user={props.user}
        />
      </div>
      <div className={props.classes.separator + " center-align"} ></div>
      <AsylumConnectButton 
        variant="secondary"
        className="center-align"
        onClick={() => props.handleDialogOpen('share')}
        >share</AsylumConnectButton> 
    </Grid>
  </Grid>
);

const Phone = (props) => {
  const { phone, classes } = props;
  let icon, phoneType = (phone.phone_type ? phone.phone_type.toLowerCase() : null);
  switch(phoneType) {
    case "fax": 
      icon = "fa-fax";
      break;
    default:
      icon = "fa-phone"
  }
  return (
    <a href={"tel:"+phone.digits} className={classes.bodyLink+' '+classes.listLink}>
      <i className={"fa "+icon} aria-hidden="true"></i>&nbsp;
      {phone.digits}
    </a>
  )
}

class Resource extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.odClient = new OneDegreeResourceClient();
    this.state = {
      tab: 'about',
      orgLoading: true,
      oppLoading: true,
      reviewLoading: true,
      reviewList: {
        organization: false,
        opportunities: false
      },
      dialog: 'none',
      acFilter: false
    };

    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleResourceRequest = this.handleResourceRequest.bind(this);
    this.handleOpportunityRequest = this.handleOpportunityRequest.bind(this);
    this.handleReviewRequest = this.handleReviewRequest.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleReviewRequest = this.handleReviewRequest.bind(this);
    this.handleCommentRequest = this.handleCommentRequest.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
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
      this.resource = this.props.resource
      this.setState({
        orgLoading: false,
        oppLoading: true
      });
      this.odClient.getOpportunities({
        id: this.resource.id,
        per_page: this.resource.opportunity_count,
        callback: this.handleOpportunityRequest
      })
    }
  }

  componentWillUnmount() {
  }

  handleReviewRequest(response) {
    //update state with reviews
  }

  handleResourceRequest(response) {
    if(response.status && response.status == 'error') {
      //redirect
    } else {
      this.resource = response;
      this.resourceProperties = this.odClient.collectOpportunityProperties(this.resource.opportunities);
      this.getOpportunityReviews();
      this.setState({
        orgLoading: false,
        oppLoading: false
      });
    }
  }

  handleOpportunityRequest(response) {
    if(response.status && response.status == 'error') {
      //redirect
    } else {
      this.resource.opportunities = response.opportunities;
      this.resourceProperties = this.odClient.collectOpportunityProperties(this.resource.opportunities);
      this.getOpportunityReviews();
      this.setState({
        oppLoading: false
      })
    }
  }

  handleDialogOpen(dialog) {
    this.setState({dialog});
  }

  handleDialogClose() {
    this.setState({dialog: 'none'});
  }

  getOpportunityReviews() {
    const { handleCommentRequest } = this;
    if(this.resource.opportunity_comment_count) {
      this.odClient.getCommentsFromOrganizationId({
        resourceType: 'opportunities',
        id: this.resource.id,
        per_page: this.resource.opportunity_comment_count,
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

    if(this.resource.comment_count) {
      this.odClient.getCommentsFromOrganizationId({
        resourceType: 'organization',
        id: this.resource.id,
        per_page: this.resource.comment_count,
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
    console.log(list);
    this.setState({
      reviewList: list
    });
  }

  handleFilterChange(event, acFilter) {
    this.setState({acFilter});
  }

  handleTabClick (e, tab) {
    this.setState({
      tab
    });
    scroller.scrollTo(tab, {
      duration: 500,
      delay: 100,
      smooth: true
    })
  }

  render() {
    const { classes, session, handleMessageNew } = this.props;
    const { resource } = this;
    const languages = (this.resourceProperties && this.resourceProperties.length ? 
                        this.resourceProperties
                          .filter((item) => ( item.slug.indexOf('lang') === 0))
                      : null);
    const communities = (this.resourceProperties && this.resourceProperties.length ? 
                        this.resourceProperties
                          .filter((item) => ( item.slug.indexOf('community') === 0))
                      : null);

    return (
      <Grid container alignItems='flex-start' justify='center' spacing={0} className={classes.container}>
        <Grid item md={10} lg={9} xs={12}>
          { this.state.orgLoading ? <Loading /> :
          <div>
            {/*isMobile ?  
             {/* Appbar }
              <OrgHeader 
                classes={classes}
                resource={resource}
              />
              <
            :*/}  
            <Tools 
              classes={classes} 
              handleTabClick={this.handleTabClick}
              handleDialogOpen={this.handleDialogOpen}
              resourceId={this.resource.id}
              tab={this.state.tab}
              {...this.props}
            />
            <OrgHeader 
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
              classes={classes}
              resource={resource}
            />
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Divider className={classes.dividerSpacing} /><Element name="reviews"></Element>
              </Grid>
            </Grid>
            {session ? 
              <ReviewForm 
                classes={classes}
              />
            : null}
            <Reviews
              orgReviews={this.state.reviewList.organization}
              oppReviews={this.state.reviewList.opportunities}
              acFilter={this.state.acFilter}
              handleFilterChange={this.handleFilterChange}
            />
            <Dialog open={this.state.dialog !== 'none'} onRequestClose={this.handleDialogClose}>
              <div className={classes.dialogBody}>
                <ActionButton
                  onClick={this.handleDialogClose}
                  >&times;</ActionButton>              
              {this.state.dialog === 'share' &&
                <ShareDialog
                  handleMessageNew={handleMessageNew}
                  handleRequestClose={this.handleDialogClose}
                  // session={session}
                  listId={resource.id}
                  listTitle={resource.name}
                  shareType="resource"
                />
              }
              </div>
            </Dialog> 
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

export default withStyles(styles)(Resource);
