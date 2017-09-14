import React from 'react';

import Nav from './Nav';
import Language from './Language';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';

export default class Header extends React.Component { 
  constructor() {
    super();
  }

  render() {
    return (
      <AppBar>
        <Toolbar>
          {/*Navigation Component: list of offsite links*/}
          <Nav />
          
          {/*---*/}
          <Button>Find Resources</Button>
          
          {/*Language Component: open a dropdown menu with language options */}
          <Language />
          
          {/*---*/}
          <Button>Account Settings</Button>
          <Button>Log Out</Button>
          <Button>View Your Favorites</Button>
        </Toolbar>
      </AppBar>
    );
  }
};