import PropTypes from 'prop-types';
import React from 'react';
import Fa from 'react-fontawesome';
import {Link} from 'react-router-dom';
import Truncate from 'react-truncate';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import Badge from './Badge';
import ResourceAccessInstructions from './ResourceAccessInstructions';
import RatingAndReviews from './ResourceRatingAndReviews';
import ResourceVisit from './ResourceVisit';
import SaveToFavoritesButton from './SaveToFavoritesButton';
import withWidth from './withWidth';
import propertyMap, {combineProperties} from '../utils/propertyMap';
import resourceTypes, {getTags, getOrgTags} from '../utils/tags';
import {boldFont, breakpoints} from '../theme';

const styles = (theme) => ({
  boldFont: boldFont(theme),
  contentSpacing: {
    margin: theme.spacing(3, 0),
    [theme.breakpoints.down('xs')]: {
      margin: '0.75rem 0',
    },
  },
  lineSpacing: {
    lineHeight: '1.4rem',
    marginBottom: theme.spacing(2),
  },
  dividerSpacing: {
    marginBottom: theme.spacing(4),
  },
  dividerPadding: {
    paddingBottom: theme.spacing(4),
  },
  nationalOrg: {
    lineHeight: '1.4rem',
    marginBottom: theme.spacing(1),
  },
  orgName: {
    fontSize: '21px',
    paddingTop: theme.spacing(1.5),
  },
  moreInfo: {
    fontWeight: '600',
    color: theme.palette.secondary[500],
  },
  pullLeft: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
    },
  },
  [theme.breakpoints.down('xs')]: {
    cardPointer: {
      cursor: 'pointer',
    },
    cardPadding: {
      padding: theme.spacing(2),
    },
    paperPadding: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    ratingSpacing: {
      paddingTop: theme.spacing(2),
    },
  },
  badgeSpacing: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(0),
      marginBottom: '0.75rem',
    },
    marginLeft: theme.spacing(-1),
  },
});

class ResourceListItem extends React.Component {
  render() {
    const {
      format,
      resource,
      classes,
      handleListAddFavorite,
      handleListRemoveFavorite,
      handleListNew,
      handleLogOut,
      handleMessageNew,
      handleRequestOpen,
      history,
      isOnFavoritesList,
      isOnPublicList,
      locale,
      lists,
      session,
      user,
      userData,
      width,
    } = this.props;
    const {
      ratingSpacing,
      contentSpacing,
      lineSpacing,
      cardPointer,
      cardPadding,
      paperPadding,
      dividerPadding,
      dividerSpacing,
      badgeSpacing,
      moreInfo,
      nationalOrg,
      orgName,
      pullLeft,
    } = classes;
    const isMobile = width < breakpoints['sm'];
    const displayData = [
      {fieldName: 'description', label: 'About', value: resource.description},
    ];
    const labelClass = format === 'search' ? 'hide--on-screen' : null;
    const name = resource.name || resource.title;
    const isOrganizationItem = resource.resource_type === 'Organization';
    const link = isOrganizationItem
      ? `/${locale}/resource/${resource.slug}`
      : `/${locale}/resource/${resource?.organization?.slug}/service/${resource.slug}`;
    const tags = isOrganizationItem
      ? getOrgTags(resource, locale)
      : getTags(resource || {}, locale);
    const allProperties = isOrganizationItem
      ? combineProperties([resource, ...resource?.services])
      : resource.properties;
    const propKeys = Object.keys(allProperties);
    const rating = resource.rating || resource.opportunity_aggregate_ratings;
    const commentCount =
      resource.opportunity_comment_count + resource.comment_count;
      let resourceIndex = resourceTypes.getResourceIndex(locale);
    return (
      <div className={paperPadding}>
        {isMobile ? (
          <Paper
            className={cardPointer}
            onClick={(ev) => {
              if (ev.target.closest('.stop-click-propagation') === null) {
                history.push(link);
              }
            }}
          >
            <Grid container spacing={0} className={cardPadding}>
              <Grid item xs={12}>
                <Grid
                  container
                  alignItems="flex-start"
                  justify="space-between"
                  spacing={0}
                >
                  <Grid item xs={8} md lg xl>
                    <Typography variant="subtitle2" className={orgName}>
                      {name}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    container
                    alignItems="flex-start"
                    justify="flex-end"
                    className="stop-click-propagation"
                  >
                    {!isOnFavoritesList && (
                      <SaveToFavoritesButton
                        handleListAddFavorite={handleListAddFavorite}
                        handleListRemoveFavorite={handleListRemoveFavorite}
                        handleListNew={handleListNew}
                        handleLogOut={handleLogOut}
                        handleMessageNew={handleMessageNew}
                        handleRequestOpen={handleRequestOpen}
                        lists={lists}
                        parentResourceId={
                          !isOrganizationItem && resource?.organization?._id
                        }
                        resourceId={resource._id}
                        session={session}
                        user={user}
                        userData={userData}
                      />
                    )}
                    {isOnFavoritesList && !isOnPublicList && (
                      <Button
                        onClick={() => handleListRemoveFavorite(resource._id)}
                      >
                        <Fa name="times" />
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              {propKeys.filter(
                (item) => item.toLowerCase().indexOf('service-national') === 0
              ).length ? (
                <Grid item xs={12}>
                  <Typography variant="body1" className={nationalOrg}>
                    <Fa name="info-circle" className={moreInfo} /> This
                    organization can help people located anywhere in the
                    country.
                  </Typography>
                </Grid>
              ) : null}
              <Grid item xs={12} className={ratingSpacing}>
                <Grid
                  container
                  alignItems="center"
                  spacing={0}
                  justify="space-between"
                >
                  <Grid item xs={12} md={6} className={badgeSpacing}>
                    {tags && tags.length
                      ? (() => {
                          let badges = [];
                          return tags.map((tag) => {
                            if (
                              typeof resourceIndex[tag] !== 'undefined' &&
                              badges.indexOf(resourceIndex[tag].type) === -1
                            ) {
                              badges.push(resourceIndex[tag].type);
                              return (
                                <Badge
                                  key={resourceIndex[tag].type}
                                  type={resourceIndex[tag].type}
                                  width="52px"
                                  height="52px"
                                />
                              );
                            }

                            return null;
                          });
                        })()
                      : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ) : (
          <div className="page-break-inside--avoid">
            <Divider className={dividerSpacing} />
            <Grid container spacing={0} className={dividerPadding}>
              <Grid item xs={12}>
                <Grid
                  container
                  alignItems="flex-start"
                  justify="space-between"
                  spacing={0}
                >
                  <Grid item xs={8} md lg xl>
                    <Link to={link}>
                      <Typography variant="subtitle2" color="secondary" className={orgName}>
                        {name}
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    container
                    alignItems="flex-start"
                    justify="flex-end"
                  >
                    {!isOnFavoritesList && (
                      <SaveToFavoritesButton
                        handleListAddFavorite={handleListAddFavorite}
                        handleListRemoveFavorite={handleListRemoveFavorite}
                        handleListNew={handleListNew}
                        handleLogOut={handleLogOut}
                        handleMessageNew={handleMessageNew}
                        handleRequestOpen={handleRequestOpen}
                        lists={lists}
                        parentResourceId={
                          !isOrganizationItem && resource?.organization?._id
                        }
                        resourceId={resource._id}
                        session={session}
                        user={user}
                        userData={userData}
                      />
                    )}
                    {isOnFavoritesList && !isOnPublicList && (
                      <Button
                        onClick={() => handleListRemoveFavorite(resource._id)}
                      >
                        <Fa name="times" />
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              {propKeys.filter(
                (item) => item.toLowerCase().indexOf('service-national') === 0
              ).length ? (
                <Grid item xs={12}>
                  <Typography variant="body1" className={nationalOrg}>
                    <Fa name="info-circle" className={moreInfo} /> This
                    organization can help people located anywhere in the
                    country.
                  </Typography>
                </Grid>
              ) : null}
              <Grid item xs={12} className={contentSpacing}>
                <Grid container spacing={0}>
                  {displayData.map((item, index) => {
                    var text = '';

                    if (isMobile && !isOnFavoritesList) {
                      text = (
                        <Truncate
                          lines={3}
                          ellipsis={
                            <span>
                              ...
                              <Link to={link} className={moreInfo}>
                                read more
                              </Link>
                            </span>
                          }
                        >
                          {resource[item.fieldName]}
                        </Truncate>
                      );
                    } else {
                      text = resource[item.fieldName];
                    }
                    return (
                      <Grid item xs={12} key={index}>
                        <Typography variant="body2" className={lineSpacing}>
                          <strong
                            className={classes.boldFont + ' ' + labelClass}
                          >
                            {item.label}:
                          </strong>{' '}
                          {text}
                        </Typography>
                      </Grid>
                    );
                  })}
                  {resource.opportunity_community_properties &&
                  resource.opportunity_community_properties.length ? (
                    <Grid item xs={12} className={labelClass}>
                      <Typography variant="body2" className={lineSpacing}>
                        <strong className={classes.boldFont + ' ' + labelClass}>
                          Who it serves:{' '}
                        </strong>
                        {resource.opportunity_community_properties
                          .map((item) => {
                            if (
                              typeof propertyMap['community'][item] !==
                              'undefined'
                            ) {
                              return propertyMap['community'][item];
                            }

                            return null;
                          })
                          .join(', ')}
                      </Typography>
                    </Grid>
                  ) : null}
                  {isOrganizationItem ? (
                    <ResourceVisit
                      emails={resource.emails}
                      locations={resource.locations}
                      phones={resource.phones}
                      website={resource.website}
                      className={labelClass}
                      hideTitle={true}
                    />
                  ) : (
                    <ResourceAccessInstructions
                      list={resource.access_instructions}
                      phones={resource.phones}
                      rawSchedule={resource.schedule}
                    />
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  alignItems="center"
                  spacing={0}
                  justify="space-between"
                >
                  <Grid item xs={12} md={6} className={badgeSpacing}>
                    {tags && tags.length
                      ? (() => {
                          let badges = [];
                          return tags.map((tag) => {
                            if (
                              typeof resourceIndex[tag] !== 'undefined' &&
                              badges.indexOf(resourceIndex[tag].type) === -1
                            ) {
                              badges.push(resourceIndex[tag].type);
                              return (
                                <Badge
                                  key={resourceIndex[tag].type}
                                  type={resourceIndex[tag].type}
                                  width="52px"
                                  height="52px"
                                />
                              );
                            }

                            return null;
                          });
                        })()
                      : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        )}
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
  handleLogOut: PropTypes.func,
  handleRemoveFavorite: PropTypes.func,
  isOnFavoritesList: PropTypes.bool,
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
  handleLogOut: null,
  handleRemoveFavorite: null,
  isOnFavoritesList: false,
  lists: [],
  session: null,
  user: null,
};

export default withStyles(styles)(withWidth(ResourceListItem));
