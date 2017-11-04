import React from 'react';

export default function withSession(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props)

      this.state = { session: window.localStorage.getItem('jwt')};
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

    handleStorageChange() {
      this.setState({ session: window.localStorage.getItem('jwt')});
    }

    handleLogIn(jwt) {
      window.localStorage.setItem('jwt', jwt);
      this.handleStorageChange();
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
