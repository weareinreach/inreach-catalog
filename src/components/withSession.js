import React from 'react';
import fetch from 'node-fetch';
import config from '../config/config.js';

export default function withSession(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props)

      const jwt = window.localStorage.getItem('jwt');
      this.state = { session: jwt, user: null };

      if (jwt) {
        this.fetchUser(jwt);
      }

      this.handleStorageChange = this.handleStorageChange.bind(this);
      this.handleLogIn = this.handleLogIn.bind(this);
      this.handleLogOut = this.handleLogOut.bind(this);
    }

    componentDidMount() {
      window.addEventListener('storage', this.handleStorageChange);
    }

    componentWillUnmount() {
      window.removeEventListener('storage', this.handleStorageChange);
    }

    fetchUser(jwt) {
      const apiDomain = config[process.env.NODE_ENV].odas;
      const url = `${apiDomain}api/user`;
      const options = {
        headers: {
          Authorization: jwt,
          'Content-Type': 'application/json',
          OneDegreeSource: 'asylumconnect',
        },
      };
      fetch(url, options)
        .then(response => response.json())
        .then(data => this.setState({ user: data.user.id }));
    }

    handleStorageChange() {
      this.setState({ session: window.localStorage.getItem('jwt')});
    }

    handleLogIn(jwt) {
      window.localStorage.setItem('jwt', jwt);
      this.handleStorageChange();
      this.fetchUser(jwt);
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
        />
      );
    }
  }
}
