import React from 'react';

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
const AccountPage = ( {match} ) => (
  <div>
    <h2>Account page for id: {match.params.id}</h2>
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
            <Route path="/account/:id" component={AccountPage}/>
            <Redirect from="/account" to="/" />
          </Switch>
      </div>
    );
  }
}

export default PageContainer;
