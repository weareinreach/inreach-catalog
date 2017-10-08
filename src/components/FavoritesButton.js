import React from 'react';

import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types'
import classNames from 'classnames';

import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button';

import RedHeartIcon from './icons/RedHeartIcon';

// Define a custom style for button
const styles = theme => ({
  viewYourFavoritesText: {
    color: theme.palette.secondary[500],
    fontWeight: '300'
  }
});

// Custom Button component with variant property
function FavoritesButton(props) {
  const { children, classes, className, variant, onClick} = props;

  return (
    <Button className={classNames(
        classes.viewYourFavoritesText,
        className,
      )}
      onClick={onClick}
    >
      {children}
      <RedHeartIcon width={'46px'}/>
    </Button>
  );
}

FavoritesButton.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string
};

// Inject style to Custom Button component
export default withStyles(styles)(FavoritesButton);
