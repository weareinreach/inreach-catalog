import React from 'react';

import AccountPage from './account/AccountPage';
import Suggestion from './account/Suggestion';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

const NewFavoritesListPage = ( props ) => (
  <FavoritesListPage {...props} newList={true} />
);

const FavoritesListPage = ( {match, newList} ) => (
  <div>
    <h2>{newList ? "New " : ""}{match.params.id ? "Favorites page for id:"+match.params.id : "Favorite page for non-logged in user"}</h2>
  </div>
);

class PageContainer extends React.Component {
  render() {
    const { handleMessageNew } = this.props
    return (
      <div className="page-container"> 
        <Router>
          <Switch>
            <Route path="/favorites/:id/:listId/share" component={FavoritesListPage}/>
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
            <Redirect from="/account" to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default PageContainer;