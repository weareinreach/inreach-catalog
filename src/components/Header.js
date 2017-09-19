import React from 'react';
import Nav from './Nav';

import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';

export default class Header extends React.Component { 
  constructor() {
    super();
    this.state = {
      left: false,
    }
    this.openDrawer = this.openDrawer.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
  }
    
  openDrawer(){
    this.setState({
      left: true,
    });
  };
  
  closeDrawer(){
    this.setState({
      left: false,
    });
  };

  render() {
    return (
      <Grid container>
        <Hidden only={['sm', 'xs', 'md']}>
          <Button onClick={this.openDrawer}>Open</Button>
          <Drawer open={this.state.left} onRequestClose={this.closeDrawer}>
            <div tabIndex={0} role="button" onClick={this.closeDrawer}>
              <Nav style={{width: 250, flex: 'initial'}} />
            </div>
          </Drawer>
        </Hidden>
        <Grid item xs={0} lg={12}>
          <Nav />
        </Grid>
      </Grid>
    )
  }
}