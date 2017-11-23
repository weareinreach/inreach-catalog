import React from 'react';
import fetch from 'node-fetch';
import config from '../config/config.js';
import fetchUserLists from '../helpers/fetchUserLists';

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

      this.handleStorageChange = this.handleStorageChange.bind(this);
      this.handleLogIn = this.handleLogIn.bind(this);
      this.handleLogOut = this.handleLogOut.bind(this);
    }

    componentDidMount() {
      window.addEventListener('storage', this.handleStorageChange);

      const { session } = this.state;
      if (session) {
        this.fetchUser(session);
        this.fetchLists(session);
      };

      this.handleListAddFavorite = this.handleListAddFavorite.bind(this);
      this.handleListRemoveFavorite = this.handleListRemoveFavorite.bind(this);
      this.handleListNew = this.handleListNew.bind(this);
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
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            return Promise.reject(response);
          }
        })
        .then(data => {
          this.setState({lists: data.collections});
        })
        .catch(response => {
          console.warn(response);
        });
    }

    fetchUser(jwt) {
      const apiDomain = config[process.env.OD_API_ENV].odas;
      const url = `${apiDomain}api/user`;
      const options = {
        headers: {
          Authorization: jwt,
          'Content-Type': 'application/json',
          OneDegreeSource: 'asylumconnect',
        },
      };
      fetch(url, options)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            return Promise.reject(response);
          }
        })
        .then(data => this.setState({ user: data.user.id }))
        .catch(error => {
          this.handleLogOut();
        });
    }

    handleStorageChange() {
      this.setState({ session: window.localStorage.getItem('jwt')});
    }

    handleLogIn(jwt) {
      window.localStorage.setItem('jwt', jwt);
      this.handleStorageChange();
      this.fetchUser(jwt);
      this.fetchLists(jwt);
    }

    handleLogOut() {
      window.localStorage.removeItem('jwt');
      this.handleStorageChange();
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
