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

const FavoritesLink = ({ classes, user }) => (
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

FavoritesLink.defaultProps = { user: null };

FavoritesLink.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.number,
};

export default withStyles(styles)(FavoritesLink);
