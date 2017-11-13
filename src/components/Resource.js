import React from 'react';
import PropTypes from 'prop-types';

import langs from 'langs';
import trim from 'trim';

import Tabs, { Tab } from 'material-ui/Tabs';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

import { Element, scroller } from 'react-scroll';

import AsylumConnectButton from './AsylumConnectButton';
import ACBadge from './Badge';
import FavoritesLink from './FavoritesLink';
import RatingAndReviews from './RatingAndReviews';
import OneDegreeResourceClient from '../helpers/OneDegreeResourceClient';
import resourceTypes from '../helpers/ResourceTypes';
import propertyMap from '../helpers/OneDegreePropertyMap';
import {bodyLink} from '../theme/sharedClasses';

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
  lineSpacing: {
    lineHeight: "1.4rem",
    marginBottom: "0.9rem"
  },
  sectionSpacing: {
    marginBottom: "1.7rem"
  },
  dividerSpacing: {
    marginBottom: "2rem"
  },
  orgName: {
    fontSize: "21px"
  },
  boldFont: {
    fontWeight: "600",
  },
  moreInfo: {
    fontWeight: "600",
    color: theme.palette.primary[500]
  },
  bodyLink: bodyLink(theme),
  listLink: {
    '& + &:before': {
      content: '\", \"'
    }
  }
});

const Communities = (props) => (
  <Grid item xs={12} className={props.classes.sectionSpacing}>
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Typography type="subheading" className={props.classes.boldFont+' '+props.classes.lineSpacing} >
          Who this resource serves
        </Typography>
      </Grid>
      <Grid item xs={12}>
      {props.list && props.list.length ? 
        <Typography type="body2" className={props.classes.lineSpacing} > 
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
)

const Languages = (props) => (
  <Grid item xs={12} className={props.classes.sectionSpacing}>
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Typography type="subheading" className={props.classes.boldFont+' '+props.classes.lineSpacing} >
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
                <Typography key={text} type="body2" className={props.classes.lineSpacing} >
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
     <Grid item xs={12} className={props.classes.sectionSpacing}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography type="subheading" className={props.classes.boldFont+' '+props.classes.lineSpacing} >
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
                        if(typeof resourceIndex[tag] !== 'undefined' && badges.indexOf(resourceIndex[tag].type) === -1) {
                          badges.push(resourceIndex[tag].type);
                          return (
                            <ACBadge key={resourceIndex[tag].type} type={resourceIndex[tag].type} width='45px' height='45px' />
                          )
                        }
                      })
                    })()
                  : null}
                  {item.title}
                </Typography>
              )
            })
          : null)}
        </Grid>
      </Grid>
    </Grid>
  );
}

const About = (props) => (
  <div>
    <Grid item xs={12} className={props.classes.contentSpacing}>
      <Grid container spacing={0}>
        <Typography type="body2" className={props.classes.lineSpacing}>
          {props.resource.description}
        </Typography>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Divider className={props.classes.dividerSpacing} /><Element name="about"></Element>
    </Grid>
    {props.communities && props.communities.length ? <Communities list={props.communities} classes={props.classes} /> : null}
    {props.resource.opportunities && props.resource.opportunities.length ? <Services list={props.resource.opportunities} classes={props.classes} /> : null}
    {props.languages && props.languages.length ? <Languages list={props.languages} classes={props.classes} /> : null}
    {/*<Grid item xs={12}>
      <Typography type="subheading" className={props.classes.boldFont+' '+props.classes.lineSpacing} >
        Additional Information
      </Typography>
    </Grid>*/}
  </div>
);

const Loading = (props) => (
  <Grid container spacing={0}>
    <Grid item xs={12} style={{textAlign: "center"}}>
      <CircularProgress />
    </Grid>
  </Grid>
);

class Resource extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.odClient = new OneDegreeResourceClient();
    this.state = {
      tab: 'about',
      loading: true,
      oppLoading: true
    };

    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleResourceRequest = this.handleResourceRequest.bind(this);
    this.handleOpportunityRequest = this.handleOpportunityRequest.bind(this);
  }

  componentDidMount() {
    if(this.props.resource == null) {
      this.setState({
        loading: true,
        oppLoading: true
      });
      this.odClient.getOrganization({
        id: this.props.match.params.id,
        callback: this.handleResourceRequest
      });
    } else {
      this.setState({
        loading: false,
        oppLoading: true
      });
      this.resource = this.props.resource
      this.odClient.getOpportunities({
        id: this.resource.id,
        per_page: this.resource.opportunity_count,
        callback: this.handleOpportunityRequest
      })
    }
  }

  componentWillUnmount() {
  }

  handleResourceRequest(response) {
    if(response.status && response.status == 'error') {
      //redirect
    } else {
      this.resource = response;
      this.resourceProperties = this.odClient.collectOpportunityProperties(this.resource.opportunities)
      this.setState({
        loading: false,
        oppLoading: false
      });
    }
  }

  handleOpportunityRequest(response) {
    if(response.status && response.status == 'error') {
      //redirect
    } else {
      this.resource.opportunities = response.opportunities;
      this.resourceProperties = this.odClient.collectOpportunityProperties(this.resource.opportunities)
      this.setState({
        oppLoading: false
      })
    }
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
    const { classes, session } = this.props;
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
      <div>
      { this.state.loading ?
        <Loading />
      :
      <div>
        <Grid container spacing={0} alignItems='center' justify='center' className={classes.header+' '+classes.dividerSpacing}>
          <Grid item xs={12} sm={5} md={5} lg={5}>
            <Tabs
              value={this.state.tab}
              onChange={this.handleTabClick}
              indicatorColor="primary"
              textColor="black"
              fullWidth={true}
              scrollable={false}
              indicatorClassName={classes.tabIndicator}
            >
              <Tab value="about" label="ABOUT" classes={{root: classes.tabRoot, label: classes.tabLabel, labelContainer: classes.tabLabelContainer}} />
              <Tab value="visit" label="VISIT" classes={{root: classes.tabRoot, label: classes.tabLabel, labelContainer: classes.tabLabelContainer}} />
              <Tab value="reviews" label="REVIEWS" classes={{root: classes.tabRoot, label: classes.tabLabel, labelContainer: classes.tabLabelContainer}} />
            </Tabs>
          </Grid>
          <Grid item xs={12} sm={7} className="pull-right">
            <div className="center-align">
              <FavoritesLink>save to favorites</FavoritesLink> 
            </div>
            <div className={classes.separator + " center-align"} ></div>
            <AsylumConnectButton variant="secondary" className="center-align">share</AsylumConnectButton> 
          </Grid>
        </Grid>
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
            <Typography type="body1" className={classes.moreInfo+' '+classes.lineSpacing} >
              {resource.website} {resource.phones && resource.phones.length ? "| "+resource.phones[0].digits : null}
            </Typography>
          </Grid>
          {this.state.oppLoading ? 
            <Loading />
          : <About communities={communities} languages={languages} classes={classes} resource={resource} />}
          <Grid item xs={12}>
            <Divider className={classes.dividerSpacing} /><Element name="visit"></Element>
          </Grid>
          <Grid item xs={12}>
            <Typography type="subheading" className={classes.boldFont+' '+classes.lineSpacing} >
              How to visit this resource
            </Typography>
          </Grid>
           <Grid item xs={12}>
            <Typography type="body2" className={classes.lineSpacing} ><strong className={classes.boldFont}>Website: </strong>{resource.website ? <a href={resource.website} target="_blank" className={classes.bodyLink}>{resource.website}</a> : null}</Typography>
            {resource.emails && resource.emails.length ? 
              <Typography type="body2" className={classes.lineSpacing} >
                <strong className={classes.boldFont}>Email: </strong>{resource.emails.map((email) => {
                  let name = trim(
                    (email.title ? email.title : '')+ ' '
                    (email.first_name ? email.first_name : '')+ ' '
                    (email.last_name ? email.last_name : '')
                  );
                  return (
                  <a href={"mailto:"+email.email} key={email.id} className={classes.bodyLink+' '+classes.listLink}>
                    {email.email} 
                    {name ? "("+name+")" : ''}
                  </a>
              )})}
            </Typography> : null}
            <Typography type="body2" className={classes.lineSpacing} >
              <strong>Phone number(s): </strong>{resource.phones.map((phone) => {
                  let icon, phoneType = (phone.phone_type ? phone.phone_type.toLowerCase() : null);
                  switch(phoneType) {
                    case "fax": 
                      icon = "fa-fax";
                      break;
                    default:
                      icon = "fa-phone"
                  }
                  return (
                  <a href={"tel:"+phone.digits} key={phone.id} className={classes.bodyLink+' '+classes.listLink}>
                    <i className={"fa "+icon} aria-hidden="true"></i>&nbsp;
                    {phone.digits}
                  </a>
              )})}
            </Typography>
            <Typography type="body2" className={classes.lineSpacing} ><strong>Address: </strong>{resource.website}</Typography>
            <Typography type="body2" className={classes.lineSpacing} ><strong>Hours: </strong>{resource.website}</Typography>
            <Typography type="body2" className={classes.lineSpacing} ><strong>Public transportation: </strong>{resource.website}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider className={classes.dividerSpacing} /><Element name="reviews"></Element>
          </Grid>
          {session ? 
          <Grid item xs={12}>
            <div>
            </div>
          </Grid>
          : null }
          <Grid item xs={12}>
            <Divider className={classes.dividerSpacing} />
          </Grid>
          <Grid item xs={12}>
            <Typography type="subheading" className={classes.boldFont+' '+classes.lineSpacing} >
              Reviews
            </Typography>
          </Grid>
        </Grid>
      </div>
      }
      </div>
    )
  } 
}

export default withStyles(styles)(Resource);