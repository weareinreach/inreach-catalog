import React from 'react';

import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types'
import classNames from 'classnames';

import Typography from 'material-ui/Typography';

import RedHeartIcon from './icons/RedHeartIcon';

// Define a custom style for button
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

// Custom Button component with variant property
function FavoritesLink(props) {
  const { children, classes, className, variant, onClick} = props;

  return (
    <a href=''>
      <Typography type='display4'
                  className=
                  {classNames(
                    classes.viewYourFavoritesText,
                    className,
                  )}
                  onClick={onClick}
      >
        {children}
        <RedHeartIcon width={'38px'}/>
      </Typography>
    </a>
  );
}

FavoritesLink.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string
};

// Inject style to Custom Button component
export default withStyles(styles)(FavoritesLink);
