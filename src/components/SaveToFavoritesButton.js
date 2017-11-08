import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import Menu, {MenuItem} from 'material-ui/Menu';
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

class SaveToFavoritesButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      anchorEl: null,
      open: false
    };

    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleSaveToFavorites = this.handleSaveToFavorites.bind(this);
  }

  handleMenuOpen(event) {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleMenuClose() {
    this.setState({ open: false });
  };

  handleSaveToFavorites() {
    console.log('click');
  }

  render() {
    const { handleSaveToFavorites, handleMenuOpen, handleMenuClose } = this;
    const { anchorEl, open } = this.state;
    const { classes, isFavorite, session } = this.props;

    return (
      <div>
        <Button onClick={session ? handleMenuOpen : handleSaveToFavorites}>
          <Typography
            type='display4'
            className={classes.viewYourFavoritesText}
          >
            Save To Favorites
            <RedHeartIcon width={'38px'} fill={isFavorite} />
          </Typography>
        </Button>
        <Menu
          id="favorites-menu"
          anchorEl={anchorEl}
          anchorOrigin={{vertical: 'bottom'}}
          getContentAnchorEl={null}
          open={open}
          onRequestClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>My List</MenuItem>
        </Menu>
      </div>
    );
  }
}

SaveToFavoritesButton.defaultProps = {
  isFavorite: false,
  session: null
};

SaveToFavoritesButton.propTypes = {
  classes: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool,
  lists: PropTypes.array.isRequired,
  session: PropTypes.string,
};

export default withStyles(styles)(SaveToFavoritesButton);
