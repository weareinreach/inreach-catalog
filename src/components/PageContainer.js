import React from 'react';

import AccountPage from './account/AccountPage';
import Suggestion from './account/Suggestion';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import FavoritesListContainer from './favorites/FavoritesListContainer';

class PageContainer extends React.Component {
  render() {
    const { handleMessageNew, session, user, handleLogout } = this.props;
    return (
      <div className="page-container"> 
          <Switch>
            <Route path="/favorites/:id/:listId/share" component={FavoritesListPage}/>
            <Route path="/favorites/:id/:listId" render={() => <FavoritesListContainer handleMessageNew={handleMessageNew} session={session} user={user}/>}/>
            <Route path="/favorites/:id/" render={() => <FavoritesListContainer handleMessageNew={handleMessageNew} session={session} user={user}/>}/>
            <Route path="/favorites/:id" render={() => <FavoritesListContainer handleMessageNew={handleMessageNew} session={session} user={user}/>}/>
            <Route path="/favorites/" render={() => <FavoritesListContainer handleMessageNew={handleMessageNew} session={session} user={user}/>}/>
            <Route path="/account" render={()=>(
              <AccountPage handleMessageNew={handleMessageNew} handleLogout={handleLogout} />
            )}
            />
          </Switch>
      </div>
    );
  }
}

export default PageContainer;
