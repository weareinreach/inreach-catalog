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
<<<<<<< HEAD

class PageContainer extends React.Component {
  render() {
    const { handleMessageNew } = this.props
=======
const AccountPage = ( {match} ) => (
  <div>
    <h2>Account page for id: {match.params.id}</h2>
  </div>
);

class PageContainer extends React.Component {
  render() {
    const { handleMessageNew, session, user } = this.props;
>>>>>>> 49259c0259817940eb0950fa19d9b374f94ea291
    return (
      <div className="page-container"> 
          <Switch>
            <Route path="/favorites/:id/:listId/share" component={FavoritesListPage}/>
<<<<<<< HEAD
            <Route path="/favorites/:id/new" component={NewFavoritesListPage}/>
            <Route path="/favorites/:id/:listId" component={FavoritesListPage}/>
            <Route path="/favorites/:id/" component={FavoritesListPage}/>
            <Route path="/favorites/:id" component={FavoritesListPage}/>
            <Route path="/favorites/" component={FavoritesListPage}/>
            <Route path="/account/:id" render={()=>(
              <AccountPage handleMessageNew={handleMessageNew} />
            )}
            />
            <Route exact path="/suggestion/new" component={Suggestion}/>
=======
            <Route path="/favorites/:id/new" render={() => <FavoritesListContainer handleMessageNew={handleMessageNew} session={session} user={user}/>}/>
            <Route path="/favorites/:id/:listId" render={() => <FavoritesListContainer handleMessageNew={handleMessageNew} session={session} user={user}/>}/>
            <Route path="/favorites/:id/" render={() => <FavoritesListContainer handleMessageNew={handleMessageNew} session={session} user={user}/>}/>
            <Route path="/favorites/:id" render={() => <FavoritesListContainer handleMessageNew={handleMessageNew} session={session} user={user}/>}/>
            <Route path="/favorites/" render={() => <FavoritesListContainer handleMessageNew={handleMessageNew} session={session} user={user}/>}/>
            <Route path="/account/:id" component={AccountPage}/>
>>>>>>> 49259c0259817940eb0950fa19d9b374f94ea291
            <Redirect from="/account" to="/" />
          </Switch>
      </div>
    );
  }
}

export default PageContainer;
