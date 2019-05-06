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
      country,
      handleLogOut,
      handleMessageNew,
      handleRequestOpen,
      handleUnconfirmSession,
      history,
      match,
      locale,
      location,
      session,
      sessionConfirmed,
      user,
      t
    } = this.props;
    const favoritesListProps = {
      country: country,
      dialog: this.props.dialog,
      handleListAddFavorite: this.props.handleListAddFavorite,
      handleListRemoveFavorite: this.props.handleListRemoveFavorite,
      handleListNew: this.props.handleListNew,
      handleLogOut: this.props.handleLogOut,
      handleMessageNew: this.props.handleMessageNew,
      handleRequestOpen: this.props.handleRequestOpen,
      lists: this.props.lists,
      locale: locale,
      session: this.props.session,
      user: this.props.user,
      t: t
    };
    return (
      <div className="page-container">
        <Switch>
          <Route
            path="/:locale/favorites/:listId"
            render={() => <FavoritesListContainer {...favoritesListProps} />}
          />
          <Route
            path="/:locale/favorites"
            render={() => <FavoritesListContainer {...favoritesListProps} />}
          />
          <Route path="/:locale/account/reset-password" render={() => (
            <ResetPasswordPage
              country={country}
              handleMessageNew={handleMessageNew}
              handleLogOut={handleLogOut}
              handleRequestOpen={handleRequestOpen}
              history={history}
              locale={locale}
              match={match}
              location={location}
              session={session}
              t={t}
            />
          )}
          />
          <Route path="/:locale/account" render={() => (
            <AccountPage
              country={country}
              handleMessageNew={handleMessageNew}
              handleLogOut={handleLogOut}
              handleRequestOpen={handleRequestOpen}
              handleUnconfirmSession={handleUnconfirmSession}
              history={history}
              locale={locale}
              session={session}
              sessionConfirmed={sessionConfirmed}
              user={user}
              t={t}
            />
          )}
          />
          <Route path="/:locale/suggestions/new" render={() => (
            <Suggestion
              country={country}
              handleMessageNew={handleMessageNew}
              handleLogOut={handleLogOut}
              handleRequestOpen={handleRequestOpen}
              history={history}
              locale={locale}
              session={session}
              user={user}
              t={t}
            />
          )}
          />
          <Route path="/:locale/page/:pageName" render={(props) => (
            <Static
              handleMessageNew={handleMessageNew}
              handleLogOut={handleLogOut}
              handleRequestOpen={handleRequestOpen}
              history={history}
              session={session}
              user={user}
              {...props} 
            />
          )} />
          <Route render={(props) => (
            <Redirect to={ window.location.pathname.indexOf((localStorage.getItem('locale')||'en_US')) < 0 ? '/'+(localStorage.getItem('locale')||'en_US')+window.location.pathname : '/'} />
          )} />
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
