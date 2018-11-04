import React from 'react';
import PropTypes from 'prop-types';
import Static from './static/';
import FavoritesListContainer from './favorites/FavoritesListContainer';
import AccountPage from './account/AccountPage';
import ResetPasswordPage from './account/ResetPasswordPage';
import Suggestion from './account/Suggestion';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

class PageContainer extends React.Component {
  render() {
    const {
      handleLogOut,
      handleMessageNew,
      handleRequestOpen,
      handleUnconfirmSession,
      history,
      match,
      location,
      session,
      sessionConfirmed,
      user,
    } = this.props;
    const favoritesListProps = {
      dialog: this.props.dialog,
      handleListAddFavorite: this.props.handleListAddFavorite,
      handleListRemoveFavorite: this.props.handleListRemoveFavorite,
      handleListNew: this.props.handleListNew,
      handleLogOut: this.props.handleLogOut,
      handleMessageNew: this.props.handleMessageNew,
      handleRequestOpen: this.props.handleRequestOpen,
      lists: this.props.lists,
      session: this.props.session,
      user: this.props.user,
    };
    return (
      <div className="page-container">
        <Switch>
          <Route
            path="/favorites/:listId"
            render={() => <FavoritesListContainer {...favoritesListProps} />}
          />
          <Route
            path="/favorites"
            render={() => <FavoritesListContainer {...favoritesListProps} />}
          />
          <Route path="/account/reset-password" render={() => (
            <ResetPasswordPage
              handleMessageNew={handleMessageNew}
              handleLogOut={handleLogOut}
              handleRequestOpen={handleRequestOpen}
              history={history}
              match={match}
              location={location}
              session={session}
            />
          )}
          />
          <Route path="/account" render={() => (
            <AccountPage
              handleMessageNew={handleMessageNew}
              handleLogOut={handleLogOut}
              handleRequestOpen={handleRequestOpen}
              handleUnconfirmSession={handleUnconfirmSession}
              history={history}
              session={session}
              sessionConfirmed={sessionConfirmed}
              user={user}
            />
          )}
          />
          <Route path="/suggestions/new" render={() => (
            <Suggestion
              handleMessageNew={handleMessageNew}
              handleLogOut={handleLogOut}
              handleRequestOpen={handleRequestOpen}
              history={history}
              session={session}
              user={user}
              session={session}
            />
          )}
          />
          <Route path="/thuy" render={(props) => (<Static {...props} />)} />
        </Switch>
      </div>
    );
  }
}

PageContainer.propTypes = {
  handleUnconfirmSession: PropTypes.func.isRequired,
  sessionConfirmed: PropTypes.bool.isRequired,
};

export default PageContainer;
