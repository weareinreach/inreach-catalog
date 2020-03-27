import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import {MenuItem} from 'material-ui/Menu';
import Modal from 'react-modal';

import AsylumConnectPopUp from './AsylumConnectPopUp';
import RedHeartIcon from './icons/RedHeartIcon';
import MediaQuery from 'react-responsive';

import {
  createList,
  createListFavorite,
  deleteListFavorite
} from '../helpers/odasRequests';

const styles = theme => ({
  viewYourFavoritesText: {
    color: theme.palette.secondary[500],
    '&:hover': {
      color: theme.palette.secondary[900]
    },
    fontWeight: theme.typography.fontWeightMedium,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBlue: {color: theme.palette.common.blue},
  favoriteItem: {
    justifyContent: 'space-between'
  }
});

class SaveToFavoritesButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    };

    this.state = {
      anchorEl: null,
      open: false
    };

    this.handleCreateList = this.handleCreateList.bind(this);
    this.handleFetchError = this.handleFetchError.bind(this);
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleRemoveFavorite = this.handleRemoveFavorite.bind(this);
    this.handleSaveToFavorites = this.handleSaveToFavorites.bind(this);
  }

  handleCreateList(currentTarget) {
    const {session, user} = this.props;
    const payload = {
      created_by_user_id: user,
      title: 'My List'
    };
    createList(payload, session)
      .then(data => {
        this.props.handleListNew(
          Object.assign({}, payload, data.collection, {
            fetchable_list_items: []
          })
        );
        this.handleSaveToFavorites(data.collection.id);
        this.setState({open: true, anchorEl: currentTarget});
      })
      .catch(this.handleFetchError);
  }

  handleFetchError(error) {
    const {handleLogOut, handleMessageNew, handleRequestOpen} = this.props;
    if (error.response && error.response.status === 401) {
      handleMessageNew('Your session has expired. Please log in again.');
      handleLogOut();
    } else if (error.response && error.response.status === 403) {
      handleRequestOpen('password');
    } else {
      handleMessageNew('Oops! Something went wrong.');
    }
  }

  handleMenuToggle(event) {
    const {currentTarget} = event;
    if (!this.props.session) {
      this.setState({modal: true});
    } else if (this.props.lists.length < 1) {
      this.handleCreateList(currentTarget);
    } else if (this.state.open) {
      this.setState({open: false, anchorEl: null});
    } else {
      this.setState({open: true, anchorEl: event.currentTarget});
    }
  }

  handleMenuClose() {
    this.setState({open: false, anchorEl: null});
  }

  handleRemoveFavorite(listId) {
    this.handleMenuClose();
    const {handleListRemoveFavorite, resourceId, session} = this.props;
    deleteListFavorite(listId, resourceId, session).then(() => {
      handleListRemoveFavorite(listId, resourceId);
    });
  }

  handleSaveToFavorites(listId) {
    this.handleMenuClose();
    const {resourceId, session} = this.props;
    createListFavorite(listId, resourceId, session)
      .then(() => {
        this.props.handleListAddFavorite(listId, this.props.resourceId);
      })
      .catch(this.handleFetchError);
  }

  render() {
    const {
      handleMenuClose,
      handleMenuToggle,
      handleRemoveFavorite,
      handleSaveToFavorites
    } = this;
    const {anchorEl, open} = this.state;
    const {classes, lists, resourceId} = this.props;
    //console.log(resourceId);
    const isFavorite = lists.some(list =>
      list.fetchable_list_items.some(item => item.fetchable_id === resourceId)
    );

    return (
      <div className={this.props.className}>
        <IconButton onClick={handleMenuToggle}>
          <RedHeartIcon width={'24px'} fill={isFavorite} />
        </IconButton>
        <MediaQuery minDeviceWidth={603}>
          <Modal
            ariaHideApp={false}
            style={{
              content: {
                position: 'absolute',
                top: '25%',
                left: '30%',
                bottom: 'auto',
                width: '40%',
                padding: 0,
                fontFamily: '"Open Sans", sans-serif',
                background: '#FFFFFF'
              }
            }}
            isOpen={this.state.modal}
          >
            <div
              style={{textAlign: 'left', paddingTop: '13px', height: '20px'}}
            >
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: 0,
                  top: '38px',
                  border: '1px solid #E9E9E9',
                  zIndex: 0
                }}
              ></div>
              <div
                style={{
                  left: '46%',
                  position: 'absolute',
                  display: 'inline-block',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#FFFFFF',
                  zIndex: 1,
                  boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.25)'
                }}
              >
                <div style={{paddingTop: '10px', textAlign: 'center'}}>
                  <RedHeartIcon width={'24px'} />
                </div>
              </div>
            </div>
            <div style={{paddingTop: '40px', padding: '8%'}}>
              <p>Oops! You need to be logged in to share resources.</p>
              <p
                style={{
                  fontWeight: 'bold'
                }}
              >
                With a free AsylumConnect account you can unlock additional
                features:
              </p>
              <div>
                <li>Save and share personalized resources lists</li>
                <br />
                <li>Leave public rating/reviews on resources</li>
                <br />
                <li>Suggest new resources in your area</li>
                <br />
                <li>Claim your organization's profile page</li>
              </div>
            </div>
            <div style={{textAlign: 'center', paddingBottom: '15px'}}>
              <Button
                style={{
                  display: 'inline-block',
                  background: '#CC4747',
                  borderRadius: '100px',
                  fontWeight: 'bold',
                  lineHeight: '22px',
                  width: '220px',
                  height: '34px',
                  color: '#FFFFFF',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  paddingTop: '5px'
                }}
                onClick={() => this.props.handleRequestOpen('signup')}
              >
                sign up/sign in
              </Button>
            </div>
            <div style={{paddingBottom: '20px', textAlign: 'center'}}>
              <Button
                style={{
                  display: 'inline-block',
                  background: '#FFFFFF',
                  borderRadius: '100px',
                  fontWeight: 'bold',
                  lineHeight: '22px',
                  width: '220px',
                  height: '34px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  border: 'solid',
                  color: '#5073B3',
                  paddingTop: '5px'
                }}
                onClick={() => {
                  this.setState({modal: false});
                }}
              >
                close
              </Button>
            </div>
          </Modal>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={602}>
          <Modal
            ariaHideApp={false}
            style={{
              content: {
                position: 'absolute',
                top: '5%',
                bottom: 'auto',
                padding: 0,
                fontFamily: '"Open Sans", sans-serif',
                background: '#FFFFFF'
              }
            }}
            isOpen={this.state.modal}
          >
            <div
              style={{textAlign: 'left', paddingTop: '13px', height: '20px'}}
            >
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: 0,
                  top: '38px',
                  border: '1px solid #E9E9E9',
                  zIndex: 0
                }}
              ></div>
              <div
                style={{
                  left: '46%',
                  position: 'absolute',
                  display: 'inline-block',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#FFFFFF',
                  zIndex: 1,
                  boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.25)'
                }}
              >
                <div style={{paddingTop: '10px', textAlign: 'center'}}>
                  <RedHeartIcon width={'24px'} />
                </div>
              </div>
            </div>
            <div style={{paddingTop: '40px', padding: '8%', fontSize: '14px'}}>
              <p>Oops! You need to be logged in to share resources.</p>
              <p
                style={{
                  fontWeight: 'bold'
                }}
              >
                With a free AsylumConnect account you can unlock additional
                features:
              </p>
              <div>
                <li>Save and share personalized resources lists</li>
                <br />
                <li>Leave public rating/reviews on resources</li>
                <br />
                <li>Suggest new resources in your area</li>
                <br />
                <li>Claim your organization's profile page</li>
              </div>
            </div>
            <div style={{textAlign: 'center', paddingBottom: '15px'}}>
              <Button
                style={{
                  display: 'inline-block',
                  background: '#CC4747',
                  borderRadius: '100px',
                  fontWeight: 'bold',
                  lineHeight: '22px',
                  width: '220px',
                  height: '34px',
                  color: '#FFFFFF',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  paddingTop: '5px'
                }}
                onClick={() => this.props.handleRequestOpen('signup')}
              >
                sign up/sign in
              </Button>
            </div>
            <div style={{paddingBottom: '20px', textAlign: 'center'}}>
              <Button
                style={{
                  display: 'inline-block',
                  background: '#FFFFFF',
                  borderRadius: '100px',
                  fontWeight: 'bold',
                  lineHeight: '22px',
                  width: '220px',
                  height: '34px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  border: 'solid',
                  color: '#5073B3',
                  paddingTop: '5px'
                }}
                onClick={() => {
                  this.setState({modal: false});
                }}
              >
                close
              </Button>
            </div>
          </Modal>
        </MediaQuery>
        <AsylumConnectPopUp
          id="favorites-menu"
          className="stop-click-propagation"
          anchorEl={anchorEl}
          anchorOrigin={{vertical: 'bottom'}}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{style: {maxHeight: '300px', marginTop: '48px'}}}
        >
          {lists.map(list => {
            const isFavoriteItem = list.fetchable_list_items.some(
              item => item.fetchable_id === resourceId
            );
            return (
              <MenuItem
                className={classes.favoriteItem}
                key={list.id}
                onClick={() =>
                  isFavoriteItem
                    ? handleRemoveFavorite(list.id)
                    : handleSaveToFavorites(list.id)
                }
              >
                <span>{list.title}</span>
                <RedHeartIcon
                  width={'24px'}
                  fill={isFavoriteItem}
                  style={{float: 'right'}}
                />
              </MenuItem>
            );
          })}
          <MenuItem
            className={classes.textBlue}
            onClick={() =>
              this.props.handleRequestOpen(
                `listNew/saveToFavorites/${resourceId}`
              )
            }
          >
            <span className={classes.textBlue}>+ Create New List</span>
          </MenuItem>
        </AsylumConnectPopUp>
      </div>
    );
  }
}

SaveToFavoritesButton.defaultProps = {
  session: null,
  user: null
};

SaveToFavoritesButton.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  handleListAddFavorite: PropTypes.func.isRequired,
  handleListRemoveFavorite: PropTypes.func.isRequired,
  handleListNew: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.number
    })
  ).isRequired,
  resourceId: PropTypes.number.isRequired,
  session: PropTypes.string,
  user: PropTypes.number
};

export default withStyles(styles)(SaveToFavoritesButton);
