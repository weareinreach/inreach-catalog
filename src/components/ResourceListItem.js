import React from 'react';
import PropTypes from 'prop-types';

import {
  Link
} from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

import { withStyles } from 'material-ui/styles';
import SaveToFavoritesButton from './SaveToFavoritesBUtton';
import FavoritesLink from './FavoritesLink';
import RatingAndReviews from './RatingAndReviews';

import Badge from './Badge';

const styles = (theme) => ({
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
  }
});

const resourceFieldsByFormat = {
  'search': [
    {fieldName: 'description', label: 'About'}
  ]
}

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
      moreInfo,
      orgName
    } = classes;
    //this.props.fetchSearchResults();
    return (
      <div>
        <Divider className={dividerSpacing} />
        <Grid container spacing={0}>
          <Grid item xs={12} >
            <Grid container alignItems="center" justify="space-between" spacing={0}>
              <Grid item xs md lg xl >
                <Link to={'/resource/'+resource.slug}><Typography type="subheading" className={orgName}>{resource.name}</Typography></Link>
              </Grid>
              {format === 'search' ? 
              <Grid item xs={3} alignItems="flex-start" >
                {session && (
                  <SaveToFavoritesButton
                    handleListAddFavorite={handleListAddFavorite}
                    handleListRemoveFavorite={handleListRemoveFavorite}
                    handleListNew={handleListNew}
                    lists={lists}
                    resourceId={resource.id}
                    session={session}
                    user={user}
                  />
                )}
              </Grid> 
              : null }
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
            {resourceFieldsByFormat[format].map((item, index) => {
              var Content;
              switch(format) {
                case 'search':
                  Content = () => (<Typography type="body2" className={lineSpacing}>
                    {resource[item.fieldName]}
                  </Typography>);
                break;
                default:
                  Content = () => (<Typography type="body2" className={lineSpacing}>
                    <strong>{item.label}:</strong> {resource[item.fieldName]}
                  </Typography>);
                break;
              }
              return (
                <Grid item xs={12} key={index} >
                  <Content key={index} />
                </Grid>);
            })}
            </Grid>
          </Grid>
          <Grid item xs={12} >
            <Grid container alignItems="center" spacing={0} justify="space-between">
              <Grid item xs={6}>
                <Badge type='mail' width='45px' height='45px' />
              </Grid>
              <Grid item xs={6} className="pull-right">
                <RatingAndReviews rating={resource.rating} total={resource.opportunity_comments.length} />
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
  handleListAddFavorite: PropTypes.func.isRequired,
  handleListRemoveFavorite: PropTypes.func.isRequired,
  handleListNew: PropTypes.func.isRequired,
  resource: PropTypes.object.isRequired,
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  session: PropTypes.string,
  user: PropTypes.number,
};

ResourceListItem.defaultProps = {
  format: 'search',
  session: null,
  user: null,
};


export default withStyles(styles)(ResourceListItem);
