import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';

import RedHeartIcon from './icons/RedHeartIcon';

const styles = theme => ({
  viewYourFavoritesText: {
    color: theme.palette.secondary[500],
    fontWeight: '300',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const FavoritesLink = ({ classes }) => (
  <Link to={`/favorites`}  className="hide--on-print">
    <Typography
      type='display4'
      className={classes.viewYourFavoritesText}
    >
      View Your Favorites
      <RedHeartIcon width={'38px'}/>
    </Typography>
  </Link>
);

FavoritesLink.propTypes = { classes: PropTypes.object.isRequired };

export default withStyles(styles)(FavoritesLink);
