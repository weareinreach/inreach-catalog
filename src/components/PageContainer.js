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
    const { handleMessageNew, session, user, handleLogout, history } = this.props;
    const sessionListProps = {
      dialog: this.props.dialog,
      handleListAddFavorite: this.props.handleListAddFavorite,
      handleListRemoveFavorite: this.props.handleListRemoveFavorite,
      handleListNew: this.props.handleListNew,
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
              render={() => <FavoritesListContainer {...sessionListProps} />}
            />
            <Route
              path="/favorites/:id/"
              render={() => <FavoritesListContainer {...sessionListProps} />}
            />
            <Route
              path="/favorites/"
              render={() => <FavoritesListContainer {...sessionListProps} />}
            />
            <Route path="/account" render={()=>(
              <AccountPage handleMessageNew={handleMessageNew} handleLogout={handleLogout} history={history} />
            )}
            />
          </Switch>
      </div>
    );
  }
}

export default PageContainer;
