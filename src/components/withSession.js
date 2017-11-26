import React from 'react';
import fetch from 'node-fetch';
import config from '../config/config.js';
import {fetchUser, fetchUserLists} from '../helpers/odasRequests';

export default function withSession(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props)

      const jwt = window.localStorage.getItem('jwt');
      this.state = {
        lists: [],
        session: jwt,
        user: null
      };

      this.handleFetchUser = this.handleFetchUser.bind(this);
      this.handleListAddFavorite = this.handleListAddFavorite.bind(this);
      this.handleListRemoveFavorite = this.handleListRemoveFavorite.bind(this);
      this.handleListNew = this.handleListNew.bind(this);
      this.handleLogIn = this.handleLogIn.bind(this);
      this.handleLogOut = this.handleLogOut.bind(this);
      this.handleStorageChange = this.handleStorageChange.bind(this);
    }

    componentDidMount() {
      window.addEventListener('storage', this.handleStorageChange);

      const { session } = this.state;
      if (session) {
        this.handleFetchUser(session);
        this.fetchLists(session);
      };
    }

    componentWillUnmount() {
      window.removeEventListener('storage', this.handleStorageChange);
    }

    handleListNew(list) {
      this.setState(prevState => ({ lists: [...prevState.lists, list]}));
    };

    handleListAddFavorite(listId, favorite) {
      this.setState(prevState => ({ lists: prevState.lists.map(list => (
        list.id === listId
          ? Object.assign(
              {},
              list,
              {fetchable_list_items: [
                ...list.fetchable_list_items,
                { fetchable_id: favorite}
              ]},
            )
          : list
      ))}));
    };

    handleListRemoveFavorite(listId, favorite) {
      this.setState(prevState => ({ lists: prevState.lists.map(list => (
        list.id === listId
          ? Object.assign(
              {},
              list,
              {fetchable_list_items: list.fetchable_list_items.filter(item =>
                item.fetchable_id !== favorite
              )},
            )
          : list
      ))}));
    }

    fetchLists(session) {
      fetchUserLists(session)
        .then(data => {
          this.setState({lists: data ? data.collections : []});
        })
        .catch(error => {
          this.handleLogOut();
        });
    }

    handleFetchUser(session) {
      fetchUser(session)
        .then(data => this.setState({ user: data.user.id }))
        .catch(error => this.handleLogOut());
    }

    handleStorageChange() {
      this.setState({ session: window.localStorage.getItem('jwt')});
    }

    handleLogIn(jwt) {
      window.localStorage.setItem('jwt', jwt);
      this.handleStorageChange();
      this.handleFetchUser(jwt);
      this.fetchLists(jwt);
    }

    handleLogOut() {
      window.localStorage.removeItem('jwt');
      this.handleStorageChange();
      this.setState({ lists: [], user: null, });
    }

    render() {
      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
          handleLogIn={this.handleLogIn}
          handleLogOut={this.handleLogOut}
          handleListAddFavorite={this.handleListAddFavorite}
          handleListRemoveFavorite={this.handleListRemoveFavorite}
          handleListNew={this.handleListNew}
        />
      );
    }
  }
}
