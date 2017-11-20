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

const NewFavoritesListPage = ( props ) => (
  <FavoritesListPage {...props} newList={true} />
);

const FavoritesListPage = ( {match, newList} ) => (
  <div>
    <h2>{newList ? "New " : ""}{match.params.id ? "Favorites page for id:"+match.params.id : "Favorite page for non-logged in user"}</h2>
    <FavoritesListContainer />
  </div>
);

class PageContainer extends React.Component {
  render() {
    const { handleMessageNew, session, user } = this.props;
    return (
      <div className="page-container"> 
          <Switch>
            <Route path="/favorites/:id/:listId/share" component={FavoritesListPage}/>
            <Route path="/favorites/:id/new" render={() => <FavoritesListContainer handleMessageNew={handleMessageNew} session={session} user={user}/>}/>
            <Route path="/favorites/:id/:listId" render={() => <FavoritesListContainer handleMessageNew={handleMessageNew} session={session} user={user}/>}/>
            <Route path="/favorites/:id/" render={() => <FavoritesListContainer handleMessageNew={handleMessageNew} session={session} user={user}/>}/>
            <Route path="/favorites/:id" render={() => <FavoritesListContainer handleMessageNew={handleMessageNew} session={session} user={user}/>}/>
            <Route path="/favorites/" render={() => <FavoritesListContainer handleMessageNew={handleMessageNew} session={session} user={user}/>}/>
            <Route path="/account/" render={()=>(
              <AccountPage handleMessageNew={handleMessageNew} />
            )}
            />
            <Redirect from="/account" to="/" />
          </Switch>
      </div>
    );
  }
}

export default PageContainer;
