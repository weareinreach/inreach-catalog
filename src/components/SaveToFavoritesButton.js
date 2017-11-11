import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles';
import fetch from 'node-fetch';

import config from '../config/config.js';

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

  handleSaveToFavorites(listId) {
    this.handleMenuClose();
    const apiDomain = config[process.env.OD_API_ENV].odas;
    const url = `${apiDomain}api/collections/${listId}/items`;
    const payload = JSON.stringify({
      fetchable_id: this.props.resourceId,
      fetchable_type: "Opportunity",
    });
    const options = {
      method: 'POST',
      headers: {
        Authorization: this.props.session,
        'Content-Type': 'application/json',
        OneDegreeSource: 'asylumconnect',
      },
      body: payload,
    };
    fetch(url, options)
      .then(response => {
        debugger
      })
      .catch(error => {
        debugger
      });
  }

  render() {
    const { handleSaveToFavorites, handleMenuOpen, handleMenuClose } = this;
    const { anchorEl, open } = this.state;
    const { classes, lists, resourceId, session } = this.props;

    const isFavorite = lists.some(list =>
      list.fetchable_list_items.some(item =>
        item.fetchable_id === resourceId)
    );
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
          {lists.map(list => (
            <MenuItem
              key={list.id}
              onClick={() => handleSaveToFavorites(list.id)}
            >
              {list.title}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

SaveToFavoritesButton.defaultProps = {
  session: null
};

SaveToFavoritesButton.propTypes = {
  classes: PropTypes.object.isRequired,
  lists: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
  resourceId: PropTypes.number.isRequired,
  session: PropTypes.string,
};

export default withStyles(styles)(SaveToFavoritesButton);
