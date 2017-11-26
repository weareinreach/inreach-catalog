import React from 'react';

import FavoritesListContainer from './favorites/FavoritesListContainer';
import AccountPage from './account/AccountPage';
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
      history,
      session,
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
            {/*<Route path="/favorites/:id/:listId/share" component={FavoritesListPage}/>*/}
            <Route
              path="/favorites/:id/:listId"
              render={() => <FavoritesListContainer {...favoritesListProps} />}
            />
            <Route
              path="/favorites/:id/"
              render={() => <FavoritesListContainer {...favoritesListProps} />}
            />
            <Route
              path="/favorites/"
              render={() => <FavoritesListContainer {...favoritesListProps} />}
            />
            <Route path="/account" render={()=>(
              <AccountPage
                handleMessageNew={handleMessageNew}
                handleLogOut={handleLogOut}
                handleRequestOpen={handleRequestOpen}
                history={history}
                session={session}
              />
            )}
            />
          </Switch>
      </div>
    );
  }
}

export default PageContainer;
