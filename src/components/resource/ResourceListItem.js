import React from 'react';
import PropTypes from 'prop-types';
import Truncate from 'react-truncate';

import Fa from 'react-fontawesome';
import {
  Link
} from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

import {boldFont} from '../../theme/sharedClasses';
import { withStyles } from 'material-ui/styles';
import withWidth from '../withWidth';
import breakpoints from '../../theme/breakpoints';
import SaveToFavoritesButton from '../SaveToFavoritesButton';
import FavoritesLink from '../FavoritesLink';
import RatingAndReviews from './RatingAndReviews';
import Badge from '../Badge';
import ResourceVisit from './ResourceVisit';
import resourceTypes from '../../helpers/ResourceTypes';
import { scheduleParser, addressParser } from '../../helpers/Parser';

let resourceIndex = resourceTypes.getTagIndex();

const styles = (theme) => ({
  boldFont: boldFont(theme),
  contentSpacing: {
    margin: "1.5rem 0"
  },
  lineSpacing: {
    lineHeight: "1.4rem"
  },
  dividerSpacing: {
    marginBottom: "2rem"
  },
  orgName: {
    fontSize: "21px"
  },
  moreInfo: {
    fontWeight: "600",
    color: theme.palette.primary[500]
  },
  [theme.breakpoints.down('sm')]: {
    pullLeft: {
      textAlign: "left"
    },
    contentSpacing: {
      margin: "0.75rem 0"
    },
    badgeSpacing: {
      marginBottom: "0.75rem"
    }
  }
});

/*const resourceFieldsByFormat = {
  'search': [
    {fieldName: 'description', label: 'About'}
  ],
  'favoritesMobile': [
    {fieldName: 'description', label: 'About'},
    {fieldName: 'website', label: 'Website'},
    {fieldName: 'phones', label: 'Phone'},
    {fieldName: 'emails', label: 'Email'},
    {fieldName: 'locations', label: 'Address'},
    {fieldName: 'schedule', label: 'Hours'},
    {fieldName: 'additional', label: 'Additional Information'},
  ],
}*/

class ResourceListItem extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const {
      format,
      resource,
      classes,
      handleListAddFavorite,
      handleListRemoveFavorite,
      handleListNew,
      handleMessageNew,
      handleRemoveFavorite,
      handleRequestOpen,
      isOnFavoritesList,
      slug,
      lists,
      session,
      user
    } = this.props;
    const {
      rightSide,
      ratingSpacing,
      contentSpacing,
      lineSpacing,
      dividerSpacing,
      badgeSpacing,
      moreInfo,
      orgName,
      pullLeft
    } = classes;
    const isMobile = this.props.width < breakpoints['sm'];

    const displayData = [
      {fieldName: 'description', label: 'About', value: resource.description},
      /*{fieldName: 'website', label: 'Website', value: resource.website},
      {fieldName: 'phones', label: 'Phone', value: },
      {fieldName: 'emails', label: 'Email'},
      {fieldName: 'locations', label: 'Address'},
      {fieldName: 'schedule', label: 'Hours'},
      {fieldName: 'additional', label: 'Additional Information'},*/
    ];

    const labelClass = format == 'search' ? 'hide--on-screen' : null;

    //this.props.fetchSearchResults();
    return (
      <div className='page-break-inside--avoid'>
        <Divider className={dividerSpacing} />
        <Grid container spacing={0} className={dividerSpacing}>
          <Grid item xs={12} >
            <Grid container alignItems="center" justify="space-between" spacing={0}>
              <Grid item xs={8} md lg xl >
                <Link to={'/resource/'+resource.slug}><Typography type="subheading" className={orgName}>{resource.name}</Typography></Link>
              </Grid>
              <Grid item xs={4} container alignItems="flex-start" justify="flex-end">
                {!isOnFavoritesList && (
                  <SaveToFavoritesButton
                    handleListAddFavorite={handleListAddFavorite}
                    handleListRemoveFavorite={handleListRemoveFavorite}
                    handleListNew={handleListNew}
                    handleMessageNew={handleMessageNew}
                    handleRequestOpen={handleRequestOpen}
                    lists={lists}
                    resourceId={resource.id}
                    session={session}
                    user={user}
                  />
                )}
                {isOnFavoritesList && (
                  <IconButton onClick={() => handleRemoveFavorite(resource.id)}>
                    <Fa name="times"/>
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </Grid>
          {format == 'search' ? 
          <Grid item xs={12} >
            <Link to={'/resource/'+resource.slug}>
              <Typography type="body1" className={moreInfo} >
                See more information
              </Typography>
            </Link> 
          </Grid>
          : null}
          <Grid item xs={12} className={contentSpacing}>
            <Grid container spacing={0}>
            {displayData.map((item, index) => {
              var Content, className;
              var text = '';
              /*if (format === 'favoritesMobile' && item.fieldName === 'phones') {
                text = resource.phones.length ? resource.phones[0].digits : null;
              } else if (format === 'favoritesMobile' && item.fieldName === 'emails') {
                text = (resource.emails && resource.emails.length) ? resource.emails[0].email : null;
              } else if (format === 'favoritesMobile' && item.fieldName === 'locations') {
                text = (resource.locations && resource.locations.length) ? addressParser({ address: resource.locations[0] }) : null;
              } else if (format === 'favoritesMobile' && item.fieldName === 'schedule') {
                text = resource.schedule ? scheduleParser({schedule: resource.schedule}) : null;
              } else if (format === 'favoritesMobile' && item.fieldName === 'additional') {
                text = (resource.schedule && resource.schedule.note) ? resource.schedule.note : null;
              }*/
              if (isMobile) {
                text = (
                  <Truncate lines={3} ellipsis={<span>...<Link to={'/resource/'+resource.slug} className={moreInfo}>read more</Link></span>} >
                    {resource[item.fieldName]}
                  </Truncate>
                );
              } else {
                text = resource[item.fieldName];
              }
              return (
                <Grid item xs={12} key={index} >
                  <Typography type="body2" className={lineSpacing}>
                    <strong className={classes.boldFont+' '+labelClass}>{item.label}:</strong> {text}
                  </Typography>
                </Grid>);
            })}
            <ResourceVisit 
              resource={resource}
              className={labelClass}
              hideTitle={true}
            />
            </Grid>
          </Grid>
          <Grid item xs={12} >
            <Grid container alignItems="center" spacing={0} justify="space-between">
              <Grid item xs={12} md={6} className={badgeSpacing}>
                {resource.opportunity_tags && resource.opportunity_tags.length ?
                  (() => {
                    let badges = [];
                    return resource.opportunity_tags.map((tag) => {
                      if(typeof resourceIndex[tag] !== 'undefined' && badges.indexOf(resourceIndex[tag].type) === -1) {
                        badges.push(resourceIndex[tag].type);
                        return (
                          <Badge key={resourceIndex[tag].type} type={resourceIndex[tag].type} width='45px' height='45px' />
                        )
                      }
                    })
                  })()
                : null}
              </Grid>
              <Grid item xs={12} md={6} className={"pull-right "+pullLeft}>
                <RatingAndReviews rating={ resource.rating ? resource.rating : resource.opportunity_aggregate_ratings} total={resource.opportunity_comment_count + resource.comment_count} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
    
}

ResourceListItem.propTypes = {
  format: PropTypes.string,
  handleMessageNew: PropTypes.func,
  handleListAddFavorite: PropTypes.func,
  handleListNew: PropTypes.func,
  handleListRemoveFavorite: PropTypes.func,
  handleRemoveFavorite: PropTypes.func,
  isOnFavoritesList: PropTypes.bool,
  listId: PropTypes.string,
  lists: PropTypes.arrayOf(PropTypes.object),
  resource: PropTypes.object.isRequired,
  session: PropTypes.string,
  user: PropTypes.number,
};

ResourceListItem.defaultProps = {
  format: 'search',
  handleMessageNew: null,
  handleListAddFavorite: null,
  handleListNew: null,
  handleListRemoveFavorite: null,
  handleRemoveFavorite: null,
  isOnFavoritesList: false,
  listId: null,
  lists: [],
  session: null,
  user: null,
};


export default withWidth(withStyles(styles)(ResourceListItem));
